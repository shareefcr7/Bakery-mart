
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'bakery-mart/products',
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
          } else {
            resolve(
              NextResponse.json({
                url: result?.secure_url,
                success: true,
              })
            );
          }
        }
      );

      uploadStream.end(buffer);
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
