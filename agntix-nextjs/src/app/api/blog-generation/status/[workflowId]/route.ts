// ==============================================
// API Route: GET /api/blog-generation/status/[workflowId]
// Purpose: Check workflow execution status
// ==============================================

import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/blog-generation/services/database.service';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  try {
    const { workflowId } = await params;

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow ID is required',
        },
        { status: 400 }
      );
    }

    console.log('📊 Checking workflow status:', workflowId);

    // Get workflow status from database
    const status = await databaseService.getWorkflowStatus(workflowId);

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow not found',
          workflowId,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        workflow: {
          id: status.workflowId,
          status: status.status,
          currentStep: status.currentStep,
          stepNumber: status.stepNumber,
          error: status.error,
          startedAt: status.startedAt,
          lastUpdated: status.lastUpdated,
          steps: status.steps.map((step: any) => ({
            name: step.step_name,
            status: step.status,
            duration: step.duration_ms,
            timestamp: step.created_at,
          })),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching workflow status:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch workflow status',
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
