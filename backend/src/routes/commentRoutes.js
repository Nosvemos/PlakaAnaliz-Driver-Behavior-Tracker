import express from 'express';

import {
  createComment,
  updateComment,
  deleteComment,
  plateComments,
  commentResponses,
  commentAddReaction,
  commentDeleteReaction
} from '../controllers/commentController.js'

import requestLimiter from '../middlewares/requestLimiter.js';
import { verifyToken } from '../middlewares/verifyToken.js'
import {
  commentResponsesValidation,
  createCommentValidation,
  deleteCommentValidation,
  plateCommentsValidation,
  updateCommentValidation,
  commentAddReactionValidation,
  commentDeleteReactionValidation
} from '../middlewares/validators/commentValidators.js'
import { validateRequest } from '../middlewares/validators/validateRequest.js'

const router = express.Router();

router.post('/', requestLimiter, verifyToken, createCommentValidation, validateRequest, createComment);

router.patch('/:commentId', requestLimiter, verifyToken, updateCommentValidation, validateRequest, updateComment);

router.delete('/:commentId', requestLimiter, verifyToken, deleteCommentValidation, validateRequest, deleteComment);

router.get('/plate/:plateId', plateCommentsValidation, validateRequest, plateComments);

router.get('/:commentId/responses', commentResponsesValidation, validateRequest, commentResponses);

router.post('/:commentId/reactions', requestLimiter, verifyToken, commentAddReactionValidation, validateRequest, commentAddReaction);

router.delete('/:commentId/reactions', requestLimiter, verifyToken, commentDeleteReactionValidation, validateRequest, commentDeleteReaction);

export default router;