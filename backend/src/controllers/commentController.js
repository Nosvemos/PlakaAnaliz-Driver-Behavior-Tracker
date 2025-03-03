import { Plate } from '../models/Plate.js';
import { Comment } from '../models/Comment.js';
import { User } from '../models/User.js';

export const createComment = async (req, res) => {
  const { plateId, comment, imageUrl } = req.body;
  const writerId = req.user?._id;

  try {
    const plateData = await Plate.findById(plateId);
    if (!plateData) {
      return res.status(404).json({ message: "Plate can not be found." });
    }

    let writerData = null;
    if (writerId) {
      writerData = await User.findById(writerId);
      if (!writerData) {
        return res.status(404).json({ message: "User can not be found." });
      }
    }

    const newComment = new Comment({
      plate: plateData._id,
      comment,
      imageUrl,
      ...(writerId && { writer: writerId })
    });

    await newComment.save();

    plateData.comments.push(newComment._id);
    await plateData.save();

    const populatedComment = await Comment.findById(newComment._id)
    .populate("writer", "username")
    .populate("plate", "plate");

    res.status(201).json({
      message: "Comment has been created successfully!",
      data: {
        ...populatedComment.toObject(),
        author: populatedComment.writer ? populatedComment.writer.username : "Anonymous"
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating comment: " + error.message
    });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.user?._id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment can not be found." });
    }

    if (!comment.writer) {
      return res.status(403).json({ message: "Anonymous comments can not be deleted." });
    }

    if (comment.writer && (comment.writer.toString() !== userId.toString())) {
      return res.status(403).json({ message: "You dont have permission to delete this comment." });
    }

    await Comment.findByIdAndDelete(commentId);

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