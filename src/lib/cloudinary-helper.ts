export function extractPublicId(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) return null;
  
  try {
    // Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/filename.jpg
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload'); // Find 'upload' segment
    
    if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) return null;
    
    // Everything after the version (v1234..) is the public_id, minus parts of the extension
    // Often version is like v12356, so index + 1 is version, index + 2 starts the path
    
    // Let's take everything after 'upload'
    const pathParts = parts.slice(uploadIndex + 1);
    
    // Remove version part if it exists (starts with v and follows with numbers)
    if (pathParts[0].match(/^v\d+$/)) {
      pathParts.shift();
    }
    
    const publicIdWithExtension = pathParts.join('/');
    // Remove extension
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
    
    return publicId;
  } catch {
    return null;
  }
}
