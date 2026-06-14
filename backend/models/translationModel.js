import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, trim: true },
    target: { type: String, required: true, trim: true },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    priority: { type: Number, default: 50 },
    domain: { type: String, default: 'fashion', trim: true },
    kind: { type: String, default: 'term', trim: true },
  },
  {
    timestamps: true,
  }
);

translationSchema.index(
  { source: 1, from: 1, to: 1, domain: 1, kind: 1 },
  { unique: true }
);

const Translation = mongoose.model('Translation', translationSchema);
export default Translation;
