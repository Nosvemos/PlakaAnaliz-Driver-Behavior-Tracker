import { Plate } from '../models/Plate.js';
import { Comment } from '../models/Comment.js';
import { Response } from '../models/Response.js';
import { User } from '../models/User.js';

import errorResponse from '../utils/errorResponse.js'

import cloudinary from "../lib/cloudinary.js";
import { getPublicIdFromUrl } from '../utils/getPublicIDFromUrl.js'

export const createComment = async (req, res, next) => {
  const { plate, comment, image } = req.body;
  const userId = req?.userId;

  try {
    let plateData = await Plate.findOne({plate});

    let writerData = null;
    if (userId) {
      writerData = await User.findById(userId);
      if (!writerData) {
        return next(new errorResponse('User can not be found.', 404));
      }
    }

    let imageUrl;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (error) {
        return res.status(400).json({ error: "Failed to upload image." });
      }
    }

    const newComment = new Comment({
      plate: plateData._id,
      comment,
      imageUrl,
      ...(userId && { writer: writerData?._id })
    });

    await newComment.save();

    plateData.comments.push(newComment._id);
    await plateData.save();

    const populatedComment = await Comment.findById(newComment._id)
    .populate("writer", "username");

    res.status(201).json({
      success: true,
      message: "Comment has been created successfully!",
      data: {
        ...populatedComment.toObject()
      }
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const { comment, image } = req.body;
  const { commentId } = req.params;
  const userId = req?.userId;

  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return next(new errorResponse('Comment can not be found.', 404));
    }

    if (!commentData.writer) {
      return next(new errorResponse('Anonymous comments can not be edited.', 403));
    }

    if (commentData.writer && (commentData.writer.toString() !== userId?.toString())) {
      return next(new errorResponse('You dont have permission to edit this.', 403));
    }

    commentData.comment = comment;

    const publicId = getPublicIdFromUrl(commentData.imageUrl);
    await cloudinary.uploader.destroy(publicId);

    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        commentData.imageUrl = uploadResponse.secure_url;
      } catch (error) {
        return res.status(400).json({ error: "Failed to upload image." });
      }
    } else {
      commentData.imageUrl = null;
    }

    await commentData.save();

    const populatedComment = await Comment.findById(commentId)
    .populate("writer", "username");

    return res.status(200).json({
      success: true,
      message: "Comment has been updated successfully.",
      data: populatedComment.toObject()
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req?.userId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new errorResponse('Comment can not be found.', 404));
    }

    if (!comment.writer) {
      return next(new errorResponse('Anonymous comments can not be deleted.', 403));
    }

    if (comment.writer && (comment.writer._id.toString() !== userId?.toString())) {
      return next(new errorResponse('You dont have permission to edit this.', 403));
    }

    if(comment.imageUrl) {
      const publicId = getPublicIdFromUrl(comment.imageUrl);
      await cloudinary.uploader.destroy(publicId)
    }

    await Comment.findByIdAndDelete(commentId);

    await Response.deleteMany({comment: commentId});

    await Plate.findByIdAndUpdate(
      comment.plate,
      { $pull: { comments: commentId } }
    );

    return res.status(200).json({
      success: true,
      message: "Comment has been deleted successfully."
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const plateComments = async (req, res, next) => {
  const { plateId } = req.params;
  try {
    const plateData = await Plate.findById(plateId);
    if (!plateData) {
      return next(new errorResponse('Plate not found.', 404));
    }

    const comments = await Comment.find({ plate: plateId })
      .populate("writer", "username")
      .lean();

    const formattedComments = comments.map(comment => ({
      ...comment,
      responseCount: comment.responses?.length || 0,
      ...(!comment.writer && { writer: undefined })
    }));

    return res.status(200).json({
      success: true,
      message: 'Comments fetched successfully.',
      data: formattedComments
    });

  } catch (error) {
    console.error('Plate comments error:', error);
    next(new errorResponse('Server error', 500));
  }
};

export const commentResponses = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return next(new errorResponse('Comment can not be found.', 404));
    }

    const responses = await Response.find({ comment: commentId })
      .populate("writer", "username")
      .lean();

    const uniqueResponses = responses.filter(
      (response, index, self) =>
        index === self.findIndex(
          (r) => r._id.toString() === response._id.toString()
        )
    );

    return res.status(200).json({
      success: true,
      message: 'Comment response data successfully found.',
      data: uniqueResponses
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const commentAddReaction = async (req, res, next) => {
  const { reactionType } = req.body;
  const { commentId } = req.params;
  const userId = req?.userId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new errorResponse('Comment can not be found.', 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new errorResponse('User can not found.', 404));
    }

    const existingReaction = comment.reactions.find(reaction => reaction.user.toString() === userId);
    if (existingReaction) {
      return next(new errorResponse('You already reacted to this comment.', 400));
    }

    await Comment.updateOne(
      { _id: commentId },
      { $push: { reactions: { user: userId, reactionType } } },
      { timestamps: false }
    );

    const updatedComment = await Comment.findById(commentId)
    .populate("writer", "username");

    res.status(200).json({
      success: true,
      data: updatedComment,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const commentDeleteReaction = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req?.userId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new errorResponse('Comment can not be found.', 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new errorResponse('User can not found.', 404));
    }

    const existingReaction = comment.reactions.find(reaction => reaction.user.toString() === userId);
    if (!existingReaction) {
      return next(new errorResponse('You have not reacted to this comment.', 400));
    }

    await Comment.updateOne(
      { _id: commentId },
      { $pull: { reactions: { user: userId } } },
      { timestamps: false }
    );

    const updatedComment = await Comment.findById(commentId)
    .populate("writer", "username");

    res.status(200).json({
      success: true,
      data: updatedComment,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
}