
"use client";

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Compress image
    const compressedFile = await new Promise<File>((resolve) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scale = MAX_WIDTH / img.width;
        
        if (scale < 1) {
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scale;
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
                resolve(file); // Fallback to original
            }
        }, 'image/jpeg', 0.8); // 80% quality
      };
      img.onerror = () => resolve(file);
    });

    const formData = new FormData();
    formData.append('file', compressedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        if (data.error?.includes("Read-only file system") || data.error?.includes("MISSING CLOUDINARY KEYS")) {
           alert("DEPLOYMENT ERROR: Cloudinary keys are missing in Vercel settings. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
        } else {
           alert('Upload failed: ' + (data.error || 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {value ? (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 group">
          <Image 
            src={value} 
            alt="Uploaded image" 
            fill 
            className="object-cover"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full transition-opacity shadow-sm hover:bg-red-700"
            disabled={disabled}
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-40 h-40 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 
            flex flex-col items-center justify-center cursor-pointer hover:border-red-500 
            transition-colors bg-zinc-50 dark:bg-zinc-800/50
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-xs text-zinc-500 font-medium">Upload Image</span>
            </>
          )}
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
}
