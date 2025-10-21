// ==============================================
// Blog Generation System - Main Workflow Orchestrator
// ==============================================

import { v4 as uuidv4 } from 'uuid';
import { trendsService } from '../services/trends.service';
import { aiService } from '../services/ai.service';
import { researchService } from '../services/research.service';
import { databaseService } from '../services/database.service';
import { imageService } from '../services/image.service';
import { createLogger } from '../utils/logger';
import { BlogGenerationError } from '../utils/error-handler';
import { CompleteBlogData, WorkflowStatus } from '../types';

export interface WorkflowResult {
  success: boolean;
  workflowId: string;
  blogData?: CompleteBlogData;
  error?: string;
  duration: number;
}

export class BlogGenerationWorkflow {
  private workflowId: string;
  private logger: ReturnType<typeof createLogger>;
  private startTime: number = 0;

  constructor(workflowId?: string) {
    this.workflowId = workflowId || uuidv4();
    this.logger = createLogger(this.workflowId);
  }

  /**
   * Execute the complete blog generation workflow
   */
  async execute(): Promise<WorkflowResult> {
    this.startTime = Date.now();
    this.logger.info('='.repeat(60));
    this.logger.info('Starting Blog Generation Workflow');
    this.logger.info('='.repeat(60));

    try {
      // Log workflow start
      await this.logStep('workflow', 'started');

      // Step 1: Fetch trending topics
      const { topTrending, highVolumeKeywords } = await this.step1_FetchTrends();

      // Step 2: Choose topic using AI
      const selectedTopic = await this.step2_ChooseTopic(topTrending);

      // Step 3: Research the topic
      const research = await this.step3_Research(selectedTopic);

      // Step 4: Generate blog post
      const blogContent = await this.step4_GenerateBlog(selectedTopic, research);

      // Step 5: Add internal links
      const blogWithLinks = await this.step5_AddInternalLinks(blogContent);

      // Step 6: Generate metadata (parallel)
      const metadata = await this.step6_GenerateMetadata(
        blogWithLinks,
        selectedTopic
      );

      // Step 7: Get/generate image
      const imageData = await this.step7_GetImage(selectedTopic, metadata.title);

      // Step 8: Save to database
      const blogId = await this.step8_SaveToDatabase(
        blogWithLinks,
        metadata,
        selectedTopic,
        imageData
      );

      // Step 9: Extract and save keywords
      await this.step9_SaveKeywords(blogId, blogContent);

      // Complete workflow
      await this.logStep('workflow', 'completed');

      const duration = Date.now() - this.startTime;
      this.logger.info('='.repeat(60));
      this.logger.success(`Workflow completed successfully in ${duration}ms`);
      this.logger.info('='.repeat(60));

      return {
        success: true,
        workflowId: this.workflowId,
        blogData: {
          id: blogId,
          title: metadata.title,
          content: blogWithLinks,
          slug: metadata.slug,
          metadescription: metadata.metaDescription,
          primaryKeyword: selectedTopic,
          imagename: imageData.name,
          webviewlink: imageData.webViewLink,
          tumbnaillink: imageData.thumbnailLink,
          status: 'draft',
        },
        duration,
      };
    } catch (error) {
      const duration = Date.now() - this.startTime;
      this.logger.error('Workflow failed', error);

      await this.logStep(
        'workflow',
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack
      );

      return {
        success: false,
        workflowId: this.workflowId,
        error: (error as Error).message,
        duration,
      };
    }
  }

