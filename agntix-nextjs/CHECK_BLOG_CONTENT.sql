-- ==============================================
-- Check Blog Content in Database
-- ==============================================
-- Run this in Supabase SQL Editor to check if content exists

-- 1. Check if content field has data
SELECT
    id,
    title,
    slug,
    LENGTH(content) as content_length,
    LEFT(content, 100) as content_preview,
    status,
    created_at
FROM blog_post
ORDER BY created_at DESC
LIMIT 5;

-- 2. Check for empty or null content
SELECT
    id,
    title,
    slug,
    CASE
        WHEN content IS NULL THEN 'NULL'
        WHEN content = '' THEN 'EMPTY STRING'
        WHEN LENGTH(content) < 10 THEN 'TOO SHORT'
        ELSE 'HAS CONTENT'
    END as content_status
FROM blog_post
ORDER BY created_at DESC;

-- 3. Get full details of a specific blog (replace 'your-slug' with actual slug)
SELECT *
FROM blog_post
WHERE slug = 'your-slug-here'
LIMIT 1;

-- 4. Check all fields for a published blog
SELECT
    id,
    title,
    slug,
    metadescription,
    primary_keyword,
    imagename,
    webviewlink,
    tumbnaillink,
    status,
    LENGTH(content) as content_length,
    created_at
FROM blog_post
WHERE status = 'published'
ORDER BY created_at DESC
LIMIT 1;
