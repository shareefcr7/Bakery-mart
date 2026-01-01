import { NextResponse } from 'next/server';
import { getCategories, addCategory } from '@/lib/db';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const newCategory = await addCategory(body);
    
    return NextResponse.json(newCategory);
  } catch (error: unknown) {
    console.error('Failed to create category:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create category';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
