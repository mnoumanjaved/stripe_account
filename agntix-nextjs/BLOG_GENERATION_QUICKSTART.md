# Blog Generation System - Quick Start Guide

Welcome to the automated blog generation system! This guide will help you get started quickly.

---

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ A Supabase account (free tier works)
- ✅ OpenAI API key
- ✅ Serper API key
- ✅ Tavily API key

---

## Step 1: Install Dependencies

```bash
cd agntix-nextjs
npm install @supabase/supabase-js openai uuid node-cron
npm install --save-dev @types/uuid @types/node-cron
```

---

## Step 2: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your API keys in `.env.local`:

```env
# OpenAI
OPENAI_API_KEY=sk-proj-your-key-here

# Serper API (Google Search)
SERPER_API_KEY=your-serper-key-here

# Tavily API (Research)
TAVILY_API_KEY=tvly-your-key-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Configuration
BLOG_SEARCH_QUERY="AI Agents"
COMPANY_NAME="Your Company Name"
COMPANY_DESCRIPTION="Your company description"

# Cron Security
CRON_SECRET=your-random-secret-here

# Image Generation (optional)
IMAGE_GENERATION_METHOD=dalle
```

---

## Step 3: Set Up Supabase Database

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Open the `supabase-schema.sql` file
4. Copy and paste the entire SQL into the editor
5. Click **Run** to create all tables and functions

**Verify tables were created:**
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('blog_post', 'blog_keywords', 'workflow_logs')
ORDER BY tablename;
```

You should see all three tables listed.

---

## Step 4: Test the System

### Option A: Manual Trigger via API (Recommended for First Test)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open another terminal and trigger the workflow:
   ```bash
   curl -X POST http://localhost:3000/api/blog-generation/run
   ```

3. You'll receive a response like:
   ```json
   {
     "success": true,
     "message": "Blog generation workflow started",
     "workflowId": "abc123...",
     "statusUrl": "/api/blog-generation/status/abc123..."
   }
   ```

4. Check the status:
   ```bash
   curl http://localhost:3000/api/blog-generation/status/{workflowId}
   ```

### Option B: Test via Browser

1. Start dev server: `npm run dev`
2. Navigate to: http://localhost:3000/api/blog-generation/run
3. You should see the workflow started message
4. Check console logs for progress

---

## Step 5: Verify Blog Creation

### In Supabase Dashboard:

1. Go to **Table Editor**
2. Select `blog_post` table
3. You should see a new draft blog post
4. Check the `workflow_logs` table to see execution details

### Via SQL:

```sql
-- Get latest blog post
SELECT * FROM blog_post ORDER BY created_at DESC LIMIT 1;

-- Get workflow logs
SELECT * FROM workflow_logs
WHERE workflow_id = 'your-workflow-id'
ORDER BY created_at;
```

---

## Step 6: Set Up Scheduled Execution (Production)

### For Vercel Deployment:

1. The `vercel.json` file is already configured
2. Deploy to Vercel: `vercel --prod`
3. Cron jobs will run automatically every 12 hours
4. No additional setup needed!

### For Local Development:

Add to your `.env.local`:
```env
AUTO_START_SCHEDULER=true
```

The scheduler will auto-start when you run `npm run dev`.

---

## Monitoring & Debugging

### Check Logs

**Terminal logs:**
All workflow steps are logged to console with color coding:
- 🔵 Info (cyan)
- ✅ Success (green)
- ⚠️ Warning (yellow)
- ❌ Error (red)

**Database logs:**
```sql
-- Get recent workflow executions
SELECT * FROM recent_workflow_executions;

