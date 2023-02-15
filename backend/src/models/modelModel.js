import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  shaper: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shaper',
  },
  visible: {
    type: Boolean,
    default: true,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Shortboard',
      'Longboard',
      'Fish',
      'Foamboard',
      'Funboard',
      'Twin-Fin',
      'Step-Up',
      'Mini-Mal',
    ],
    required: true,
  },
});

export default mongoose.model('Model', modelSchema);
