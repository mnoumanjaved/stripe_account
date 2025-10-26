import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  try {
    const { blogId, status } = await request.json();

    if (!blogId || !status) {
      return NextResponse.json(
        { error: 'Missing blogId or status' },
        { status: 400 }
      );
    }

    if (!['draft', 'published'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "draft" or "published"' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update blog status
    const { data, error } = await supabase
      .from('blog_post')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', blogId)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog status:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      blog: data,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog status' },
      { status: 500 }
    );
  }
}
