// ==============================================
// Blog Generation System - Database Service
// ==============================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  CompleteBlogData,
  PreviousBlogPost,
  WorkflowLogMetadata,
} from '../types';
import { DatabaseError } from '../utils/error-handler';
import { retryOperation } from '../utils/retry';
import { logger } from '../utils/logger';

class DatabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing Supabase credentials. Please check your environment variables.'
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Save a complete blog post to database
   */
  async saveBlogPost(blogData: CompleteBlogData): Promise<string> {
    // Handle duplicate slugs by finding a unique one
    let slug = blogData.slug;
    let attemptNumber = 1;
    const maxAttempts = 10;

    while (attemptNumber <= maxAttempts) {
      try {
        logger.debug('Saving blog post to database', {
          title: blogData.title,
          slug: slug,
          attempt: attemptNumber,
        });

        const { data, error } = await this.supabase
          .from('blog_post')
          .insert({
            title: blogData.title,
            content: blogData.content,
            slug: slug,
            metadescription: blogData.metadescription,
            primary_keyword: blogData.primaryKeyword,
            imagename: blogData.imagename,
            webviewlink: blogData.webviewlink,
            tumbnaillink: blogData.tumbnaillink,
            status: blogData.status || 'draft',
          })
          .select('id')
          .single();

        if (error) {
          // Check if it's a duplicate slug error
          if (error.code === '23505' && error.message.includes('blog_post_slug_key')) {
            logger.warn('Slug already exists, trying with modified slug', {
              originalSlug: slug,
              attemptNumber,
            });

            // Append a number to make the slug unique
            attemptNumber++;
            slug = `${blogData.slug}-${attemptNumber}`;

            if (attemptNumber > maxAttempts) {
              throw new DatabaseError('saveBlogPost', new Error(`Unable to find unique slug after ${maxAttempts} attempts`));
            }

            // Try again with the new slug
            continue;
          }

          // If it's a different error, throw it
          throw new DatabaseError('saveBlogPost', error);
        }

        logger.success('Blog post saved successfully', {
          id: data.id,
          slug: slug,
          attemptNumber: attemptNumber
        });
        return data.id;
      } catch (error) {
        // If it's not a duplicate slug error, re-throw
        if (!(error instanceof DatabaseError)) {
          throw error;
        }

        // Check if the error is about duplicate slugs
        const errorMessage = (error as any).details?.originalError || '';
        if (!errorMessage.includes('blog_post_slug_key')) {
          throw error;
        }

        // Try with modified slug
        logger.warn('Slug already exists, trying with modified slug', {
          originalSlug: slug,
          attemptNumber,
        });

        attemptNumber++;
        slug = `${blogData.slug}-${attemptNumber}`;

        if (attemptNumber > maxAttempts) {
          throw new DatabaseError('saveBlogPost', new Error(`Unable to find unique slug after ${maxAttempts} attempts`));
        }
      }
    }

    throw new DatabaseError('saveBlogPost', new Error('Unexpected error in slug generation loop'));
  }

  /**
   * Get previous blog posts for internal linking
   */
  async getPreviousBlogPosts(
    currentBlogId?: string,
    limit: number = 10
  ): Promise<PreviousBlogPost[]> {
    return retryOperation(
      async () => {
        logger.debug('Fetching previous blog posts for internal linking', {
          limit,
        });

        // Use the custom function we created in the schema
        const { data, error } = await this.supabase.rpc(
          'get_blogs_for_internal_linking',
          {
            current_blog_id: currentBlogId || '00000000-0000-0000-0000-000000000000',
            limit_count: limit,
          }
        );

        if (error) {
          throw new DatabaseError('getPreviousBlogPosts', error);
        }

        logger.debug(`Found ${data?.length || 0} previous blog posts`);

        return (
          data?.map((blog: any) => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            primaryKeyword: blog.primary_keyword,
            keywords: blog.keywords || [],
          })) || []
        );
      },
      'getPreviousBlogPosts'
    );
  }

  /**
   * Update blog post status
   */
  async updateBlogStatus(
    id: string,
    status: 'draft' | 'published' | 'archived'
  ): Promise<void> {
    return retryOperation(
      async () => {
        logger.debug('Updating blog status', { id, status });

        const { error } = await this.supabase
          .from('blog_post')
          .update({ status })
          .eq('id', id);

        if (error) {
          throw new DatabaseError('updateBlogStatus', error);
        }

        logger.success('Blog status updated', { id, status });
      },
      'updateBlogStatus'
    );
  }

  /**
   * Get blog post by slug
   */
  async getBlogBySlug(slug: string): Promise<CompleteBlogData | null> {
    return retryOperation(
      async () => {
        const { data, error } = await this.supabase
          .from('blog_post')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // Not found
            return null;
          }
          throw new DatabaseError('getBlogBySlug', error);
        }

        return this.mapDatabaseRowToBlogData(data);
      },
      'getBlogBySlug'
    );
  }

  /**
   * Save blog keywords for internal linking
   */
  async saveBlogKeywords(
    blogPostId: string,
    keywords: string[]
  ): Promise<void> {
    return retryOperation(
      async () => {
        logger.debug('Saving blog keywords', {
          blogPostId,
          keywordCount: keywords.length,
        });

        const keywordRecords = keywords.map((keyword) => ({
          blog_post_id: blogPostId,
          keyword: keyword.trim().toLowerCase(),
        }));

        const { error } = await this.supabase
          .from('blog_keywords')
          .insert(keywordRecords);

        if (error) {
          throw new DatabaseError('saveBlogKeywords', error);
        }

        logger.success('Blog keywords saved', { count: keywords.length });
      },
      'saveBlogKeywords'
    );
  }

  /**
   * Log workflow step execution
   */
  async logWorkflowStep(
    workflowId: string,
    stepName: string,
    status: 'started' | 'in_progress' | 'completed' | 'failed',
    metadata: WorkflowLogMetadata = {},
    errorMessage?: string,
    errorStack?: string,
    durationMs?: number
  ): Promise<string> {
    try {
      const { data, error } = await this.supabase.rpc('log_workflow_step', {
        p_workflow_id: workflowId,
        p_step_name: stepName,
        p_status: status,
        p_metadata: metadata,
        p_error_message: errorMessage || null,
        p_error_stack: errorStack || null,
        p_duration_ms: durationMs || null,
      });

      if (error) {
        logger.error('Failed to log workflow step', error);
        // Don't throw - logging failures shouldn't break the workflow
        return '';
      }

      return data;
    } catch (error) {
      logger.error('Failed to log workflow step', error);
      return '';
    }
  }

  /**
   * Get workflow execution status
   */
  async getWorkflowStatus(workflowId: string): Promise<any> {
    return retryOperation(
      async () => {
        const { data, error } = await this.supabase
          .from('workflow_logs')
          .select('*')
          .eq('workflow_id', workflowId)
          .order('created_at', { ascending: true });

        if (error) {
          throw new DatabaseError('getWorkflowStatus', error);
        }

        if (!data || data.length === 0) {
          return null;
        }

        const latest = data[data.length - 1];
        const started = data[0];

        return {
          workflowId,
          status: latest.status,
          currentStep: latest.step_name,
          stepNumber: latest.step_number,
          error: latest.error_message,
          startedAt: started.created_at,
          lastUpdated: latest.created_at,
          steps: data,
        };
      },
      'getWorkflowStatus'
    );
  }

  /**
   * Record internal link between blog posts
   */
  async recordInternalLink(
    sourceBlogId: string,
    targetBlogId: string,
    anchorText?: string,
    linkPosition?: number
  ): Promise<void> {
    return retryOperation(
      async () => {
        const { error } = await this.supabase.from('internal_links').insert({
          source_blog_id: sourceBlogId,
          target_blog_id: targetBlogId,
          anchor_text: anchorText,
          link_position: linkPosition,
        });

        if (error) {
          // Ignore duplicate link errors
          if (error.code === '23505') {
            logger.debug('Internal link already exists, skipping');
            return;
          }
          throw new DatabaseError('recordInternalLink', error);
        }
      },
      'recordInternalLink'
    );
  }

  /**
   * Helper: Map database row to blog data
   */
  private mapDatabaseRowToBlogData(row: any): CompleteBlogData {
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      slug: row.slug,
      metadescription: row.metadescription,
      primaryKeyword: row.primary_keyword,
      imagename: row.imagename,
      webviewlink: row.webviewlink,
      tumbnaillink: row.tumbnaillink,
      status: row.status,
      createdAt: new Date(row.created_at),
      publishedAt: row.published_at ? new Date(row.published_at) : undefined,
    };
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
