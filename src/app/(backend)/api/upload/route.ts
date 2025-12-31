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

    // Check for placeholder values which cause crashes
    if (process.env.CLOUDINARY_API_KEY === 'your_api_key' || process.env.CLOUDINARY_API_SECRET === 'your_api_secret') {
       console.error("Cloudinary Configuration Error: You are using placeholder API keys.");
       // Fallback to local storage if in development, otherwise error
       if (process.env.NODE_ENV === 'production') {
          return NextResponse.json({ error: 'Invalid Cloudinary Configuration: Using placeholder keys.' }, { status: 500 });
       }
       // If dev, we can force local storage by saying hasCloudinaryKeys is false
       // But let's actually just return an error so the user knows to fix it, 
       // or else they might think it's working but it's not sticking.
       // Actually, the user wants the error fixed. The fix is to use local storage if keys are bad OR tell them.
       // Given the user request, I'll allow local fallback for now but log error.
    }

    if (hasCloudinaryKeys && process.env.CLOUDINARY_API_KEY !== 'your_api_key') {
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
    } catch {
      // Ignore error if directory exists
    }

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, ''); // Sanitize filename
    const uniqueFilename = `${uniqueSuffix}-${filename}`;
    const filepath = path.join(uploadsDir, uniqueFilename);

    try {
        await writeFile(filepath, buffer);
    } catch (fsError: unknown) {
        console.error('Local write error:', fsError);
        const err = fsError as { code?: string };
        if (err.code === 'EROFS' || err.code === 'EACCES') {
            return NextResponse.json({ 
                error: 'VERCEL ERROR: Read-only file system. This means Cloudinary keys are missing or incorrect, so the code tried to save locally and failed. Check your Vercel Environment Variables.' 
            }, { status: 500 });
        }
        throw fsError;
    }

    return NextResponse.json({
      url: `/uploads/${uniqueFilename}`,
      success: true,
    });

  } catch (error: unknown) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