-- Get failed workflows
SELECT * FROM workflow_logs
WHERE status = 'failed'
ORDER BY created_at DESC;
```

### Common Issues

**Issue: "Missing API key"**
- Solution: Check `.env.local` has all required keys
- Restart dev server after adding keys

**Issue: "Database connection failed"**
- Solution: Verify Supabase credentials are correct
- Check if service role key is used (not anon key)

**Issue: "OpenAI rate limit"**
- Solution: Workflow has built-in retry logic
- Check OpenAI dashboard for usage limits

**Issue: "Workflow timeout"**
- Solution: Increase `maxDuration` in API routes
- Or split workflow into smaller chunks

---

## API Endpoints Reference

### Trigger Workflow
```bash
POST /api/blog-generation/run
Response: { workflowId, statusUrl }
```

### Check Status
```bash
GET /api/blog-generation/status/{workflowId}
Response: { workflow: { status, currentStep, steps[] } }
```

### Cron Endpoint (Scheduled)
```bash
POST /api/blog-generation/cron
Headers: Authorization: Bearer {CRON_SECRET}
Response: { blogId, title, slug }
```

---

## Customization

### Change Search Query

Edit `.env.local`:
```env
BLOG_SEARCH_QUERY="Your Topic Here"
```

### Adjust Schedule

**Vercel:**
Edit `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/blog-generation/cron",
    "schedule": "0 0 * * *"  // Daily at midnight
  }]
}
```

**Local Development:**
Edit `.env.local`:
```env
BLOG_SCHEDULE_INTERVAL="0 */6 * * *"  // Every 6 hours
```

### Modify Prompts

Edit `src/lib/blog-generation/config/prompts.ts`:
- Change company information
- Adjust blog requirements (word count, reading level)
- Modify AI prompts

### Change Word Count

Edit `.env.local`:
```env
MIN_WORD_COUNT=1000
MAX_WORD_COUNT=2500
```

---

## Cost Estimation

**Per blog post:**
- OpenAI: ~$0.19
- Serper API: ~$0.001
- Tavily API: ~$0.01
- **Total: ~$0.20**

**Monthly (2 posts/day):**
- ~$12

---

## Next Steps

1. ✅ **Test System** - Run a test workflow and verify blog creation
2. 📝 **Review Blog** - Check the generated blog in Supabase
3. 🎨 **Customize Prompts** - Adjust for your company/brand
4. 🚀 **Deploy to Production** - Deploy to Vercel
5. 📊 **Monitor Performance** - Check workflow logs regularly
6. 🔧 **Optimize** - Adjust prompts based on blog quality

---

## Troubleshooting Commands

```bash
# Check environment variables are loaded
npm run dev
# In another terminal:
curl http://localhost:3000/api/blog-generation/run

# View real-time logs
# Terminal will show all workflow steps

# Test database connection
# In Supabase SQL Editor:
SELECT NOW();

# Check latest workflow
# In Supabase SQL Editor:
SELECT * FROM workflow_logs
ORDER BY created_at DESC
LIMIT 10;
```

---

## Getting Help

### Documentation
- `BLOG_GENERATION_CONTEXT.md` - Complete system overview
- `INSTALL_DEPENDENCIES.md` - Dependency installation guide
- `supabase-schema.sql` - Database schema reference

### Common Scenarios

**Scenario: First time setup**
1. Install dependencies
2. Set up `.env.local`
3. Run database schema
4. Test with manual trigger

**Scenario: Testing locally**
1. Set `AUTO_START_SCHEDULER=false`
2. Use manual trigger endpoint
3. Monitor console logs

**Scenario: Deploying to production**
1. Add all env vars to Vercel
2. Set `CRON_SECRET`
3. Deploy with `vercel --prod`
4. Cron runs automatically

---

## Success Checklist

- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] Test workflow completed successfully
- [ ] Blog post visible in Supabase
- [ ] Workflow logs show "completed" status
- [ ] (Optional) Scheduler running
- [ ] (Optional) Deployed to production

---

## Quick Reference

### File Locations
```
agntix-nextjs/
├── .env.local                          # Your API keys (don't commit!)
├── supabase-schema.sql                 # Database schema
├── BLOG_GENERATION_CONTEXT.md          # Full documentation
├── src/
│   ├── app/api/blog-generation/        # API routes
│   └── lib/blog-generation/
│       ├── services/                   # All services
│       ├── workflows/                  # Main workflow
│       ├── config/                     # Prompts
│       └── utils/                      # Helpers
```

### Important Environment Variables
```env
OPENAI_API_KEY=              # Required
SERPER_API_KEY=              # Required
TAVILY_API_KEY=              # Required
NEXT_PUBLIC_SUPABASE_URL=    # Required
SUPABASE_SERVICE_ROLE_KEY=   # Required
BLOG_SEARCH_QUERY=           # Optional (default: "AI Agents")
```

---

**You're all set!** 🎉

Start generating high-quality, SEO-optimized blog posts automatically!
