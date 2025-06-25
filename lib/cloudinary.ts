import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Helper function to generate signed upload parameters
export function generateSignedUploadParams(folder: string = 'blog-images') {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const uploadParams = {
    timestamp,
    folder,
    resource_type: 'image',
    allowed_formats: 'jpg,jpeg,png,gif,webp',
    max_file_size: 10485760, // 10MB
    quality: 'auto',
    fetch_format: 'auto',
  };

  const signature = cloudinary.utils.api_sign_request(
    uploadParams,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    ...uploadParams,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  };
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
) {
  return cloudinary.url(publicId, {
    quality: options.quality || 'auto',
    fetch_format: options.format || 'auto',
    width: options.width,
    height: options.height,
    crop: 'fill',
    gravity: 'auto',
  });
}