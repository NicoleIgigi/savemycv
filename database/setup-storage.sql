-- Supabase Storage Setup for Portfolio CMS
-- Run this in Supabase SQL Editor to create storage buckets

-- Create storage buckets for different types of images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('images', 'images', true, 10485760, '{image/jpeg,image/jpg,image/png,image/gif,image/webp}'),
  ('blog', 'blog', true, 10485760, '{image/jpeg,image/jpg,image/png,image/gif,image/webp}'),
  ('projects', 'projects', true, 10485760, '{image/jpeg,image/jpg,image/png,image/gif,image/webp}'),
  ('testimonials', 'testimonials', true, 10485760, '{image/jpeg,image/jpg,image/png,image/gif,image/webp}')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for authenticated users
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('images', 'blog', 'projects', 'testimonials'));

-- Allow authenticated users to update their uploads
CREATE POLICY "Allow authenticated updates" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id IN ('images', 'blog', 'projects', 'testimonials'));

-- Allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id IN ('images', 'blog', 'projects', 'testimonials'));

-- Allow public access to view images (since buckets are public)
CREATE POLICY "Allow public access" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id IN ('images', 'blog', 'projects', 'testimonials')); 