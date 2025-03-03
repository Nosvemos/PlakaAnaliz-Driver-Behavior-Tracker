import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  plate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plate',
    required: true
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  comment: {
    type: String,
    required: true
  },
  imageUrl: String,
  responses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Response'
  }]
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);