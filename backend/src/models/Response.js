import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Response = mongoose.model('Response', responseSchema);