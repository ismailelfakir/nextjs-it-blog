'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2,
  AlertCircle,
  Check
} from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string, publicId: string) => void;
  onError?: (error: string) => void;
  maxFiles?: number;
  folder?: string;
  className?: string;
}

interface UploadedImage {
  url: string;
  publicId: string;
  originalName: string;
}

export function ImageUpload({ 
  onImageUploaded, 
  onError,
  maxFiles = 1,
  folder = 'blog-images',
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Get signed upload parameters
      const paramsResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folder }),
      });

      if (!paramsResponse.ok) {
        throw new Error('Failed to get upload parameters');
      }

      const { data } = await paramsResponse.json();
      const { uploadParams, uploadUrl } = data;

      // Create form data for Cloudinary upload
      const formData = new FormData();
      Object.entries(uploadParams).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      // Upload to Cloudinary with progress tracking
      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const result = await uploadResponse.json();
      
      const uploadedImage: UploadedImage = {
        url: result.secure_url,
        publicId: result.public_id,
        originalName: file.name,
      };

      setUploadedImages(prev => [...prev, uploadedImage]);
      onImageUploaded(result.secure_url, result.public_id);
      setUploadProgress(100);

    } catch (error: any) {
      console.error('Upload error:', error);
      onError?.(error.message || 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : uploading 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="text-center">
            {uploading ? (
              <div className="space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Uploading image...</p>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Drop your image here, or{' '}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Uploaded Images</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {uploadedImages.map((image, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={image.url}
                        alt={image.originalName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {image.originalName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded successfully
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}