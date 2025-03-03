import { Plate } from '../models/Plate.js';
import { Comment } from '../models/Comment.js';

export const createPlate = async (req, res) => {
  const { plate } = req.body;
  try {
    const newPlate = new Plate({plate});
    await newPlate.save();
    return res.status(200).json({
      message: 'Plate created successfully!',
      data: plate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const findPlate = async (req, res) => {
  const { plate } = req.body;
  try {
    const plateData = await Plate.findOne({plate});
    if (!plateData) {
      return res.status(404).json({
        message: 'Plate not found!'
      });
    }
    return res.status(200).json({
      message: 'Plate found!',
      data: plateData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const deletePlate = async (req, res) => {
  const { plate } = req.body;
  try {
    const plateData = await Plate.findOne({ plate });
    if (!plateData) {
      return res.status(404).json({
        message: 'Plate not found!'
      });
    }

    await Comment.deleteMany({ plate: plateData._id });

    await Plate.findOneAndDelete({ plate })

    return res.status(200).json({
      message: 'Plate and related data deleted!',
      data: plateData,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
};