
import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/db';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.price) {
        return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
    }

    const slug = body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const newProduct = {
      id: `${slug}-${Date.now().toString().slice(-4)}`,
      name: body.name,
      description: body.description || '',
      price: body.price,
      category: body.category || 'Uncategorized',
      image: body.image || '/images/placeholder.png',
      images: body.images || [],
      isBestSeller: Boolean(body.isBestSeller),
      isNewProduct: Boolean(body.isNewProduct),
    };

    const added = await addProduct(newProduct);
    return NextResponse.json(added, { status: 201 });
  } catch (error: unknown) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
