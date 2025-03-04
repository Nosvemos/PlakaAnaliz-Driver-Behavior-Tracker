import { Comment } from '../models/Comment.js';
import { Response } from '../models/Response.js';
import { User } from '../models/User.js';

export const createResponse = async (req, res, next) => {
  const { commentId, response } = req.body;
  const userId = req?.userId;

  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return res.status(404).json({ message: "Response can not be found." });
    }

    let writerData = null;
    if (userId) {
      writerData = await User.findById(userId);
      if (!writerData) {
        return res.status(404).json({ message: "User can not be found." });
      }
    }

    const newResponse = new Response({
      comment: commentData._id,
      response,
      ...(userId && { writer: writerData._id })
    });

    await newResponse.save();

    commentData.responses.push(newResponse._id);
    await commentData.save();

    const populatedResponse = await Response.findById(newResponse._id)
    .populate("writer", "username");

    res.status(201).json({
      message: "Response has been created successfully!",
      data: {
        ...populatedResponse.toObject()
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating response: " + error.message
    });
  }
};

export const updateResponse = async (req, res) => {
  const { responseId, response } = req.body;
  const userId = req?.userId;

  try {
    const responseData = await Response.findById(responseId);
    if (!responseData) {
      return res.status(404).json({ message: "Response can not be found." });
    }

    if (!responseData.writer) {
      return res.status(403).json({ message: "Anonymous responses can not be edited." });
    }

    if (responseId.writer && (responseId.writer.toString() !== userId?.toString())) {
      return res.status(403).json({ message: "You dont have permission to edit this response." });
    }

    responseData.response = response;

    await responseData.save();

    return res.status(200).json({
      message: "Response has been updated successfully.",
      data: responseData
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating response: " + error.message
    });
  }
};

export const deleteResponse = async (req, res) => {
  const { responseId } = req.body;
  const userId = req?.userId;

  try {
    const response = await Response.findById(responseId);
    if (!response) {
      return res.status(404).json({ message: "Response can not be found." });
    }

    if (!response.writer) {
      return res.status(403).json({ message: "Anonymous responses can not be deleted." });
    }

    if (response.writer && (response.writer.toString() !== userId?.toString())) {
      return res.status(403).json({ message: "You dont have permission to delete this response." });
    }

    await Response.findByIdAndDelete(responseId);

    await Comment.findByIdAndUpdate(
      response.comment,
      { $pull: { responses: responseId } }
    );

    return res.status(200).json({ message: "Response has been deleted successfully." });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting Response: " + error.message
    });
  }
};

export const commentResponses = async (req, res, next) => {
  const { commentId } = req.body;
  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return res.status(404).json({ message: "Comment can not be found." });
    }
    const responses = await Response.find({comment: commentId});
    return res.status(200).json({
      message: 'Comment response data successfully found.',
      data: responses
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting all comments: " + error.message
    })
  }
};