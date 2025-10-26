// ==============================================
// Blog Generation System - Research Service
// ==============================================

import {
  TavilyResponse,
  ResearchResult,
  FormattedResearch,
} from '../types';
import {
  APIConnectionError,
  InvalidResponseError,
  parseHTTPError,
} from '../utils/error-handler';
import { retryOperation } from '../utils/retry';
import { logger } from '../utils/logger';

class ResearchService {
  private readonly API_URL = 'https://api.tavily.com/search';
  private readonly API_KEY: string;

  constructor() {
    this.API_KEY = process.env.TAVILY_API_KEY!;

    if (!this.API_KEY) {
      throw new Error(
        'TAVILY_API_KEY is not set in environment variables'
      );
    }
  }

  /**
   * Perform advanced research on a topic
   */
  async performResearch(
    topic: string,
    maxResults: number = 10
  ): Promise<TavilyResponse> {
    return retryOperation(
      async () => {
        logger.debug('Performing research via Tavily API', {
          topic,
          maxResults,
        });

        const startTime = Date.now();

        // Remove quotes from topic if present
        const cleanTopic = topic.replace(/^"|"$/g, '');

        try {
          const response = await fetch(this.API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.API_KEY}`,
            },
            body: JSON.stringify({
              query: cleanTopic,
              search_depth: 'advanced',
              include_domains: [],
              exclude_domains: [],
              max_results: maxResults,
            }),
          });

          const duration = Date.now() - startTime;

          if (!response.ok) {
            throw parseHTTPError({
              response: {
                status: response.status,
                data: await response.json().catch(() => ({})),
              },
            });
          }

          const data: TavilyResponse = await response.json();

          if (!data.results || !Array.isArray(data.results)) {
            throw new InvalidResponseError('Tavily API', {
              message: 'Missing or invalid results',
              data,
            });
          }

          logger.success('Research completed successfully', {
            resultCount: data.results.length,
            duration: `${duration}ms`,
          });

          return data;
        } catch (error) {
          if (error instanceof Error && error.message.includes('fetch')) {
            throw new APIConnectionError('Tavily API', error);
          }
          throw error;
        }
      },
      'performResearch'
    );
  }

  /**
   * Format research results for blog writing prompt
   */
  formatResearchResults(results: ResearchResult[]): FormattedResearch {
    logger.debug('Formatting research results');

    const formattedString = results
      .map((result) => {
        return `${result.content} - source: ${result.url}`;
      })
      .join('\n\n');

    logger.success('Research results formatted', {
      resultCount: results.length,
      totalLength: formattedString.length,
    });

    return {
      research: formattedString,
      results,
    };
  }

  /**
   * Combined method: Research and format in one call
   */
  async researchAndFormat(
    topic: string,
    maxResults: number = 10
  ): Promise<FormattedResearch> {
    const tavilyResponse = await this.performResearch(topic, maxResults);
    return this.formatResearchResults(tavilyResponse.results);
  }

  /**
   * Get research summary (first 500 words)
   */
  getResearchSummary(research: FormattedResearch): string {
    const words = research.research.split(' ');
    if (words.length <= 500) {
      return research.research;
    }

    const summary = words.slice(0, 500).join(' ');
    logger.debug('Research summary created', {
      originalWords: words.length,
      summaryWords: 500,
    });

    return summary + '...';
  }

  /**
   * Filter research by minimum score
   */
  filterByScore(
    results: ResearchResult[],
    minScore: number = 0.5
  ): ResearchResult[] {
    const filtered = results.filter(
      (result) => result.score >= minScore
    );

    logger.debug('Research results filtered by score', {
      original: results.length,
      filtered: filtered.length,
      minScore,
    });

    return filtered;
  }

  /**
   * Get unique domains from research results
   */
  getUniqueDomains(results: ResearchResult[]): string[] {
    const domains = results.map((result) => {
      try {
        const url = new URL(result.url);
        return url.hostname;
      } catch {
        return 'unknown';
      }
    });

    const uniqueDomains = [...new Set(domains)];

    logger.debug('Unique domains extracted', {
      total: results.length,
      unique: uniqueDomains.length,
    });

    return uniqueDomains;
  }
}

// Export singleton instance
export const researchService = new ResearchService();
export default researchService;
