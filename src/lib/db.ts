import fs from 'fs';
import path from 'path';
import { products as initialProducts, categoryData as initialCategories } from './data';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  images?: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface Category {
  name: string;
  image: string;
  id?: string;
}

export interface DBData {
  products: Product[];
  categories: Category[];
}

export function getDB(): DBData {
  if (!fs.existsSync(DB_PATH)) {
    // Seed data
    const seedData: DBData = {
      products: initialProducts,
      categories: initialCategories.map(c => ({ ...c, id: c.name.toLowerCase().replace(/ /g, '-') })),
    };
    try {
      // Ensure directory exists
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(seedData, null, 2));
    } catch (e) {
      console.error("Failed to seed DB", e);
      return seedData; // Return in-memory if write fails (e.g. Vercel)
    }
    return seedData;
  }
  
  try {
    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading DB:", error);
    return { products: [], categories: [] };
  }
}

export function saveDB(data: DBData) {
  try {
     fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
     console.error("Error saving DB (Expected on Vercel):", error);
     throw new Error("Cannot save data in this environment (Read-Only).");
  }
}

// Helper functions (Async for compatibility with API routes)
export async function getProducts() {
  return getDB().products;
}

export async function getProductById(id: string) {
  return getDB().products.find(p => p.id === id) || null;
}

export async function addProduct(product: Product) {
  const db = getDB();
  db.products.push(product);
  saveDB(db);
  return product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const db = getDB();
  const index = db.products.findIndex(p => p.id === id);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...updates };
    saveDB(db);
    return db.products[index];
  }
  return null;
}

export async function deleteProduct(id: string) {
  const db = getDB();
  const index = db.products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = db.products.splice(index, 1);
    saveDB(db);
    return deleted[0];
  }
  return null;
}

export async function getCategories() {
  return getDB().categories;
}

export async function addCategory(category: Category) {
  const db = getDB();
  // Check for duplicates
  if (db.categories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
     throw new Error("Category already exists");
  }
  
  if (!category.id) {
      category.id = category.name.toLowerCase().replace(/ /g, '-');
  }
  
  db.categories.push(category);
  saveDB(db);
  return category;
}

export async function updateCategory(id: string, updates: Partial<Category>) {
  const db = getDB();
  const index = db.categories.findIndex(c => c.id === id);
  if (index !== -1) {
    db.categories[index] = { ...db.categories[index], ...updates };
    saveDB(db);
    return db.categories[index];
  }
  return null;
}

export async function deleteCategory(id: string) {
  const db = getDB();
  
  const categoryToRemove = db.categories.find(c => c.id === id);
  if (!categoryToRemove) return null;

  const isUsed = db.products.some(p => p.category === categoryToRemove.name);
  if (isUsed) {
    throw new Error(`Cannot delete category "${categoryToRemove.name}" because it is used by one or more products.`);
  }

  const index = db.categories.findIndex(c => c.id === id);
  if (index !== -1) {
    const deleted = db.categories.splice(index, 1);
    saveDB(db);
    return deleted[0];
  }
  return null;
}
