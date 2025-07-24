-- Fix Database Policies with Correct Admin Email
-- Run this in Supabase SQL Editor

-- Drop existing admin policies
DROP POLICY IF EXISTS "Enable all access for admin" ON projects;
DROP POLICY IF EXISTS "Enable all access for admin" ON blog_posts;
DROP POLICY IF EXISTS "Enable all access for admin" ON bio_sections;
DROP POLICY IF EXISTS "Enable all access for admin" ON contact_info;
DROP POLICY IF EXISTS "Enable all access for admin" ON testimonials;
DROP POLICY IF EXISTS "Enable all access for admin" ON education;

-- Create new policies with your admin email
-- Projects policies
CREATE POLICY "Enable all access for admin" ON projects FOR ALL USING (auth.jwt() ->> 'email' = 'nii.alumni.cmu@gmail.com');

-- Blog posts policies  
CREATE POLICY "Enable all access for admin" ON blog_posts FOR ALL USING (auth.jwt() ->> 'email' = 'nii.alumni.cmu@gmail.com');

-- Bio sections policies
CREATE POLICY "Enable all access for admin" ON bio_sections FOR ALL USING (auth.jwt() ->> 'email' = 'nii.alumni.cmu@gmail.com');

-- Contact info policies
CREATE POLICY "Enable all access for admin" ON contact_info FOR ALL USING (auth.jwt() ->> 'email' = 'nii.alumni.cmu@gmail.com');

-- Testimonials policies
CREATE POLICY "Enable all access for admin" ON testimonials FOR ALL USING (auth.jwt() ->> 'email' = 'nii.alumni.cmu@gmail.com');

-- Education policies
CREATE POLICY "Enable all access for admin" ON education FOR ALL USING (auth.jwt() ->> 'email' = 'nii.alumni.cmu@gmail.com'); 