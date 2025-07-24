-- Update Database Schema for Enhanced Experience Management
-- Run this in Supabase SQL Editor after running the main schema

-- Add additional columns to education table for enhanced experience functionality
ALTER TABLE education 
ADD COLUMN IF NOT EXISTS achievements TEXT,
ADD COLUMN IF NOT EXISTS technologies TEXT,
ADD COLUMN IF NOT EXISTS employment_type TEXT DEFAULT 'full-time';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_education_achievements ON education USING gin(to_tsvector('english', achievements));
CREATE INDEX IF NOT EXISTS idx_education_technologies ON education USING gin(to_tsvector('english', technologies));
CREATE INDEX IF NOT EXISTS idx_education_employment_type ON education(employment_type);

-- Add check constraint for employment_type
ALTER TABLE education 
ADD CONSTRAINT check_employment_type 
CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'freelance', 'internship'));

-- Comment the new columns
COMMENT ON COLUMN education.achievements IS 'Key achievements and accomplishments in this role';
COMMENT ON COLUMN education.technologies IS 'Technologies, tools, and skills used (comma-separated)';
COMMENT ON COLUMN education.employment_type IS 'Type of employment (full-time, part-time, contract, freelance, internship)';

-- Sample data insertion for testing (uncomment to use)
/*
INSERT INTO education (institution, degree, field_of_study, description, achievements, technologies, start_date, end_date, is_current, type, employment_type)
VALUES 
('TechCorp Inc.', 'Senior Software Engineer', 'San Francisco, CA', 
 'Led development of scalable web applications serving 1M+ users', 
 'Increased system performance by 40%, Led team of 5 developers, Launched 3 major features',
 'React, Node.js, PostgreSQL, AWS, Docker, Kubernetes',
 '2022-01-01', NULL, true, 'experience', 'full-time'),

('StartupXYZ', 'Full Stack Developer', 'New York, NY',
 'Developed and maintained multiple client-facing applications',
 'Built entire frontend from scratch, Reduced load times by 60%, Mentored 2 junior developers',
 'Vue.js, Python, Django, MySQL, Redis',
 '2020-06-01', '2021-12-31', false, 'experience', 'full-time');
*/ 