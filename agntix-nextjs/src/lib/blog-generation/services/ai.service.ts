// ==============================================
// Blog Generation System - AI Service
// ==============================================

import OpenAI from 'openai';
import {
  OpenAIMessage,
  TrendingKeyword,
  PreviousBlogPost,
} from '../types';
import {
  getTopicSelectionPrompt,
  getBlogWritingPrompt,
  getInternalLinkingPrompt,
  getSlugGenerationPrompt,
  getTitleExtractionPrompt,
  getMetaDescriptionPrompt,
  formatPreviousBlogsForPrompt,
} from '../config/prompts';
import { parseOpenAIError } from '../utils/error-handler';
import { retryOperation } from '../utils/retry';
import { logger } from '../utils/logger';
import { openAIRateLimiter } from '../utils/rate-limiter';

class AIService {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    this.client = new OpenAI({ apiKey });
  }

  /**
   * Choose the best topic from trending keywords
   */
  async chooseTopic(
    keyword1: TrendingKeyword,
    keyword2: TrendingKeyword
  ): Promise<string> {
    return retryOperation(
      async () => {
        logger.debug('AI: Choosing topic from trending keywords');

        const prompt = getTopicSelectionPrompt(
          { query: keyword1.query, score: keyword1.score.toString() },
          { query: keyword2.query, score: keyword2.score.toString() }
        );

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'gpt-4o-mini',
          { temperature: 0.7, maxTokens: 100 }
        );

        let topic = response.trim();

        // Parse JSON if AI returned it (safety fallback)
        try {
          const parsed = JSON.parse(topic);
          if (parsed.query) {
            topic = parsed.query;
            logger.debug('AI: Extracted query from JSON response');
          }
        } catch (e) {
          // Not JSON, use as-is (expected behavior)
        }

        logger.success('AI: Topic selected', { topic });
        return topic;
      },
      'chooseTopic'
    );
  }

  /**
   * Generate complete blog post
   */
  async generateBlogPost(
    topic: string,
    research: string
  ): Promise<string> {
    return retryOperation(
      async () => {
        logger.debug('AI: Generating blog post', { topic });

        const prompt = getBlogWritingPrompt(topic, research);

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'gpt-4-turbo-preview', // Using GPT-4 for high-quality content
          { temperature: 0.8, maxTokens: 4000 }
        );

        const wordCount = response.split(/\s+/).length;

        logger.success('AI: Blog post generated', {
          wordCount,
          length: response.length,
        });

        return response;
      },
      'generateBlogPost'
    );
  }

  /**
   * Add internal links to blog post
   */
  async addInternalLinks(
    blogContent: string,
    previousBlogs: PreviousBlogPost[]
  ): Promise<string> {
    return retryOperation(
      async () => {
        logger.debug('AI: Adding internal links', {
          previousBlogCount: previousBlogs.length,
        });

        if (previousBlogs.length === 0) {
          logger.warn('AI: No previous blogs available for internal linking');
          return blogContent;
        }

        const formattedPreviousBlogs =
          formatPreviousBlogsForPrompt(previousBlogs);
        const prompt = getInternalLinkingPrompt(
          blogContent,
          formattedPreviousBlogs
        );

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'o1-mini-2024-09-12', // Using O1-mini for complex reasoning
          { temperature: 0.5, maxTokens: 4500 }
        );

        // Count added links
        const originalLinkCount = (blogContent.match(/https?:\/\//g) || [])
          .length;
        const newLinkCount = (response.match(/https?:\/\//g) || []).length;
        const linksAdded = newLinkCount - originalLinkCount;

        logger.success('AI: Internal links added', {
          linksAdded,
          totalLinks: newLinkCount,
        });

        return response;
      },
      'addInternalLinks'
    );
  }

  /**
   * Generate SEO-friendly slug
   */
  async generateSlug(
    blogContent: string,
    primaryKeyword: string
  ): Promise<string> {
    return retryOperation(
      async () => {
        logger.debug('AI: Generating slug', { primaryKeyword });

        const prompt = getSlugGenerationPrompt(blogContent, primaryKeyword);

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'gpt-4o-mini',
          { temperature: 0.5, maxTokens: 50 }
        );

        // Clean and format slug
        const slug = response
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9-\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        logger.success('AI: Slug generated', { slug });
        return slug;
      },
      'generateSlug'
    );
  }

  /**
   * Extract blog title
   */
  async extractTitle(
    blogContent: string,
    primaryKeyword: string
  ): Promise<string> {
    return retryOperation(
      async () => {
        logger.debug('AI: Extracting title', { primaryKeyword });

        const prompt = getTitleExtractionPrompt(blogContent, primaryKeyword);

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'gpt-4o-mini',
          { temperature: 0.7, maxTokens: 100 }
        );

        const title = response.trim().replace(/^["']|["']$/g, '');

        logger.success('AI: Title extracted', { title });
        return title;
      },
      'extractTitle'
    );
  }

  /**
   * Generate meta description
   */
  async generateMetaDescription(
    blogContent: string,
    primaryKeyword: string
  ): Promise<string> {
    return retryOperation(
      async () => {
        logger.debug('AI: Generating meta description', { primaryKeyword });

        const prompt = getMetaDescriptionPrompt(blogContent, primaryKeyword);

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'gpt-4o-mini',
          { temperature: 0.7, maxTokens: 100 }
        );

        const metaDescription = response.trim().substring(0, 160);

        logger.success('AI: Meta description generated', {
          length: metaDescription.length,
        });

        return metaDescription;
      },
      'generateMetaDescription'
    );
  }

  /**
   * Generate all metadata in parallel
   */
  async generateMetadataParallel(
    blogContent: string,
    primaryKeyword: string
  ): Promise<{
    slug: string;
    title: string;
    metaDescription: string;
  }> {
    logger.debug('AI: Generating metadata in parallel');

    const [slug, title, metaDescription] = await Promise.all([
      this.generateSlug(blogContent, primaryKeyword),
      this.extractTitle(blogContent, primaryKeyword),
      this.generateMetaDescription(blogContent, primaryKeyword),
    ]);

    logger.success('AI: Metadata generation complete');

    return { slug, title, metaDescription };
  }

  /**
   * Core OpenAI API call with error handling and rate limiting
   */
  private async callOpenAI(
    messages: OpenAIMessage[],
    model: string = 'gpt-4o-mini',
    options: {
      temperature?: number;
      maxTokens?: number;
      topP?: number;
    } = {}
  ): Promise<string> {
    // Wrap the API call with rate limiter to prevent overwhelming the API
    return openAIRateLimiter.throttle(async () => {
      try {
        const startTime = Date.now();

        // o1 models use max_completion_tokens instead of max_tokens
        const isO1Model = model.startsWith('o1');
        const maxTokensParam = options.maxTokens ?? 1000;

        // Build completion parameters based on model type
        const completionParams: any = {
          model,
          messages,
        };

        // o1 models don't support temperature and top_p
        if (!isO1Model) {
          completionParams.temperature = options.temperature ?? 0.7;
          completionParams.top_p = options.topP ?? 1;
        }

        // Use correct token limit parameter based on model
        if (isO1Model) {
          completionParams.max_completion_tokens = maxTokensParam;
        } else {
          completionParams.max_tokens = maxTokensParam;
        }

        const completion = await this.client.chat.completions.create(completionParams);

        const duration = Date.now() - startTime;

        if (!completion.choices || completion.choices.length === 0) {
          throw new Error('OpenAI returned no choices');
        }

        const content = completion.choices[0].message.content;

        if (!content) {
          throw new Error('OpenAI returned empty content');
        }

        // Log token usage
        if (completion.usage) {
          logger.debug('OpenAI API call completed', {
            model,
            duration: `${duration}ms`,
            promptTokens: completion.usage.prompt_tokens,
            completionTokens: completion.usage.completion_tokens,
            totalTokens: completion.usage.total_tokens,
          });
        }

        return content;
      } catch (error: any) {
        throw parseOpenAIError(error);
      }
    });
  }

  /**
   * Extract keywords from text using AI
   */
  async extractKeywords(text: string, count: number = 10): Promise<string[]> {
    return retryOperation(
      async () => {
        logger.debug('AI: Extracting keywords', { count });

        const prompt = `Extract the ${count} most important keywords from the following text. Return only the keywords as a comma-separated list, nothing else.\n\n${text.substring(0, 2000)}`;

        const response = await this.callOpenAI(
          [{ role: 'user', content: prompt }],
          'gpt-4o-mini',
          { temperature: 0.3, maxTokens: 200 }
        );

        const keywords = response
          .split(',')
          .map((k) => k.trim())
          .filter((k) => k.length > 0);

        logger.success('AI: Keywords extracted', { count: keywords.length });
        return keywords;
      },
      'extractKeywords'
    );
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;
