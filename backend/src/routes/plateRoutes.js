import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import { createPlate, findPlate, deletePlate } from '../controllers/plateController.js'

const router = express.Router();

router.post('/create', requestLimiter, createPlate);

router.post('/find', requestLimiter, findPlate);

router.delete('/delete', requestLimiter, deletePlate);

export default router;