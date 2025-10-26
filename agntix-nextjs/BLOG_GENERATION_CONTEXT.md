# Blog Generation System - Implementation Context

## Overview
This document provides complete context for the automated blog generation system implemented in this Next.js project. The system is based on an n8n workflow (`blogGeneration.json`) and has been converted into a native Next.js implementation.

---

## System Purpose
Automatically generate SEO-optimized blog posts every 12 hours by:
1. Discovering trending topics using Google search trends
2. Researching content from authoritative sources
3. Generating comprehensive, SEO-optimized blog posts using AI
4. Adding internal links to previous blog posts
5. Creating SEO metadata (slug, title, meta description)
6. Generating/fetching featured images
7. Storing everything in Supabase database

---

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.2.0 with TypeScript
- **Runtime**: Node.js
- **Database**: Supabase (PostgreSQL)
- **AI Provider**: OpenAI (GPT-4o-mini, GPT-4.1, O1-mini)
- **APIs**:
  - Serper API (Google search trends)
  - Tavily API (advanced research)
  - OpenAI API (content generation)
  - Google Drive API (image management)

### Project Structure
```
agntix-nextjs/
├── src/
│   ├── app/
│   │   └── api/
│   │       └── blog-generation/      # API routes for blog system
│   │           ├── run/              # POST - manually trigger workflow
│   │           ├── status/           # GET - check workflow status
│   │           └── cron/             # POST - scheduled endpoint
│   ├── lib/
│   │   └── blog-generation/          # Core business logic
│   │       ├── services/             # Individual service modules
│   │       │   ├── trends.service.ts
│   │       │   ├── ai.service.ts
│   │       │   ├── research.service.ts
│   │       │   ├── database.service.ts
│   │       │   ├── image.service.ts
│   │       │   └── scheduler.service.ts
│   │       ├── workflows/
│   │       │   └── blog-generation.workflow.ts
│   │       ├── utils/
│   │       │   ├── logger.ts
│   │       │   ├── error-handler.ts
│   │       │   └── retry.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── config/
│   │           └── prompts.ts
│   └── utils/
│       └── supabase.ts              # Supabase client
├── .env.local                        # Environment variables
├── blogGeneration.json               # Original n8n workflow (reference)
└── BLOG_GENERATION_CONTEXT.md        # This file
```

---

## Workflow Detailed Breakdown

### Complete Flow Sequence

```
1. SCHEDULE TRIGGER (Every 12 hours)
   ↓
2. FETCH TRENDS (Serper API)
   - Query: "AI Agents" (configurable)
   - Returns: Top organic search results
   ↓
3. FORMAT TOP 4 TRENDING
   - Extract top 4 results
   - Assign scores: #1=100, #2=90, #3=85, #4=80
   ↓
4. EXTRACT HIGH VOLUME KEYWORDS
   - Take top 5 organic results
   - Extract titles
   - Join as comma-separated string
   ↓
5. CHOOSE TOPIC (AI - GPT-4o-mini)
   - Input: Top 2 trending keywords
   - AI selects best topic for SEO
   - Output: Single keyword/topic
   ↓
6. RESEARCH (Tavily API)
   - Depth: Advanced
   - Max results: 10
   - Returns: Content + source URLs
   ↓
7. FORMAT RESEARCH
   - Map: "content - source: URL"
   - Join with line breaks
   ↓
8. GENERATE BLOG POST (AI - GPT-4.1)
   - Input: Topic + Research
   - Length: 1500-2000 words
   - Reading level: Year 5
   - Tone: Reporter-style
   - Output: Complete blog draft
   ↓
9. ADD INTERNAL LINKS (AI - O1-mini)
   - Add minimum 5 internal links
   - Links to previous blog posts
   - Only highly relevant links
   ↓
10. GENERATE SLUG (AI - GPT-4o-mini)
    - 4-5 words max
    - Includes primary keyword
    - URL-friendly format
    ↓
11. EXTRACT TITLE (AI - GPT-4o-mini)
    - Includes primary keyword
    - Clear and informative
    - No markdown formatting
    ↓
12. GENERATE META DESCRIPTION (AI - GPT-4o-mini)
    - 150-160 characters
    - Includes primary keyword
    - Actionable and engaging
    ↓
13. GET/GENERATE IMAGE
    - Calls image generation workflow
    - Returns: imageName, webViewLink, thumbnailLink
    ↓
14. SAVE TO DATABASE (Supabase)
    - Table: blog_post
    - All fields: title, content, slug, metadescription, image links
```

