import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    nameUk: { type: String, default: '' },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, default: '' },
    tags: { type: [String], default: [] },
    description: { type: String, required: true },
    descriptionUk: { type: String, default: '' },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    fabric: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
