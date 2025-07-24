-- Fix Education Table Schema for CMS
-- Run this in Supabase SQL Editor

-- First, let's see what columns exist and add missing ones
-- The original education table was designed differently, so let's align it

-- Add missing columns that the forms expect
ALTER TABLE education 
ADD COLUMN IF NOT EXISTS degree TEXT,
ADD COLUMN IF NOT EXISTS field_of_study TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS is_current BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS achievements TEXT,
ADD COLUMN IF NOT EXISTS technologies TEXT,
ADD COLUMN IF NOT EXISTS employment_type TEXT DEFAULT 'full-time';

-- Update existing data to use proper structure
-- Move title to degree if degree is null
UPDATE education 
SET degree = title 
WHERE degree IS NULL AND title IS NOT NULL;

-- Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS idx_education_type ON education(type);
CREATE INDEX IF NOT EXISTS idx_education_start_date ON education(start_date);
CREATE INDEX IF NOT EXISTS idx_education_is_current ON education(is_current);
CREATE INDEX IF NOT EXISTS idx_education_achievements ON education USING gin(to_tsvector('english', achievements));
CREATE INDEX IF NOT EXISTS idx_education_technologies ON education USING gin(to_tsvector('english', technologies));

-- Add constraint for employment_type (drop first if exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_employment_type') THEN
        ALTER TABLE education DROP CONSTRAINT check_employment_type;
    END IF;
END $$;

ALTER TABLE education 
ADD CONSTRAINT check_employment_type 
CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'freelance', 'internship'));

-- Add comments
COMMENT ON COLUMN education.degree IS 'Degree name or job position title';
COMMENT ON COLUMN education.field_of_study IS 'Field of study or location for work experience';
COMMENT ON COLUMN education.start_date IS 'Start date of education or employment';
COMMENT ON COLUMN education.end_date IS 'End date of education or employment';
COMMENT ON COLUMN education.is_current IS 'Whether currently enrolled or employed';
COMMENT ON COLUMN education.achievements IS 'Key achievements and accomplishments';
COMMENT ON COLUMN education.technologies IS 'Technologies and skills used';
COMMENT ON COLUMN education.employment_type IS 'Type of employment for work experience entries'; 