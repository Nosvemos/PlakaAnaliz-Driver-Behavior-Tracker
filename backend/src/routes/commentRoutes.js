import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import {
  createComment,
  updateComment,
  deleteComment,
  allComments,
  plateComments
} from '../controllers/commentController.js'

const router = express.Router();

router.post('/create', requestLimiter, createComment);

router.patch('/update', requestLimiter, updateComment);

router.delete('/delete', requestLimiter, deleteComment);

router.post('/allComments', requestLimiter, allComments);

router.post('/plateComments', requestLimiter, plateComments);

export default router;