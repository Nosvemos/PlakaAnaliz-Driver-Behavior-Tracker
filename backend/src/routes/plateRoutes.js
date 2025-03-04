import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import { createPlate, findPlate, deletePlate } from '../controllers/plateController.js'
import {
  createPlateValidation, findPlateValidation, deletePlateValidation
} from '../middlewares/validators/plateValidators.js'
import { validateRequest } from '../middlewares/validators/validateRequest.js'

const router = express.Router();

router.post('/', requestLimiter, createPlateValidation, validateRequest, createPlate);

router.get('/:plate', findPlateValidation, validateRequest, findPlate);

router.delete('/:plate', requestLimiter, deletePlateValidation, validateRequest, deletePlate);

export default router;