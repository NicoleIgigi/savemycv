-- Create tables for the CMS
-- Run these commands in your Supabase SQL Editor

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  tech_stack TEXT[], -- Array of technologies
  category TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  tags TEXT[], -- Array of tags
  read_time TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  medium_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bio/About sections table
CREATE TABLE bio_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL UNIQUE, -- 'hero', 'about', 'skills', etc.
  title TEXT,
  content TEXT,
  image_url TEXT,
  data JSONB, -- For flexible data like skills array, social links, etc.
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact information table
CREATE TABLE contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  phone TEXT,
  location TEXT,
  social_links JSONB, -- {"linkedin": "url", "github": "url", etc.}
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Education/Certifications table
CREATE TABLE education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'education', 'certification', 'course'
  title TEXT NOT NULL,
  institution TEXT,
  description TEXT,
  image_url TEXT,
  url TEXT,
  date_completed DATE,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bio_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin only)
-- You'll need to replace 'your-admin-email@example.com' with your actual admin email

-- Projects policies
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Enable all access for admin" ON projects FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Blog posts policies
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Enable all access for admin" ON blog_posts FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Bio sections policies
CREATE POLICY "Enable read access for all users" ON bio_sections FOR SELECT USING (published = true);
CREATE POLICY "Enable all access for admin" ON bio_sections FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Contact info policies
CREATE POLICY "Enable read access for all users" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Enable all access for admin" ON contact_info FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Testimonials policies
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (published = true);
CREATE POLICY "Enable all access for admin" ON testimonials FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Education policies
CREATE POLICY "Enable read access for all users" ON education FOR SELECT USING (published = true);
CREATE POLICY "Enable all access for admin" ON education FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin-email@example.com');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bio_sections_updated_at BEFORE UPDATE ON bio_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 