-- ==============================================
-- Check if database tables are set up correctly
-- ==============================================
-- Run this in Supabase SQL Editor to verify everything is correct

-- 1. Check if blog_post table exists and has correct columns
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'blog_post'
ORDER BY ordinal_position;

-- Expected columns:
-- id, title, content, slug, metadescription, primary_keyword
-- imagename, webviewlink, tumbnaillink, status
-- created_at, updated_at, published_at

-- 2. Check if we're getting the right column names (should be created_at NOT createdat)
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'blog_post'
AND column_name LIKE '%created%';

-- Should return: created_at (not createdat)

-- 3. Check how many blog posts exist
SELECT COUNT(*) as total_blogs FROM blog_post;

-- 4. Check if any blogs have JSON in primary_keyword
SELECT id, title, primary_keyword, status
FROM blog_post
WHERE primary_keyword LIKE '%{%'
ORDER BY created_at DESC;
