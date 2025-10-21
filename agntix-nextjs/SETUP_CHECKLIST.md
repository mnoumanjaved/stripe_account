# Blog Generation System - Setup Checklist

## ✅ Step 1: Install Dependencies (COMPLETED)
- [x] npm packages installed
- [x] TypeScript types installed

---

## 📝 Step 2: Get API Keys (TO DO)

You need to obtain the following API keys and add them to `.env.local`:

### 1. OpenAI API Key (Required)
**Get it from:** https://platform.openai.com/api-keys

**Steps:**
1. Sign up or log in to OpenAI
2. Go to API Keys section
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)
5. Add to `.env.local`: `OPENAI_API_KEY=sk-proj-...`

**Cost:** ~$0.19 per blog post (very affordable)

---

### 2. Serper API Key (Required)
**Get it from:** https://serper.dev/

**Steps:**
1. Sign up with Google
2. Get free 2,500 searches (worth $5)
3. Copy your API key
4. Add to `.env.local`: `SERPER_API_KEY=...`

**Cost:** Free tier available, then $0.001 per search

---

### 3. Tavily API Key (Required)
**Get it from:** https://tavily.com/

**Steps:**
1. Sign up for free account
2. Get your API key (starts with `tvly-...`)
3. Free tier: 1,000 requests/month
4. Add to `.env.local`: `TAVILY_API_KEY=tvly-...`

**Cost:** Free tier available, then $0.01 per search

---

### 4. Supabase Credentials (Required)
**Get it from:** https://app.supabase.com/

**Steps:**
1. Create a new project (free tier available)
2. Wait 2-3 minutes for project to initialize
3. Go to Project Settings > API
4. Copy the following:
   - Project URL: `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key: `SUPABASE_SERVICE_ROLE_KEY`
5. Add all three to `.env.local`

**Cost:** Free tier available (500MB database, 50,000 monthly active users)

---

## 🔧 Step 3: Configure Supabase Database (TO DO)

### Option A: Using Supabase Dashboard (Recommended)

1. Open your Supabase project: https://app.supabase.com/
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the file: `supabase-schema.sql`
5. Copy the entire contents
6. Paste into Supabase SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. You should see: "Success. No rows returned"

### Option B: Verify Tables Created

Run this query to verify:
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('blog_post', 'blog_keywords', 'workflow_logs', 'internal_links', 'blog_metrics')
ORDER BY tablename;
```

You should see 5 tables listed.

---

## 🧪 Step 4: Test the System (TO DO)

### Start Development Server
```bash
npm run dev
```

### Trigger Your First Blog Generation

**Option A: Using Browser**
1. Open: http://localhost:3000/api/blog-generation/run
2. You'll see: `{"success":true,"workflowId":"...","statusUrl":"..."}`

**Option B: Using Command Line**
```bash
curl -X POST http://localhost:3000/api/blog-generation/run
```

### Check Logs
Watch your terminal for colorful logs showing each step:
- 🔵 Fetching trends...
- 🔵 AI choosing topic...
- 🔵 Researching...
- 🔵 Generating blog...
- ✅ Blog generated successfully!

This will take **2-4 minutes** to complete.

---

## ✔️ Step 5: Verify Blog Created (TO DO)

### In Supabase Dashboard

1. Go to **Table Editor**
2. Select `blog_post` table
3. You should see your first blog post!
4. Check fields: title, content, slug, status (should be 'draft')

### Via SQL Query

```sql
SELECT
  id,
  title,
  slug,
  status,
  created_at
FROM blog_post
ORDER BY created_at DESC
LIMIT 1;
```

---

## 📊 Check Workflow Logs

```sql
SELECT
  step_name,
  status,
  duration_ms,
  created_at
FROM workflow_logs
WHERE workflow_id = 'YOUR_WORKFLOW_ID'
ORDER BY created_at;
```

You should see all 9 steps completed!

---

## 🎯 Your Current Status

- [x] Step 1: Dependencies installed ✅
- [ ] Step 2: Get API keys
  - [ ] OpenAI API key
  - [ ] Serper API key
  - [ ] Tavily API key
  - [ ] Supabase credentials
- [ ] Step 3: Run database schema
- [ ] Step 4: Test blog generation
- [ ] Step 5: Verify blog created

---

## 🆘 Troubleshooting

### Error: "Missing API key"
- Check `.env.local` has all keys filled in
- Restart dev server after adding keys

### Error: "Database connection failed"
- Verify Supabase URL and keys are correct
- Make sure you're using SERVICE_ROLE_KEY (not anon key for service)

### Error: "OpenAI rate limit"
- Check your OpenAI account has credits
- Free tier has limits, may need to add $5 credit

### Workflow takes too long
- Normal! First run takes 2-4 minutes
- Check logs to see current step

---

## 📝 Quick Command Reference

```bash
# Start dev server
npm run dev

# Trigger blog generation
curl -X POST http://localhost:3000/api/blog-generation/run

# Check status (replace {workflowId})
curl http://localhost:3000/api/blog-generation/status/{workflowId}
```

---

## 🎉 What Happens Next?

Once you complete these steps:

1. **Immediate:** You can manually trigger blog generation anytime
2. **Scheduled:** Deploy to Vercel and it runs every 12 hours automatically
3. **Customization:** Edit prompts in `src/lib/blog-generation/config/prompts.ts`
4. **Monitoring:** Check Supabase for all generated blogs and workflow logs

---

## 💰 Cost Summary

| Service | Free Tier | Cost After Free |
|---------|-----------|----------------|
| OpenAI | $5 credit (new accounts) | ~$0.19/blog |
| Serper | 2,500 searches | $0.001/search |
| Tavily | 1,000/month | $0.01/search |
| Supabase | 500MB database | Free tier sufficient |
| **Total** | **Generous free tier** | **~$0.20/blog** |

**Monthly cost (60 blogs):** ~$12

---

## 🚀 Next Steps After Setup

1. **Customize Company Info** - Edit `prompts.ts`
2. **Adjust Blog Style** - Modify AI prompts
3. **Change Topics** - Update `BLOG_SEARCH_QUERY`
4. **Deploy to Vercel** - Auto-scheduled execution
5. **Add Publishing Logic** - Auto-publish or review first

---

**Need help?** Check these files:
- `BLOG_GENERATION_QUICKSTART.md` - Detailed setup guide
- `BLOG_GENERATION_CONTEXT.md` - Complete documentation
- `.env.local` - Your configuration (update the placeholder values)

---

**Ready to get started?**

1. Get your API keys (30 minutes)
2. Run database schema (2 minutes)
3. Test workflow (5 minutes)

**Total setup time: ~40 minutes**

Let's generate some amazing blog posts! 🎉