  /**
   * STEP 1: Fetch trending topics
   */
  private async step1_FetchTrends() {
    const stepName = 'fetch-trends';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const result = await trendsService.getTrendingTopicsProcessed();

      await this.logStep(stepName, 'completed', {
        topicCount: Object.keys(result.topTrending).length,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return result;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 2: Choose topic using AI
   */
  private async step2_ChooseTopic(topTrending: any) {
    const stepName = 'choose-topic';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const { keyword1, keyword2 } = trendsService.getTopTwoKeywords(topTrending);
      const selectedTopic = await aiService.chooseTopic(keyword1, keyword2);

      await this.logStep(stepName, 'completed', {
        selectedTopic,
        options: [keyword1.query, keyword2.query],
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return selectedTopic;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 3: Research the topic
   */
  private async step3_Research(topic: string) {
    const stepName = 'research';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const result = await researchService.researchAndFormat(topic, 10);

      await this.logStep(stepName, 'completed', {
        resultCount: result.results.length,
        researchLength: result.research.length,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return result.research;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 4: Generate blog post
   */
  private async step4_GenerateBlog(topic: string, research: string) {
    const stepName = 'generate-blog';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const blogContent = await aiService.generateBlogPost(topic, research);

      const wordCount = blogContent.split(/\s+/).length;

      await this.logStep(stepName, 'completed', {
        wordCount,
        length: blogContent.length,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return blogContent;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 5: Add internal links
   */
  private async step5_AddInternalLinks(blogContent: string) {
    const stepName = 'add-internal-links';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const previousBlogs = await databaseService.getPreviousBlogPosts(undefined, 10);
      const blogWithLinks = await aiService.addInternalLinks(
        blogContent,
        previousBlogs
      );

      await this.logStep(stepName, 'completed', {
        previousBlogCount: previousBlogs.length,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return blogWithLinks;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 6: Generate metadata (parallel)
   */
  private async step6_GenerateMetadata(blogContent: string, primaryKeyword: string) {
    const stepName = 'generate-metadata';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const metadata = await aiService.generateMetadataParallel(
        blogContent,
        primaryKeyword
      );

      await this.logStep(stepName, 'completed', {
        slug: metadata.slug,
        title: metadata.title,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return metadata;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 7: Get/generate image
   */
  private async step7_GetImage(topic: string, title: string) {
    const stepName = 'get-image';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const imageData = await imageService.getBlogImage(topic, title);

      await this.logStep(stepName, 'completed', {
        imageName: imageData.name,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return imageData;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 8: Save to database
   */
  private async step8_SaveToDatabase(
    content: string,
    metadata: any,
    primaryKeyword: string,
    imageData: any
  ) {
    const stepName = 'save-to-database';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const blogId = await databaseService.saveBlogPost({
        title: metadata.title,
        content,
        slug: metadata.slug,
        metadescription: metadata.metaDescription,
        primaryKeyword,
        imagename: imageData.name,
        webviewlink: imageData.webViewLink,
        tumbnaillink: imageData.thumbnailLink,
        status: 'draft',
      });

      await this.logStep(stepName, 'completed', {
        blogId,
        slug: metadata.slug,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);

      return blogId;
    } catch (error) {
      await this.logStep(
        stepName,
        'failed',
        {},
        (error as Error).message,
        (error as Error).stack,
        Date.now() - startTime
      );
      this.logger.stepError(stepName, error as Error);
      throw error;
    }
  }

  /**
   * STEP 9: Extract and save keywords
   */
  private async step9_SaveKeywords(blogId: string, content: string) {
    const stepName = 'save-keywords';
    this.logger.stepStart(stepName);
    const startTime = Date.now();

    try {
      const keywords = await aiService.extractKeywords(content, 10);
      await databaseService.saveBlogKeywords(blogId, keywords);

      await this.logStep(stepName, 'completed', {
        keywordCount: keywords.length,
      }, undefined, undefined, Date.now() - startTime);

      this.logger.stepComplete(stepName, Date.now() - startTime);
    } catch (error) {
      // Don't fail workflow if keyword extraction fails
      this.logger.warn('Failed to extract/save keywords', {
        error: (error as Error).message,
      });

      await this.logStep(
        stepName,
        'completed',
        { note: 'Keywords extraction failed, continuing' },
        undefined,
        undefined,
        Date.now() - startTime
      );
    }
  }

  /**
   * Helper: Log workflow step
   */
  private async logStep(
    stepName: string,
    status: 'started' | 'in_progress' | 'completed' | 'failed',
    metadata: any = {},
    errorMessage?: string,
    errorStack?: string,
    durationMs?: number
  ): Promise<void> {
    await databaseService.logWorkflowStep(
      this.workflowId,
      stepName,
      status,
      metadata,
      errorMessage,
      errorStack,
      durationMs
    );
  }

  /**
   * Get workflow status
   */
  async getStatus(): Promise<WorkflowStatus | null> {
    return await databaseService.getWorkflowStatus(this.workflowId);
  }

  /**
   * Get workflow ID
   */
  getWorkflowId(): string {
    return this.workflowId;
  }
}

// Export convenience function
export async function runBlogGenerationWorkflow(): Promise<WorkflowResult> {
  const workflow = new BlogGenerationWorkflow();
  return await workflow.execute();
}

export default BlogGenerationWorkflow;
