// ==============================================
// API Route: POST /api/blog-generation/run
// Purpose: Manually trigger blog generation workflow
// ==============================================

import { NextRequest, NextResponse } from 'next/server';
import { BlogGenerationWorkflow } from '@/lib/blog-generation/workflows/blog-generation.workflow';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Manual blog generation triggered');

    // Create and execute workflow
    const workflow = new BlogGenerationWorkflow();
    const workflowId = workflow.getWorkflowId();

    // Run workflow in the background (don't await)
    workflow.execute().then((result) => {
      if (result.success) {
        console.log('✅ Blog generation completed', {
          workflowId,
          blogId: result.blogData?.id,
          slug: result.blogData?.slug,
        });
      } else {
        console.error('❌ Blog generation failed', {
          workflowId,
          error: result.error,
        });
      }
    });

    // Return immediately with workflow ID
    return NextResponse.json(
      {
        success: true,
        message: 'Blog generation workflow started',
        workflowId,
        statusUrl: `/api/blog-generation/status/${workflowId}`,
      },
      { status: 202 } // 202 Accepted
    );
  } catch (error) {
    console.error('Error starting blog generation workflow:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to start workflow',
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Blog Generation API',
      endpoints: {
        trigger: 'POST /api/blog-generation/run',
        status: 'GET /api/blog-generation/status/:workflowId',
        cron: 'POST /api/blog-generation/cron',
      },
    },
    { status: 200 }
  );
}
