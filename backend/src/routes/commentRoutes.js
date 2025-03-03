import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import { createComment, deleteComment } from '../controllers/commentController.js'

const router = express.Router();

router.post('/create', requestLimiter, createComment);

router.delete('/delete', requestLimiter, deleteComment);

export default router;