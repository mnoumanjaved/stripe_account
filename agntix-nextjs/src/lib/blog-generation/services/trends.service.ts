// ==============================================
// Blog Generation System - Trends Service
// ==============================================

import {
  SerperResponse,
  SerperResult,
  TrendingTopics,
  TrendingKeyword,
} from '../types';
import {
  APIConnectionError,
  InvalidResponseError,
  parseHTTPError,
} from '../utils/error-handler';
import { retryOperation } from '../utils/retry';
import { logger } from '../utils/logger';

class TrendsService {
  private readonly API_URL = 'https://google.serper.dev/search';
  private readonly API_KEY: string;

  constructor() {
    this.API_KEY = process.env.SERPER_API_KEY!;

    if (!this.API_KEY) {
      throw new Error(
        'SERPER_API_KEY is not set in environment variables'
      );
    }
  }

  /**
   * Fetch trending topics from Google search
   */
  async fetchTrendingTopics(
    query?: string
  ): Promise<SerperResponse> {
    const searchQuery = query || process.env.BLOG_SEARCH_QUERY || 'AI Agents';

    return retryOperation(
      async () => {
        logger.debug('Fetching trending topics from Serper API', {
          query: searchQuery,
        });

        const startTime = Date.now();

        try {
          const response = await fetch(
            `${this.API_URL}?${new URLSearchParams({
              q: searchQuery,
              apiKey: this.API_KEY,
              gl: 'us',
              hl: 'en',
              type: 'search',
            })}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const duration = Date.now() - startTime;

          if (!response.ok) {
            throw parseHTTPError({
              response: {
                status: response.status,
                data: await response.json().catch(() => ({})),
              },
            });
          }

          const data: SerperResponse = await response.json();

          if (!data.organic || !Array.isArray(data.organic)) {
            throw new InvalidResponseError('Serper API', {
              message: 'Missing or invalid organic results',
              data,
            });
          }

          logger.success('Trending topics fetched successfully', {
            resultCount: data.organic.length,
            duration: `${duration}ms`,
          });

          return data;
        } catch (error) {
          if (error instanceof Error && error.message.includes('fetch')) {
            throw new APIConnectionError('Serper API', error);
          }
          throw error;
        }
      },
      'fetchTrendingTopics'
    );
  }

  /**
   * Format top 4 trending results with scores
   */
  formatTopTrending(results: SerperResult[]): TrendingTopics {
    logger.debug('Formatting top 4 trending topics');

    if (results.length < 2) {
      throw new InvalidResponseError('Serper API', {
        message: 'Not enough results to format',
        resultCount: results.length,
      });
    }

    const trending: TrendingTopics = {
      '#1': {
        query: results[0].title,
        score: 100,
      },
      '#2': {
        query: results[1].title,
        score: 90,
      },
    };

    if (results[2]) {
      trending['#3'] = {
        query: results[2].title,
        score: 85,
      };
    }

    if (results[3]) {
      trending['#4'] = {
        query: results[3].title,
        score: 80,
      };
    }

    logger.success('Top trending topics formatted', {
      topicCount: Object.keys(trending).length,
    });

    return trending;
  }

  /**
   * Extract high volume keywords from top 5 results
   */
  extractHighVolumeKeywords(results: SerperResult[]): string {
    logger.debug('Extracting high volume keywords');

    const topResults = results.slice(0, 5);
    const keywords = topResults.map((result) => result.title).join(', ');

    logger.success('High volume keywords extracted', {
      keywordCount: topResults.length,
    });

    return keywords;
  }

  /**
   * Combined method: Fetch and process trends in one call
   */
  async getTrendingTopicsProcessed(
    query?: string
  ): Promise<{
    serperResponse: SerperResponse;
    topTrending: TrendingTopics;
    highVolumeKeywords: string;
  }> {
    const serperResponse = await this.fetchTrendingTopics(query);
    const topTrending = this.formatTopTrending(serperResponse.organic);
    const highVolumeKeywords = this.extractHighVolumeKeywords(
      serperResponse.organic
    );

    return {
      serperResponse,
      topTrending,
      highVolumeKeywords,
    };
  }

  /**
   * Get top 2 keywords for topic selection
   */
  getTopTwoKeywords(trending: TrendingTopics): {
    keyword1: TrendingKeyword;
    keyword2: TrendingKeyword;
  } {
    return {
      keyword1: trending['#1'],
      keyword2: trending['#2'],
    };
  }
}

// Export singleton instance
export const trendsService = new TrendsService();
export default trendsService;
