import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  images?: string[];
  isBestSeller?: boolean;
  isNewProduct?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    isBestSeller: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
