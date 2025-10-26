-- ==============================================
-- Blog Generation System - Database Schema
-- ==============================================
-- Run this in your Supabase SQL Editor
-- Project: Blog Auto-Generation System
-- ==============================================

-- ==============================================
-- 1. BLOG POSTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS blog_post (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  metadescription TEXT NOT NULL,
  primary_keyword TEXT,

  -- Image fields
  imagename TEXT,
  webviewlink TEXT,
  tumbnaillink TEXT,

  -- Status management
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Add comments
COMMENT ON TABLE blog_post IS 'Stores all generated blog posts with SEO metadata';
COMMENT ON COLUMN blog_post.status IS 'Blog status: draft, published, or archived';
COMMENT ON COLUMN blog_post.primary_keyword IS 'Main SEO keyword for the blog post';

-- ==============================================
-- 2. BLOG KEYWORDS TABLE (for internal linking)
-- ==============================================
CREATE TABLE IF NOT EXISTS blog_keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_post(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  relevance_score DECIMAL(3,2) DEFAULT 0.5, -- 0.0 to 1.0
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE blog_keywords IS 'Keywords extracted from each blog post for internal linking';
COMMENT ON COLUMN blog_keywords.relevance_score IS 'Keyword relevance score (0.0-1.0)';

-- ==============================================
-- 3. WORKFLOW LOGS TABLE (for monitoring)
-- ==============================================
CREATE TABLE IF NOT EXISTS workflow_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID NOT NULL, -- Unique ID for each workflow execution
  workflow_name TEXT NOT NULL DEFAULT 'blog-generation',
  status TEXT NOT NULL CHECK (status IN ('started', 'in_progress', 'completed', 'failed')),
  step_name TEXT, -- Current step being executed
  step_number INTEGER, -- Step sequence number
  error_message TEXT,
  error_stack TEXT,
  metadata JSONB DEFAULT '{}', -- Additional data (API response times, token usage, etc.)
  duration_ms INTEGER, -- Execution duration in milliseconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE workflow_logs IS 'Logs for monitoring blog generation workflow execution';
COMMENT ON COLUMN workflow_logs.workflow_id IS 'Unique identifier for each workflow execution';
COMMENT ON COLUMN workflow_logs.metadata IS 'JSON data: API times, token usage, costs, etc.';

-- ==============================================
-- 4. INTERNAL LINKS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS internal_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_blog_id UUID NOT NULL REFERENCES blog_post(id) ON DELETE CASCADE,
  target_blog_id UUID NOT NULL REFERENCES blog_post(id) ON DELETE CASCADE,
  anchor_text TEXT,
  link_position INTEGER, -- Position in the content
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate links
  UNIQUE(source_blog_id, target_blog_id)
);

COMMENT ON TABLE internal_links IS 'Tracks internal links between blog posts';
COMMENT ON COLUMN internal_links.link_position IS 'Character position where link appears in content';

-- ==============================================
-- 5. BLOG PERFORMANCE METRICS (optional)
-- ==============================================
CREATE TABLE IF NOT EXISTS blog_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_post(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  unique_views INTEGER DEFAULT 0,
  avg_time_on_page INTEGER, -- seconds
  bounce_rate DECIMAL(5,2), -- percentage
  conversions INTEGER DEFAULT 0,
  seo_score INTEGER, -- 0-100
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,

  -- One record per blog per day
  UNIQUE(blog_post_id, recorded_at)
);

COMMENT ON TABLE blog_metrics IS 'Daily performance metrics for each blog post';

-- ==============================================
-- INDEXES for Performance
-- ==============================================

-- Blog Posts
CREATE INDEX IF NOT EXISTS idx_blog_post_slug ON blog_post(slug);
CREATE INDEX IF NOT EXISTS idx_blog_post_status ON blog_post(status);
CREATE INDEX IF NOT EXISTS idx_blog_post_created_at ON blog_post(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_post_published_at ON blog_post(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blog_post_primary_keyword ON blog_post(primary_keyword);

-- Blog Keywords
CREATE INDEX IF NOT EXISTS idx_blog_keywords_keyword ON blog_keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_blog_keywords_blog_post_id ON blog_keywords(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_keywords_relevance ON blog_keywords(relevance_score DESC);

-- Workflow Logs
CREATE INDEX IF NOT EXISTS idx_workflow_logs_created_at ON workflow_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_logs_status ON workflow_logs(status);
CREATE INDEX IF NOT EXISTS idx_workflow_logs_workflow_id ON workflow_logs(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_logs_step ON workflow_logs(step_name);

-- Internal Links
CREATE INDEX IF NOT EXISTS idx_internal_links_source ON internal_links(source_blog_id);
CREATE INDEX IF NOT EXISTS idx_internal_links_target ON internal_links(target_blog_id);

-- Blog Metrics
CREATE INDEX IF NOT EXISTS idx_blog_metrics_blog_post_id ON blog_metrics(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_metrics_recorded_at ON blog_metrics(recorded_at DESC);

-- ==============================================
-- TRIGGERS
-- ==============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_post_updated_at
  BEFORE UPDATE ON blog_post
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-set published_at when status changes to 'published'
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_post_published_at
  BEFORE UPDATE ON blog_post
  FOR EACH ROW
  EXECUTE FUNCTION set_published_at();

-- ==============================================
-- ROW LEVEL SECURITY (RLS) - Optional
-- ==============================================
-- Uncomment if you want to enable RLS

-- Enable RLS
-- ALTER TABLE blog_post ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_keywords ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE workflow_logs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE internal_links ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_metrics ENABLE ROW LEVEL SECURITY;

-- Policy: Public can read published blogs
-- CREATE POLICY "Public can read published blogs"
--   ON blog_post FOR SELECT
--   USING (status = 'published');

-- Policy: Service role can do everything
-- CREATE POLICY "Service role has full access"
--   ON blog_post FOR ALL
--   USING (auth.role() = 'service_role');

-- ==============================================
-- VIEWS for Common Queries
-- ==============================================

-- Published blogs with metrics
CREATE OR REPLACE VIEW published_blogs_with_metrics AS
SELECT
  bp.*,
  COALESCE(SUM(bm.views), 0) as total_views,
  COALESCE(AVG(bm.seo_score), 0) as avg_seo_score,
  COUNT(DISTINCT il.target_blog_id) as outbound_links,
  (
    SELECT COUNT(*)
    FROM internal_links il2
    WHERE il2.target_blog_id = bp.id
  ) as inbound_links
FROM blog_post bp
LEFT JOIN blog_metrics bm ON bp.id = bm.blog_post_id
LEFT JOIN internal_links il ON bp.id = il.source_blog_id
WHERE bp.status = 'published'
GROUP BY bp.id;

COMMENT ON VIEW published_blogs_with_metrics IS 'Published blogs with aggregated metrics';

-- Recent workflow executions
CREATE OR REPLACE VIEW recent_workflow_executions AS
SELECT
  workflow_id,
  workflow_name,
  status,
  MIN(created_at) as started_at,
  MAX(created_at) as last_updated_at,
  SUM(duration_ms) as total_duration_ms,
  ARRAY_AGG(
    CASE WHEN error_message IS NOT NULL
    THEN json_build_object('step', step_name, 'error', error_message)
    ELSE NULL END
  ) FILTER (WHERE error_message IS NOT NULL) as errors
FROM workflow_logs
GROUP BY workflow_id, workflow_name, status
ORDER BY started_at DESC
LIMIT 100;

COMMENT ON VIEW recent_workflow_executions IS 'Last 100 workflow executions with summary';

-- ==============================================
-- FUNCTIONS for Common Operations
-- ==============================================

-- Get blog posts for internal linking
CREATE OR REPLACE FUNCTION get_blogs_for_internal_linking(
  current_blog_id UUID,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  primary_keyword TEXT,
  keywords TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    bp.id,
    bp.title,
    bp.slug,
    bp.primary_keyword,
    ARRAY_AGG(DISTINCT bk.keyword) as keywords
  FROM blog_post bp
  LEFT JOIN blog_keywords bk ON bp.id = bk.blog_post_id
  WHERE
    bp.status = 'published'
    AND bp.id != current_blog_id
  GROUP BY bp.id, bp.title, bp.slug, bp.primary_keyword
  ORDER BY bp.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_blogs_for_internal_linking IS 'Fetch published blogs with keywords for internal linking';

-- Log workflow step
CREATE OR REPLACE FUNCTION log_workflow_step(
  p_workflow_id UUID,
  p_step_name TEXT,
  p_status TEXT,
  p_metadata JSONB DEFAULT '{}',
  p_error_message TEXT DEFAULT NULL,
  p_error_stack TEXT DEFAULT NULL,
  p_duration_ms INTEGER DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
  step_num INTEGER;
BEGIN
  -- Get next step number
  SELECT COALESCE(MAX(step_number), 0) + 1
  INTO step_num
  FROM workflow_logs
  WHERE workflow_id = p_workflow_id;

  -- Insert log
  INSERT INTO workflow_logs (
    workflow_id,
    step_name,
    step_number,
    status,
    metadata,
    error_message,
    error_stack,
    duration_ms
  ) VALUES (
    p_workflow_id,
    p_step_name,
    step_num,
    p_status,
    p_metadata,
    p_error_message,
    p_error_stack,
    p_duration_ms
  )
  RETURNING id INTO log_id;

  RETURN log_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION log_workflow_step IS 'Log a workflow step execution';

-- ==============================================
-- SEED DATA (Optional - for testing)
-- ==============================================

-- Insert a test blog post
-- INSERT INTO blog_post (title, content, slug, metadescription, status, primary_keyword)
-- VALUES (
--   'Getting Started with AI Agents',
--   'AI agents are revolutionizing the way we interact with technology...',
--   'getting-started-ai-agents',
--   'Learn how AI agents are transforming modern technology and business operations.',
--   'published',
--   'AI Agents'
-- );

-- ==============================================
-- CLEANUP (if needed)
-- ==============================================

-- To drop all tables (USE WITH CAUTION):
-- DROP TABLE IF EXISTS blog_metrics CASCADE;
-- DROP TABLE IF EXISTS internal_links CASCADE;
-- DROP TABLE IF EXISTS workflow_logs CASCADE;
-- DROP TABLE IF EXISTS blog_keywords CASCADE;
-- DROP TABLE IF EXISTS blog_post CASCADE;
-- DROP VIEW IF EXISTS published_blogs_with_metrics;
-- DROP VIEW IF EXISTS recent_workflow_executions;
-- DROP FUNCTION IF EXISTS get_blogs_for_internal_linking;
-- DROP FUNCTION IF EXISTS log_workflow_step;
-- DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
-- DROP FUNCTION IF EXISTS set_published_at CASCADE;

-- ==============================================
-- END OF SCHEMA
-- ==============================================

-- Verify tables created
SELECT
  tablename,
  schemaname
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('blog_post', 'blog_keywords', 'workflow_logs', 'internal_links', 'blog_metrics')
ORDER BY tablename;
