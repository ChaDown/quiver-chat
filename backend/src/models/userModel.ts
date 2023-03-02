import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  const hash: string = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const compare: boolean = await bcrypt.compare(password, this.password);
  return compare;
};

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  isValidPassword?: (password: string) => Promise<boolean>;
}

export default mongoose.model('User', userSchema);
