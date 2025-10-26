// ==============================================
// Blog Generation System - Image Service
// ==============================================

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { BlogImage } from '../types';
import {
  APIConnectionError,
  InvalidResponseError,
  parseHTTPError,
} from '../utils/error-handler';
import { retryOperation } from '../utils/retry';
import { logger } from '../utils/logger';

class ImageService {
  private openai: OpenAI;
  private method: string;
  private supabase: any;
  private storageBucket: string;

  constructor() {
    this.method =
      process.env.IMAGE_GENERATION_METHOD || 'dalle';

    // Initialize Supabase client for storage
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are required for image storage');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.storageBucket = 'blog-images';

    if (this.method === 'dalle') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY is required for DALL-E');
      }
      this.openai = new OpenAI({ apiKey });
    }

    logger.debug('Image service initialized with Supabase Storage', {
      bucket: this.storageBucket,
    });
  }

  /**
   * Download image from URL and upload to Supabase Storage
   */
  private async downloadAndUploadImage(
    imageUrl: string,
    fileName: string
  ): Promise<string> {
    try {
      logger.debug('Downloading image from URL', { url: imageUrl, fileName });

      // Fetch the image
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Failed to download image: HTTP ${response.status}`);
      }

      // Get the image as array buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      logger.debug('Image downloaded, uploading to Supabase Storage', {
        size: buffer.length,
        fileName,
      });

      // Upload to Supabase Storage
      const { data, error } = await this.supabase.storage
        .from(this.storageBucket)
        .upload(fileName, buffer, {
          contentType: 'image/png',
          cacheControl: '31536000', // Cache for 1 year
          upsert: true, // Overwrite if exists
        });

      if (error) {
        logger.error('Failed to upload image to Supabase', error);
        throw new Error(`Supabase upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: publicUrlData } = this.supabase.storage
        .from(this.storageBucket)
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      logger.success('Image uploaded to Supabase Storage', {
        fileName,
        publicUrl,
      });

      return publicUrl;
    } catch (error) {
      logger.error('Error in downloadAndUploadImage', error);
      throw error;
    }
  }

  /**
   * Generate or fetch blog image based on configuration
   */
  async getBlogImage(
    topic: string,
    blogTitle?: string
  ): Promise<BlogImage> {
    logger.debug('Getting blog image', { method: this.method, topic });

    switch (this.method) {
      case 'dalle':
        return this.generateWithDALLE(topic, blogTitle);

      case 'unsplash':
        return this.fetchFromUnsplash(topic);

      case 'pexels':
        return this.fetchFromPexels(topic);

      case 'n8n-workflow':
        return this.callN8NWorkflow();

      default:
        logger.warn(
          `Unknown image generation method: ${this.method}, using placeholder`
        );
        return this.getPlaceholderImage(topic);
    }
  }

  /**
   * Generate image using DALL-E
   */
  private async generateWithDALLE(
    topic: string,
    blogTitle?: string
  ): Promise<BlogImage> {
    return retryOperation(
      async () => {
        logger.debug('Generating image with DALL-E', { topic });

        const prompt = `Create a professional, modern blog header image for an article about "${blogTitle || topic}". The image should be clean, engaging, and suitable for a business blog. No text in the image.`;

        try {
          const response = await this.openai.images.generate({
            model: 'dall-e-3',
            prompt: prompt.substring(0, 1000),
            n: 1,
            size: '1792x1024',
            quality: 'standard',
            response_format: 'url',
          });

          if (!response.data || response.data.length === 0) {
            throw new InvalidResponseError('DALL-E', {
              message: 'No image generated',
            });
          }

          const temporaryUrl = response.data[0].url!;
          const imageName = `blog-${Date.now()}.png`;

          logger.success('Image generated with DALL-E', { imageName, temporaryUrl });

          // Download and upload the image to Supabase Storage
          logger.debug('Uploading image to Supabase Storage');
          const permanentUrl = await this.downloadAndUploadImage(temporaryUrl, imageName);

          return {
            name: imageName,
            webViewLink: permanentUrl,
            thumbnailLink: permanentUrl,
          };
        } catch (error: any) {
          if (error.status === 429) {
            throw new Error('DALL-E rate limit exceeded');
          }
          throw error;
        }
      },
      'generateWithDALLE'
    );
  }

  /**
   * Fetch image from Unsplash
   */
  private async fetchFromUnsplash(topic: string): Promise<BlogImage> {
    return retryOperation(
      async () => {
        logger.debug('Fetching image from Unsplash', { topic });

        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!accessKey) {
          throw new Error('UNSPLASH_ACCESS_KEY not configured');
        }

        const query = encodeURIComponent(topic);
        const url = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape`;

        try {
          const response = await fetch(url, {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          });

          if (!response.ok) {
            throw parseHTTPError({
              response: {
                status: response.status,
                data: await response.json().catch(() => ({})),
              },
            });
          }

          const data = await response.json();

          logger.success('Image fetched from Unsplash', {
            id: data.id,
          });

          const imageName = `unsplash-${data.id}.jpg`;

          // Download and upload the image to Supabase Storage
          const permanentUrl = await this.downloadAndUploadImage(data.urls.regular, imageName);

          return {
            name: imageName,
            webViewLink: permanentUrl,
            thumbnailLink: permanentUrl,
          };
        } catch (error) {
          if (error instanceof Error && error.message.includes('fetch')) {
            throw new APIConnectionError('Unsplash API', error);
          }
          throw error;
        }
      },
      'fetchFromUnsplash'
    );
  }

  /**
   * Fetch image from Pexels
   */
  private async fetchFromPexels(topic: string): Promise<BlogImage> {
    return retryOperation(
      async () => {
        logger.debug('Fetching image from Pexels', { topic });

        const apiKey = process.env.PEXELS_API_KEY;
        if (!apiKey) {
          throw new Error('PEXELS_API_KEY not configured');
        }

        const query = encodeURIComponent(topic);
        const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`;

        try {
          const response = await fetch(url, {
            headers: {
              Authorization: apiKey,
            },
          });

          if (!response.ok) {
            throw parseHTTPError({
              response: {
                status: response.status,
                data: await response.json().catch(() => ({})),
              },
            });
          }

          const data = await response.json();

          if (!data.photos || data.photos.length === 0) {
            throw new InvalidResponseError('Pexels API', {
              message: 'No images found',
            });
          }

          const photo = data.photos[0];

          logger.success('Image fetched from Pexels', {
            id: photo.id,
          });

          const imageName = `pexels-${photo.id}.jpg`;

          // Download and upload the image to Supabase Storage
          const permanentUrl = await this.downloadAndUploadImage(photo.src.large, imageName);

          return {
            name: imageName,
            webViewLink: permanentUrl,
            thumbnailLink: permanentUrl,
          };
        } catch (error) {
          if (error instanceof Error && error.message.includes('fetch')) {
            throw new APIConnectionError('Pexels API', error);
          }
          throw error;
        }
      },
      'fetchFromPexels'
    );
  }

  /**
   * Call N8N image generation workflow
   */
  private async callN8NWorkflow(): Promise<BlogImage> {
    return retryOperation(
      async () => {
        logger.debug('Calling N8N image generation workflow');

        const workflowUrl = process.env.N8N_WORKFLOW_URL;
        const apiKey = process.env.N8N_API_KEY;

        if (!workflowUrl) {
          throw new Error('N8N_WORKFLOW_URL not configured');
        }

        try {
          const response = await fetch(workflowUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
            },
            body: JSON.stringify({}),
          });

          if (!response.ok) {
            throw parseHTTPError({
              response: {
                status: response.status,
                data: await response.json().catch(() => ({})),
              },
            });
          }

          const data = await response.json();

          logger.success('Image fetched from N8N workflow');

          return {
            name: data.name || `n8n-${Date.now()}.jpg`,
            webViewLink: data.webViewLink,
            thumbnailLink: data.thumbnailLink,
          };
        } catch (error) {
          if (error instanceof Error && error.message.includes('fetch')) {
            throw new APIConnectionError('N8N Workflow', error);
          }
          throw error;
        }
      },
      'callN8NWorkflow'
    );
  }

  /**
   * Get placeholder image
   */
  private getPlaceholderImage(topic: string): BlogImage {
    logger.debug('Using placeholder image');

    const encodedTopic = encodeURIComponent(topic);
    const placeholderUrl = `https://via.placeholder.com/1200x630/0066CC/FFFFFF?text=${encodedTopic}`;

    return {
      name: `placeholder-${Date.now()}.png`,
      webViewLink: placeholderUrl,
      thumbnailLink: placeholderUrl,
    };
  }

  /**
   * Validate image URL is accessible
   */
  async validateImageUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const imageService = new ImageService();
export default imageService;
