// ==============================================
// Blog Generation System - TypeScript Types
// ==============================================

export interface TrendingKeyword {
  query: string;
  score: number;
}

export interface TrendingTopics {
  '#1': TrendingKeyword;
  '#2': TrendingKeyword;
  '#3'?: TrendingKeyword;
  '#4'?: TrendingKeyword;
}

export interface SerperResult {
  position: number;
  title: string;
  link: string;
  snippet?: string;
  date?: string;
}

export interface SerperResponse {
  searchParameters: {
    q: string;
    gl: string;
    hl: string;
    type: string;
  };
  organic: SerperResult[];
}

export interface ResearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
  raw_content?: string;
}

export interface TavilyResponse {
  query: string;
  results: ResearchResult[];
  answer?: string;
  response_time: number;
}

export interface FormattedResearch {
  research: string; // Formatted as "content - source: URL\n\n..."
  results: ResearchResult[];
}

export interface BlogPost {
  content: string;
  primaryKeyword: string;
}

export interface BlogMetadata {
  title: string;
  slug: string;
  metaDescription: string;
}

export interface BlogImage {
  name: string;
  webViewLink: string;
  thumbnailLink: string;
}

export interface CompleteBlogData {
  id?: string;
  title: string;
  content: string;
  slug: string;
  metadescription: string;
  primaryKeyword: string;
  imagename?: string;
  webviewlink?: string;
  tumbnaillink?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt?: Date;
  publishedAt?: Date;
}

export interface WorkflowStatus {
  workflowId: string;
  status: 'started' | 'in_progress' | 'completed' | 'failed';
  currentStep?: string;
  stepNumber?: number;
  error?: string;
  result?: any;
  startedAt?: Date;
  completedAt?: Date;
  duration?: number;
}

export interface WorkflowLogMetadata {
  apiCallDuration?: number;
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost?: number;
  retryAttempt?: number;
  [key: string]: any;
}

export interface PreviousBlogPost {
  id: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  keywords: string[];
  summary?: string;
}

export interface AIModelConfig {
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface BlogGenerationConfig {
  searchQuery: string;
  scheduleInterval: string;
  companyName: string;
  companyDescription: string;
  companyProducts: string;
  targetMarket: string;
  minWordCount: number;
  maxWordCount: number;
  minInternalLinks: number;
  readingLevel: string;
}

export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoff: 'exponential' | 'linear';
  onRetry?: (attempt: number, error: Error) => void;
}

export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}
