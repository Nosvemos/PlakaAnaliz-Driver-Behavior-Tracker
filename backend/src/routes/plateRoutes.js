import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import { createPlate, findPlate, deletePlate } from '../controllers/plateController.js'
import {
  createPlateValidation, findPlateValidation, deletePlateValidation
} from '../middlewares/validators/plateValidators.js'

const router = express.Router();

router.post('/create', requestLimiter, createPlateValidation, createPlate);

router.get('/:plate', requestLimiter, findPlateValidation, findPlate);

router.delete('/delete', requestLimiter, deletePlateValidation, deletePlate);

export default router;