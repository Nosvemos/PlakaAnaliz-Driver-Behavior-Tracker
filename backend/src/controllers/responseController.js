import { Comment } from '../models/Comment.js';
import { Response } from '../models/Response.js';
import { User } from '../models/User.js';
import errorResponse from '../utils/errorResponse.js';

export const createResponse = async (req, res, next) => {
  const { commentId, response } = req.body;
  const userId = req?.userId;

  try {
    const commentData = await Comment.findById(commentId);
    if (!commentData) {
      return next(new errorResponse('Response can not be found.', 404));
    }

    let writerData = null;
    if (userId) {
      writerData = await User.findById(userId);
      if (!writerData) {
        return next(new errorResponse('User can not be found.', 404));
      }
    }

    const newResponse = new Response({
      comment: commentData._id,
      response,
      ...(userId && { writer: writerData?._id })
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
    console.error(error);
    next(error);
  }
};

export const updateResponse = async (req, res, next) => {
  const { response } = req.body;
  const { responseId } = req.params;
  const userId = req?.userId;

  try {
    const responseData = await Response.findById(responseId);
    if (!responseData) {
      return next(new errorResponse('Response can not be found.', 404));
    }

    if (!responseData.writer) {
      return next(new errorResponse('Anonymous responses can not be edited.', 403));
    }

    if (responseId.writer && (responseId.writer.toString() !== userId?.toString())) {
      return next(new errorResponse('You do not have permission to edit this response.', 403));
    }

    responseData.response = response;

    await responseData.save();

    return res.status(200).json({
      message: "Response has been updated successfully.",
      data: responseData
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteResponse = async (req, res, next) => {
  const { responseId } = req.params;
  const userId = req?.userId;

  try {
    const response = await Response.findById(responseId);
    if (!response) {
      return next(new errorResponse('Response can not be found.', 404));
    }

    if (!response.writer) {
      return next(new errorResponse('Anonymous responses can not be edited.', 403));
    }

    if (response.writer && (response.writer.toString() !== userId?.toString())) {
      return next(new errorResponse('You dont have permission to delete this response.', 403));
    }

    await Response.findByIdAndDelete(responseId);

    await Comment.findByIdAndUpdate(
      response.comment,
      { $pull: { responses: responseId } }
    );

    return res.status(200).json({ message: "Response has been deleted successfully." });

  } catch (error) {
    console.error(error);
    next(error);
  }
};