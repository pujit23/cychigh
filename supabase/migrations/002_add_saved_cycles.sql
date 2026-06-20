-- Add saved_cycles column to users table for cycle bookmarking
ALTER TABLE users ADD COLUMN IF NOT EXISTS saved_cycles JSONB DEFAULT '[]'::jsonb;
