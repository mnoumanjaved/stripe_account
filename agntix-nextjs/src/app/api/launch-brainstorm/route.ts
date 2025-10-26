import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// Store the process reference globally
let brainstormProcess: any = null;

export async function POST(request: NextRequest) {
  try {
    // Check if the app is already running by trying to fetch from port 3003
    try {
      const response = await fetch('http://localhost:3003', {
        method: 'HEAD',
      });

      if (response.ok) {
        // App is already running
        return NextResponse.json({
          success: true,
          message: 'Brainstorming app is already running',
          url: 'http://localhost:3003'
        });
      }
    } catch (error) {
      // App is not running, we need to start it
    }

    // If not running, start the Brainstorming app
    if (!brainstormProcess) {
      const appPath = path.join(process.cwd(), '..', 'Brainstorming-App-main');

      console.log('[Brainstorm] Starting app at:', appPath);

      // Start the app using npm run dev
      brainstormProcess = spawn('npm', ['run', 'dev'], {
        cwd: appPath,
        shell: true,
        detached: false,
      });

      // Log output for debugging
      brainstormProcess.stdout?.on('data', (data: Buffer) => {
        console.log(`[Brainstorm App]: ${data.toString()}`);
      });

      brainstormProcess.stderr?.on('data', (data: Buffer) => {
        console.error(`[Brainstorm App Error]: ${data.toString()}`);
      });

      brainstormProcess.on('close', (code: number) => {
        console.log(`[Brainstorm App] Process exited with code ${code}`);
        brainstormProcess = null;
      });

      brainstormProcess.on('error', (error: Error) => {
        console.error(`[Brainstorm App] Failed to start:`, error);
        brainstormProcess = null;
      });

      // Wait for the app to start (check every second for 15 seconds)
      let attempts = 0;
      const maxAttempts = 15;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;

        try {
          const response = await fetch('http://localhost:3003', {
            method: 'HEAD',
          });

          if (response.ok) {
            console.log('[Brainstorm] App started successfully!');
            return NextResponse.json({
              success: true,
              message: 'Brainstorming app started successfully',
              url: 'http://localhost:3003'
            });
          }
        } catch (error) {
          // Still starting, continue waiting
          console.log(`[Brainstorm] Waiting for app to start... (${attempts}/${maxAttempts})`);
        }
      }

      // If we get here, app didn't start in time
      return NextResponse.json({
        success: false,
        message: 'Brainstorming app is starting, but taking longer than expected. Please wait and try refreshing.',
        url: 'http://localhost:3003'
      }, { status: 202 });
    }

    return NextResponse.json({
      success: true,
      message: 'Brainstorming app is starting',
      url: 'http://localhost:3003'
    });

  } catch (error) {
    console.error('[Brainstorm] Error launching app:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to launch Brainstorming app',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
