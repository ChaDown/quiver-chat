import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model('User', userSchema);
