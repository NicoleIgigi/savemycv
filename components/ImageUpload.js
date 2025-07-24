'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ 
  currentImage, 
  onImageUpload, 
  bucket = 'images',
  folder = 'uploads',
  label = 'Image',
  accept = 'image/*'
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const supabase = createClientComponentClient();

  const uploadImage = async (file) => {
    try {
      setUploading(true);

      if (!file) {
        throw new Error('You must select an image to upload.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onImageUpload(data.publicUrl);
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeImage = () => {
    onImageUpload('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Current image"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragOver 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Upload an image'}
              </span>
              <span className="mt-1 block text-sm text-gray-500">
                Or drag and drop here
              </span>
            </label>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Upload className="h-4 w-4" />
        <span>Supports: JPG, PNG, GIF up to 10MB</span>
      </div>
    </div>
  );
} 