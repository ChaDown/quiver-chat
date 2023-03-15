import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  shaper: {
    type: String,
    required: true,
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
  urlString: {
    type: String,
    required: true,
  },
});

export interface Model extends mongoose.Document {
  _id: string;
  title: string;
  shaper: string;
  visible: boolean;
  imgLink: string;
  description: string;
  category: string;
  urlString: string;
}

modelSchema.virtual('url').get(function () {
  return `/surfboard-model/${this.urlString}`;
});

export default mongoose.model('Model', modelSchema);
