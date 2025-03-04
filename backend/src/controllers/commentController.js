import { Plate } from '../models/Plate.js';
import { Comment } from '../models/Comment.js';
import { Response } from '../models/Response.js';
import { User } from '../models/User.js';

export const createComment = async (req, res) => {
  const { plateId, comment, imageUrl } = req.body;
  const userId = req?.userId;

  try {
    const plateData = await Plate.findById(plateId);
    if (!plateData) {
      return res.status(404).json({ message: "Plate can not be found." });
    }

    let writerData = null;
    if (userId) {
      writerData = await User.findById(userId);
      if (!writerData) {
        return res.status(404).json({ message: "User can not be found." });
      }
    }

    const newComment = new Comment({
      plate: plateData._id,
      comment,
      imageUrl,
      ...(userId && { writer: writerData._id })
    });

    await newComment.save();

    plateData.comments.push(newComment._id);
    await plateData.save();

    const populatedComment = await Comment.findById(newComment._id)
    .populate("writer", "username");

    res.status(201).json({
      message: "Comment has been created successfully!",
      data: {
        ...populatedComment.toObject()
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating comment: " + error.message
    });
  }
};

export const updateComment = async (req, res) => {
  const { commentId, comment, imageUrl } = req.body;
  const userId = req?.userId;

  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return res.status(404).json({ message: "Comment can not be found." });
    }

    if (!commentData.writer) {
      return res.status(403).json({ message: "Anonymous comments can not be edited." });
    }

    if (commentData.writer && (commentData.writer._id.toString() !== userId?.toString())) {
      return res.status(403).json({ message: "You dont have permission to edit this comment." });
    }

    commentData.comment = comment;
    commentData.imageUrl = imageUrl;

    await commentData.save();

    return res.status(200).json({
      message: "Comment has been updated successfully.",
      data: commentData
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating comment: " + error.message
    });
  }
}

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req?.userId;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment can not be found." });
    }

    if (!comment.writer) {
      return res.status(403).json({ message: "Anonymous comments can not be deleted." });
    }

    if (comment.writer && (comment.writer._id.toString() !== userId?.toString())) {
      return res.status(403).json({ message: "You dont have permission to delete this comment." });
    }

    await Comment.findByIdAndDelete(commentId);

    await Response.deleteMany({comment: commentId});

    await Plate.findByIdAndUpdate(
      comment.plate,
      { $pull: { comments: commentId } }
    );

    return res.status(200).json({ message: "Comment has been deleted successfully." });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting comment: " + error.message
    });
  }
};

export const allComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json({
      message: 'All comments data successfully found',
      data: comments
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting all comments: " + error.message
    })
  }
};

export const plateComments = async (req, res, next) => {
  const { plateId } = req.body;
  try {
    const plateData = await Plate.findById(plateId);
    if (!plateData) {
      return res.status(404).json({ message: "Plate can not be found." });
    }
    const comments = await Comment.find({plate: plateId});
    return res.status(200).json({
      message: 'Plate comments data successfully found.',
      data: comments
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting all comments: " + error.message
    })
  }
};