import mongoose, { ObjectId } from 'mongoose';
import { Model } from './modelModel';
import { UserDocument } from './userModel';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Model',
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
    required: true,
  },
  content: {
    type: String,
    minLength: 2,
    required: true,
  },
});

export interface Comment extends mongoose.Document {
  user: UserDocument;
  postId: Model;
  date: Date;
  visible: boolean;
  content: string;
}

export default mongoose.model('Comment', commentSchema);
