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
  authorName: {
    type: String,
    default: 'Anonymous'
  },
  response: {
    type: String,
    required: true
  }
}, { timestamps: true });

responseSchema.pre('save', async function (next) {
  if (this.writer) {
    const user = await mongoose.model('User').findById(this.writer);
    this.authorName = user?.username || 'Anonymous';
  } else {
    this.authorName = 'Anonymous';
  }
  next();
});

export const Response = mongoose.model('Response', responseSchema);