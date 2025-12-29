import dbConnect from './mongodb';
import Product, { IProduct } from '@/models/Product';
import Category, { ICategory } from '@/models/Category';
import { products as initialProducts, categoryData as initialCategories } from './data';

// Types
export type { IProduct as Product } from '@/models/Product'; // Re-export for compatibility
export type { ICategory as Category } from '@/models/Category';

// Helper to ensure DB is connected and seeded
async function initDB() {
  await dbConnect();
  
  // Seed Categories if empty
  const catCount = await Category.countDocuments();
  if (catCount === 0) {
    console.log('Seeding Categories...');
    const categoriesToInsert = initialCategories.map(c => ({
      ...c,
      id: c.name.toLowerCase().replace(/ /g, '-'), // Generate ID if needed
    }));
    await Category.insertMany(categoriesToInsert);
  }

  // Seed Products if empty
  const prodCount = await Product.countDocuments();
  if (prodCount === 0) {
    console.log('Seeding Products...');
    await Product.insertMany(initialProducts);
  }
}

// Products
export async function getProducts() {
  await initDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(products)); // Serialize for Next.js
}

export async function getProductById(id: string) {
  await initDB();
  const product = await Product.findOne({ id });
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export async function addProduct(productData: any) {
  await initDB();
  const newProduct = new Product(productData);
  await newProduct.save();
  return JSON.parse(JSON.stringify(newProduct));
}

export async function updateProduct(id: string, updates: any) {
  await initDB();
  const updated = await Product.findOneAndUpdate({ id }, updates, { new: true });
  return updated ? JSON.parse(JSON.stringify(updated)) : null;
}

export async function deleteProduct(id: string) {
  await initDB();
  const deleted = await Product.findOneAndDelete({ id });
  return deleted ? JSON.parse(JSON.stringify(deleted)) : null;
}

// Categories
export async function getCategories() {
  await initDB();
  const categories = await Category.find({});
  return JSON.parse(JSON.stringify(categories));
}

export async function addCategory(categoryData: any) {
  await initDB();
  
  // Custom duplicate check (optional since we have initDB handling uniqueness mostly)
  const existing = await Category.findOne({ name: { $regex: new RegExp(`^${categoryData.name}$`, 'i') } });
  if (existing) {
    throw new Error("Category already exists");
  }

  if (!categoryData.id) {
    categoryData.id = categoryData.name.toLowerCase().replace(/ /g, '-');
  }

  const newCategory = new Category(categoryData);
  await newCategory.save();
  return JSON.parse(JSON.stringify(newCategory));
}

export async function updateCategory(id: string, updates: any) {
  await initDB();
  const updated = await Category.findOneAndUpdate({ id }, updates, { new: true });
  return updated ? JSON.parse(JSON.stringify(updated)) : null;
}

export async function deleteCategory(id: string) {
  await initDB();
  
  // Check usage
  const categoryToRemove = await Category.findOne({ id });
  if (!categoryToRemove) return null;

  const isUsed = await Product.exists({ category: categoryToRemove.name });
  if (isUsed) {
    throw new Error(`Cannot delete category "${categoryToRemove.name}" because it is used by one or more products.`);
  }

  const deleted = await Category.findOneAndDelete({ id });
  return deleted ? JSON.parse(JSON.stringify(deleted)) : null;
}