---

## Database Schema

### Table: `blog_post`

```sql
CREATE TABLE blog_post (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  metadescription TEXT NOT NULL,
  imagename TEXT,
  webviewlink TEXT,
  tumbnaillink TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'published'
  primary_keyword TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_blog_post_slug ON blog_post(slug);
CREATE INDEX idx_blog_post_status ON blog_post(status);
CREATE INDEX idx_blog_post_created_at ON blog_post(created_at DESC);
```

### Table: `blog_keywords` (for internal linking)

```sql
CREATE TABLE blog_keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID REFERENCES blog_post(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blog_keywords_keyword ON blog_keywords(keyword);
CREATE INDEX idx_blog_keywords_blog_post_id ON blog_keywords(blog_post_id);
```

### Table: `workflow_logs` (for monitoring)

```sql
CREATE TABLE workflow_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_name TEXT NOT NULL,
  status TEXT NOT NULL, -- 'started', 'completed', 'failed'
  step_name TEXT,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workflow_logs_created_at ON workflow_logs(created_at DESC);
CREATE INDEX idx_workflow_logs_status ON workflow_logs(status);
```

---

## Service Details

### 1. Trends Service (`trends.service.ts`)

**Purpose**: Fetch trending topics from Google search

**Functions**:
- `fetchTrendingTopics(query: string)`: Calls Serper API
- `formatTopTrending(results)`: Formats top 4 with scores
- `extractHighVolumeKeywords(results)`: Extracts top 5 titles

**API**: Serper API
- Endpoint: `https://google.serper.dev/search`
- Auth: API Key in query params
- Parameters: `q`, `apiKey`, `gl`, `hl`, `type`

---

### 2. AI Service (`ai.service.ts`)

**Purpose**: All AI-powered content generation

**Functions**:
- `chooseTopic(keywords)`: Select best topic (GPT-4o-mini)
- `generateBlogPost(topic, research)`: Write blog (GPT-4.1)
- `addInternalLinks(content)`: Add links (O1-mini)
- `generateSlug(content, keyword)`: Create slug (GPT-4o-mini)
- `extractTitle(content, keyword)`: Extract title (GPT-4o-mini)
- `generateMetaDescription(content, keyword)`: Meta desc (GPT-4o-mini)

**Model Selection**:
- **O1-mini**: Complex reasoning (internal linking)
- **GPT-4.1**: Long-form content (blog writing)
- **GPT-4o-mini**: Quick tasks (slug, title, meta)

**Prompt Templates**: Stored in `config/prompts.ts` for easy editing

---

### 3. Research Service (`research.service.ts`)

**Purpose**: Deep research using Tavily API

**Functions**:
- `performResearch(topic)`: Advanced search
- `formatResearchResults(results)`: Format with sources

**API**: Tavily API
- Endpoint: `https://api.tavily.com/search`
- Auth: Bearer token
- Parameters: `query`, `search_depth`, `max_results`

---

### 4. Database Service (`database.service.ts`)

**Purpose**: All Supabase interactions

**Functions**:
- `saveBlogPost(data)`: Insert new blog
- `getPreviousBlogPosts(limit)`: Fetch for internal linking
- `updateBlogStatus(id, status)`: Publish/draft
- `getBlogBySlug(slug)`: Retrieve blog
- `logWorkflowStep(step, status, metadata)`: Logging

---

### 5. Image Service (`image.service.ts`)

**Purpose**: Generate/fetch blog images

**Functions**:
- `generateBlogImage(topic)`: Create image
- `uploadToGoogleDrive(image)`: Upload
- `getImageLinks(fileId)`: Get view/thumbnail links

**Options**:
- Call separate n8n workflow (ID: d3zC5KSizarXTStv)
- Use DALL-E API directly
- Use stock photo API (Unsplash, Pexels)

---

### 6. Scheduler Service (`scheduler.service.ts`)

**Purpose**: Schedule workflow execution

**Functions**:
- `scheduleWorkflow(interval)`: Setup cron
- `executeWorkflow()`: Run workflow
- `stopScheduler()`: Stop cron

**Implementation Options**:
- `node-cron` (local development)
- Vercel Cron (production - Vercel)
- AWS EventBridge (production - AWS)

---

## Configuration

### Environment Variables (.env.local)

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Serper API
SERPER_API_KEY=your_serper_key_here

