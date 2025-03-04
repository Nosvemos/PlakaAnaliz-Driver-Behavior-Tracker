import mongoose from 'mongoose';
import { User } from './User.js';

const responseSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  response: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Response = mongoose.model('Response', responseSchema);