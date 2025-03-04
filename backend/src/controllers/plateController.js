import { Plate } from '../models/Plate.js';
import { Comment } from '../models/Comment.js';
import errorResponse from '../utils/errorResponse.js'

export const createPlate = async (req, res, next) => {
  const { plate } = req.body;

  try {
    const isExists = await Plate.findOne({plate});
    if (isExists) {
      return next(new errorResponse('Plate already exists.', 400));
    }
    const newPlate = new Plate({plate});
    await newPlate.save();
    return res.status(201).json({
      success: true,
      message: 'Plate created successfully!',
      data: newPlate,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const findPlate = async (req, res, next) => {
  const { plate } = req.params;

  try {
    const plateData = await Plate.findOne({plate});
    if (!plateData) {
      return next(new errorResponse('Plate can not be found.', 404));
    }
    return res.status(200).json({
      success: true,
      message: 'Plate data found!',
      data: plateData,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deletePlate = async (req, res, next) => {
  const { plate } = req.params;

  try {
    const plateData = await Plate.findOne({ plate });
    if (!plateData) {
      return next(new errorResponse('Plate can not be found.', 404));
    }

    await Comment.deleteMany({ plate: plateData._id });

    await Plate.findOneAndDelete({ plate })

    return res.status(200).json({
      success: true,
      message: 'Plate and related data deleted!',
      data: plateData,
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};