# Blog Generation System - Install Dependencies

## Required NPM Packages

Run the following command to install all required dependencies for the blog generation system:

```bash
npm install @supabase/supabase-js openai uuid node-cron
```

## Package Details

### Core Dependencies

1. **@supabase/supabase-js** - Supabase client for database operations
   ```bash
   npm install @supabase/supabase-js
   ```

2. **openai** - Official OpenAI SDK for AI operations
   ```bash
   npm install openai
   ```

3. **uuid** - Generate unique workflow IDs
   ```bash
   npm install uuid
   ```

4. **node-cron** - Schedule workflow execution
   ```bash
   npm install node-cron
   ```

### Type Definitions

```bash
npm install --save-dev @types/uuid @types/node-cron
```

## Complete Installation Command

```bash
npm install @supabase/supabase-js openai uuid node-cron && npm install --save-dev @types/uuid @types/node-cron
```

## Verify Installation

After installation, verify packages are installed:

```bash
npm list @supabase/supabase-js openai uuid node-cron
```

## Next Steps

After installing dependencies:

1. Copy `.env.example` to `.env.local`
2. Fill in all API keys in `.env.local`
3. Run the database schema in Supabase SQL Editor (`supabase-schema.sql`)
4. Test the system with: `npm run dev` and navigate to `/api/blog-generation/run`
