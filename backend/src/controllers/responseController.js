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
      return next(new errorResponse('Comment can not be found.', 404));
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

    if (!commentData.responses) {
      commentData.responses = [];
    }

    await Comment.updateOne(
      { _id: commentId },
      { $push: { responses: newResponse._id } },
      { timestamps: false }
    );

    const populatedResponse = await Response.findById(newResponse._id)
    .populate("writer", "username");

    res.status(201).json({
      success: true,
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
    const responseData = await Response.findById(responseId)
      .populate("writer", "username");
    if (!responseData) {
      return next(new errorResponse('Response can not be found.', 404));
    }

    if (!responseData.writer) {
      return next(new errorResponse('Anonymous responses can not be edited.', 403));
    }

    if (responseData.writer && (responseData.writer?._id.toString() !== userId.toString())) {
      return next(new errorResponse('You do not have permission to edit this response.', 403));
    }

    responseData.response = response;

    await responseData.save();

    return res.status(200).json({
      success: true,
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

    const commentId = response.comment;

    if (!response.writer) {
      return next(new errorResponse('Anonymous responses can not be edited.', 403));
    }

    if (!response.writer || response.writer.toString() !== userId?.toString()) {
      return next(new errorResponse('You dont have permission to delete this response.', 403));
    }

    await Comment.updateOne(
      { _id: commentId },
      { $pull: { responses: responseId } },
      { timestamps: false }
    );

    await Response.findByIdAndDelete(responseId);

    return res.status(200).json({
      success: true,
      message: "Response deleted.",
      data: {
        commentId: commentId,
        responseId: responseId
      }
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const responseAddReaction = async (req, res, next) => {
  const { reactionType } = req.body;
  const { responseId } = req.params;
  const userId = req?.userId;

  try {
    const response = await Response.findById(responseId);
    if (!response) {
      return next(new errorResponse('Response can not be found.', 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new errorResponse('User can not found.', 404));
    }

    const existingReaction = response.reactions.find(reaction => reaction.user.toString() === userId);
    if (existingReaction) {
      return next(new errorResponse('You already reacted to this comment.', 400));
    }

    await Response.updateOne(
      { _id: responseId },
      { $push: { reactions: { user: userId, reactionType } } },
      { timestamps: false }
    );

    const updatedResponse = await Response.findById(responseId)
      .populate("writer", "username");

    res.status(200).json({
      success: true,
      data: updatedResponse,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const responseDeleteReaction = async (req, res, next) => {
  const { responseId } = req.params;
  const userId = req?.userId;

  try {
    const response = await Response.findById(responseId);
    if (!response) {
      return next(new errorResponse('Response can not be found.', 404));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new errorResponse('User can not found.', 404));
    }

    const existingReaction = response.reactions.find(reaction => reaction.user.toString() === userId);
    if (!existingReaction) {
      return next(new errorResponse('You have not reacted to this comment.', 400));
    }

    await Response.updateOne(
      { _id: responseId },
      { $pull: { reactions: { user: userId } } },
      { timestamps: false }
    );

    const updatedResponse = await Response.findById(responseId)
      .populate("writer", "username");

    res.status(200).json({
      success: true,
      data: updatedResponse,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};