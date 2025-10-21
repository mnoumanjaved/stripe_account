// ==============================================
// API Route: POST /api/blog-generation/cron
// Purpose: Scheduled blog generation endpoint (called by cron)
// ==============================================

import { NextRequest, NextResponse } from 'next/server';
import { BlogGenerationWorkflow } from '@/lib/blog-generation/workflows/blog-generation.workflow';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.warn('⚠️ Unauthorized cron attempt');
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    console.log('⏰ Scheduled blog generation triggered');

    // Create and execute workflow
    const workflow = new BlogGenerationWorkflow();
    const workflowId = workflow.getWorkflowId();

    // Execute workflow
    const result = await workflow.execute();

    if (result.success) {
      console.log('✅ Scheduled blog generation completed', {
        workflowId,
        blogId: result.blogData?.id,
        slug: result.blogData?.slug,
        duration: result.duration,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Blog generated successfully',
          workflowId,
          blog: {
            id: result.blogData?.id,
            title: result.blogData?.title,
            slug: result.blogData?.slug,
          },
          duration: result.duration,
        },
        { status: 200 }
      );
    } else {
      console.error('❌ Scheduled blog generation failed', {
        workflowId,
        error: result.error,
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Blog generation failed',
          workflowId,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in scheduled blog generation:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Workflow execution failed',
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Blog Generation Cron Endpoint',
      note: 'This endpoint should be called by your cron job scheduler',
      schedule: process.env.BLOG_SCHEDULE_INTERVAL || '0 */12 * * *',
    },
    { status: 200 }
  );
}
