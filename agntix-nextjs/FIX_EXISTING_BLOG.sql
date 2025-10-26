-- ==============================================
-- Fix Existing Blog Post - Remove JSON from primary_keyword
-- ==============================================

-- This SQL will clean up the blog post that has JSON in the primary_keyword field
-- Run this in your Supabase SQL Editor

UPDATE blog_post
SET
  primary_keyword = 'What are AI agents? Definition, examples, and types | Google Cloud',
  updated_at = NOW()
WHERE
  primary_keyword LIKE '%{%query%}%'
  OR primary_keyword LIKE '{"query"%';

-- Verify the update
SELECT
  id,
  title,
  slug,
  primary_keyword,
  status
FROM blog_post
ORDER BY created_at DESC
LIMIT 5;
