import mongoose from 'mongoose';

const plateSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });

export const Plate = mongoose.model('Plate', plateSchema);