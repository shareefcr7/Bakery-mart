import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ICategory extends Document {
  id: string;
  name: string;
  image: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
