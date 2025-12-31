import { NextResponse, NextRequest } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import { extractPublicId } from '@/lib/cloudinary-helper';

// Next.js 15 requires awaiting params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if image is being updated
    if (body.image) {
      const existingProduct = await getProductById(id);
      if (existingProduct && existingProduct.image && existingProduct.image !== body.image) {
        // Image changed, delete old one
        const publicId = extractPublicId(existingProduct.image);
        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error("Failed to delete old image from Cloudinary:", err);
            }
        }
      }
    }

    const updated = await updateProduct(id, body);
    
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get product before deleting to get image URL
    const product = await getProductById(id);

    const deleted = await deleteProduct(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Delete image from Cloudinary if it exists
    if (product && product.image) {
        const publicId = extractPublicId(product.image);
        if (publicId) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                 console.error("Failed to delete image from Cloudinary:", err);
            }
        }
    }
    
    return NextResponse.json({ success: true, deleted });
  } catch (error: unknown) {
    console.error("Delete Error:", error);
    const message = error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
