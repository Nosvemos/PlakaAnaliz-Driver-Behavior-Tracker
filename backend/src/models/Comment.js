import mongoose from 'mongoose';
import { Response } from './Response.js';
import { User } from './User.js';

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

commentSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await Response.deleteMany({ _id: { $in: this.responses } });
  next();
});

commentSchema.pre('deleteMany', async function (next) {
  const comments = await this.model.find(this.getFilter());
  const responseIds = comments.flatMap(comment => comment.responses);
  await Response.deleteMany({ _id: { $in: responseIds } });
  next();
});

export const Comment = mongoose.model('Comment', commentSchema);