import mongoose from 'mongoose';

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

export default mongoose.model('Comment', commentSchema);