# Tavily API
TAVILY_API_KEY=your_tavily_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Drive (for images)
GOOGLE_DRIVE_CLIENT_ID=...
GOOGLE_DRIVE_CLIENT_SECRET=...
GOOGLE_DRIVE_REFRESH_TOKEN=...

# Workflow Configuration
BLOG_SEARCH_QUERY="AI Agents"
BLOG_SCHEDULE_INTERVAL="0 */12 * * *"  # Every 12 hours
COMPANY_NAME="Hotel Selection"
COMPANY_DESCRIPTION="..."
TARGET_MARKET="..."

# Image Workflow (if using n8n)
N8N_WORKFLOW_URL=https://your-n8n.com/webhook/...
N8N_API_KEY=...

# Environment
NODE_ENV=development
```

---

## AI Prompt Templates

All prompts are stored in `lib/blog-generation/config/prompts.ts`:

### 1. Topic Selection Prompt
- Input: Top 2 trending keywords with scores
- Output: Single keyword
- Considerations: Relevance, SEO value, trend score

### 2. Blog Writing Prompt
- Input: Topic, research findings, company info
- Output: 1500-2000 word blog
- Requirements: Year 5 reading level, reporter tone, source citations

### 3. Internal Linking Prompt
- Input: Blog content, previous blog summaries
- Output: Blog with minimum 5 internal links
- Rules: Only highly relevant links, maintain context

### 4. Slug Generation Prompt
- Input: Blog content, primary keyword
- Output: 4-5 word URL-friendly slug
- Format: lowercase, hyphens, includes keyword

### 5. Title Extraction Prompt
- Input: Blog content, primary keyword
- Output: Blog title (no formatting)
- Requirements: Includes keyword, clear, informative

### 6. Meta Description Prompt
- Input: Blog content, primary keyword
- Output: 150-160 character meta description
- Requirements: Includes keyword, actionable, engaging

---

## API Routes

### POST `/api/blog-generation/run`
**Purpose**: Manually trigger blog generation

**Request**: None required

**Response**:
```json
{
  "success": true,
  "message": "Blog generation started",
  "workflowId": "uuid"
}
```

---

### GET `/api/blog-generation/status/:workflowId`
**Purpose**: Check workflow execution status

**Response**:
```json
{
  "workflowId": "uuid",
  "status": "completed",
  "currentStep": "save-to-database",
  "error": null,
  "result": {
    "blogId": "uuid",
    "slug": "ai-agents-revolutionize-industry"
  }
}
```

---

### POST `/api/blog-generation/cron`
**Purpose**: Endpoint for scheduled execution (Vercel Cron)

**Headers**: `Authorization: Bearer <CRON_SECRET>`

**Response**:
```json
{
  "success": true,
  "triggered": true
}
```

---

## Error Handling Strategy

### Retry Logic
- Maximum 3 attempts per step
- Exponential backoff: 1s, 2s, 4s
- Log each retry attempt

### Error Types
1. **API Errors**: Network issues, rate limits
2. **AI Errors**: Token limits, invalid responses
3. **Database Errors**: Connection issues, constraint violations
4. **Validation Errors**: Missing data, invalid format

### Recovery
- Store partial results in database
- Send alerts via email/Slack
- Manual intervention options via admin panel

---

## Monitoring & Logging

### What to Log
1. Workflow start/completion
2. Each step execution
3. API call durations
4. AI token usage
5. Errors with stack traces
6. Final blog post ID

### Metrics to Track
- Total execution time per workflow
- Success/failure rate
- Average cost per blog post
- API response times
- Database query performance

### Alerts
- Workflow failures (immediate)
- API rate limits approaching
- Database errors
- Unusual execution times

---

## Cost Breakdown

### Per Blog Post (Estimated)

**OpenAI API**:
- Topic selection: $0.01
- Blog writing (2000 tokens output): $0.10
- Internal links: $0.05
- Slug, title, meta (3 calls): $0.03
- **Subtotal**: ~$0.19

**External APIs**:
- Serper API: $0.001
- Tavily API: $0.01

**Total per post**: ~$0.20

**Monthly** (2 posts/day × 30 days): ~$12.00

---

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)
- **Pros**: Native Next.js support, Vercel Cron, easy setup
- **Cons**: 10-minute function timeout on Hobby plan
- **Setup**: Deploy + configure cron in `vercel.json`

### Option 2: AWS (EC2 + Lambda)
- **Pros**: Full control, no timeout limits
- **Cons**: More complex setup, higher maintenance
- **Setup**: Docker container or Lambda with EventBridge

### Option 3: Railway/Render
- **Pros**: Simple deployment, scheduled jobs
- **Cons**: Cold starts, pricing
- **Setup**: Deploy + configure cron jobs

---

## Customization Guide

### Change Search Query
Edit `.env.local`:
```env
BLOG_SEARCH_QUERY="Your New Topic"
```

### Adjust Schedule
Edit `.env.local`:
```env
BLOG_SCHEDULE_INTERVAL="0 0 * * *"  # Daily at midnight
```

### Modify Company Information
Edit `lib/blog-generation/config/prompts.ts`:
```typescript
export const COMPANY_INFO = {
  name: "Your Company",
  description: "...",
  products: "...",
  targetMarket: "..."
}
```

### Change Blog Requirements
Edit blog writing prompt in `prompts.ts`:
- Word count: Change min/max
- Reading level: Adjust complexity
- Tone: Modify style instructions

---

## Security Considerations

### API Keys
- ⚠️ **CRITICAL**: Remove exposed keys from `blogGeneration.json`
  - Serper API key exposed
  - Tavily API key exposed
- Never commit `.env.local` to Git
- Rotate keys regularly
- Use environment variables only

### Rate Limiting
- Implement rate limiting on API routes
- Handle 429 errors gracefully
- Add exponential backoff

### Input Validation
- Sanitize AI-generated content
- Validate URLs before storage
- Check content length limits
- Prevent SQL injection

### Access Control
- Protect admin endpoints with auth
- Use Supabase RLS (Row Level Security)
- Implement CORS policies

---

## Testing Strategy

### Unit Tests
- Test each service independently
- Mock external API calls
- Validate data transformations

### Integration Tests
- Test complete workflow
- Use test database
- Mock expensive AI calls

### Manual Testing Checklist
- [ ] Trigger workflow manually
- [ ] Verify blog post created
- [ ] Check all metadata correct
- [ ] Validate internal links
- [ ] Review image uploaded
- [ ] Confirm database entry

---

## Troubleshooting

### Common Issues

**Issue**: Workflow times out
- **Solution**: Increase function timeout or split into smaller steps

**Issue**: AI generates low-quality content
- **Solution**: Refine prompts, add examples, increase temperature

**Issue**: No internal links added
- **Solution**: Ensure previous blog posts exist with keywords

**Issue**: Image generation fails
- **Solution**: Check Google Drive permissions, verify workflow ID

**Issue**: Database connection errors
- **Solution**: Check Supabase credentials, verify RLS policies

---

## Future Enhancements

### Phase 2
- [ ] Multi-language support
- [ ] A/B testing for titles/slugs
- [ ] Automatic plagiarism checking
- [ ] SEO score calculation
- [ ] Social media auto-posting

### Phase 3
- [ ] Admin dashboard (React)
- [ ] Content calendar
- [ ] Performance analytics
- [ ] Keyword research integration
- [ ] Competitor analysis

### Phase 4
- [ ] Voice/video content generation
- [ ] Email newsletter integration
- [ ] WordPress auto-publishing
- [ ] AI-powered image generation (DALL-E)

---

## Maintenance

### Daily
- Monitor workflow execution logs
- Check error alerts
- Review generated blog quality

### Weekly
- Analyze cost metrics
- Review SEO performance
- Update keyword strategies

### Monthly
- Rotate API keys
- Database cleanup (old logs)
- Performance optimization
- Prompt refinement

---

## Support & Documentation

### External Documentation
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Serper API Docs](https://serper.dev/docs)
- [Tavily API Docs](https://docs.tavily.com)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Internal Files
- `blogGeneration.json` - Original n8n workflow
- `BLOG_GENERATION_CONTEXT.md` - This file
- `README.md` - Project setup
- `.env.example` - Environment template

---

## Version History

### v1.0.0 (Current)
- Initial implementation from n8n workflow
- Core services implemented
- Basic error handling
- Supabase integration
- Manual trigger via API

### Planned v1.1.0
- Admin panel
- Enhanced monitoring
- Better error recovery
- Cost optimization

---

## Contributors

This system was converted from an n8n workflow to a native Next.js implementation.

Original n8n workflow: `blogGeneration.json`
Implementation date: 2025-01-XX
Last updated: 2025-01-XX

---

## Quick Start

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`
3. Fill in all API keys
4. Run database migrations
5. Test manually: `POST /api/blog-generation/run`
6. Deploy to Vercel
7. Configure cron job

---

**END OF CONTEXT DOCUMENT**
