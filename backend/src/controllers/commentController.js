import { Plate } from '../models/Plate.js';
import { Comment } from '../models/Comment.js';
import { Response } from '../models/Response.js';
import { User } from '../models/User.js';

import errorResponse from '../utils/errorResponse.js'

export const createComment = async (req, res, next) => {
  const { plate, comment, imageUrl } = req.body;
  const userId = req?.userId;

  try {
    let plateData = await Plate.findOne({plate});
    if (!plateData) {
      plateData = new Plate({plate});
      await plateData.save();
    }

    let writerData = null;
    if (userId) {
      writerData = await User.findById(userId);
      if (!writerData) {
        return next(new errorResponse('User can not be found.', 404));
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
  const { comment, imageUrl } = req.body;
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
    commentData.imageUrl = imageUrl;

    await commentData.save();

    // Populate the writer information before sending the response
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
      return next(new errorResponse('Plate can not be found.', 404));
    }
    // Find comments and populate writer field with username if it exists
    const comments = await Comment.find({plate: plateId})
    .populate("writer", "username");

    // Transform the comments to include username only if writer exists
    const formattedComments = comments.map(comment => {
      const commentObj = comment.toObject();

      // If there's no writer, return the comment without writer field
      if (!comment.writer) {
        delete commentObj.writer;
      }

      return commentObj;
    });

    return res.status(200).json({
      success: true,
      message: 'Plate comments data successfully found.',
      data: formattedComments
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const commentResponses = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return next(new errorResponse('Comment can not be found.', 404));
    }
    const responses = await Response.find({comment: commentId});
    return res.status(200).json({
      success: true,
      message: 'Comment response data successfully found.',
      data: responses
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};