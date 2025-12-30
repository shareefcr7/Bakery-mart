import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try Cloudinary upload if keys are present
    const hasCloudinaryKeys = 
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_SECRET;

    // CRITICAL: Vercel (Production) requires Cloudinary. Local storage is read-only or ephemeral.
    if (process.env.NODE_ENV === 'production' && !hasCloudinaryKeys) {
        return NextResponse.json({ 
            error: 'MISSING CLOUDINARY KEYS. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to Vercel settings.' 
        }, { status: 500 });
    }

    if (hasCloudinaryKeys) {
      try {
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'bakery-mart/products',
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
              if (error) reject(error);
              else if (result) resolve(result);
              else reject(new Error('Upload failed'));
            }
          );
          uploadStream.end(buffer);
        });

        return NextResponse.json({
          url: result.secure_url,
          success: true,
        });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed, falling back to local storage:', cloudinaryError);
        // Continue to local storage fallback
      }
    }

    // Local storage fallback
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure uploads directory exists
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (_err) {
      // Ignore error if directory exists
    }

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, ''); // Sanitize filename
    const uniqueFilename = `${uniqueSuffix}-${filename}`;
    const filepath = path.join(uploadsDir, uniqueFilename);

    await writeFile(filepath, buffer);

    return NextResponse.json({
      url: `/uploads/${uniqueFilename}`,
      success: true,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
