// ==============================================
// Blog Generation System - AI Prompts Configuration
// ==============================================

export const COMPANY_INFO = {
  name: process.env.COMPANY_NAME || 'Hotel Selection',
  description:
    process.env.COMPANY_DESCRIPTION ||
    'Premium hotel booking and selection service',
  products:
    process.env.COMPANY_PRODUCTS ||
    'Hotel comparison, booking assistance, travel planning',
  targetMarket:
    process.env.TARGET_MARKET || 'Business travelers and vacation planners',
};

export const BLOG_REQUIREMENTS = {
  minWordCount: parseInt(process.env.MIN_WORD_COUNT || '1500'),
  maxWordCount: parseInt(process.env.MAX_WORD_COUNT || '2000'),
  minInternalLinks: parseInt(process.env.MIN_INTERNAL_LINKS || '5'),
  readingLevel: process.env.READING_LEVEL || 'Year 5',
};

// ==============================================
// PROMPT 1: Topic Selection
// ==============================================
export const getTopicSelectionPrompt = (
  keyword1: { query: string; score: string },
  keyword2: { query: string; score: string }
): string => {
  return `You are part of a team that creates world class blog posts. Your job is to choose the topic for each blog post.

The blog posts are posted on the website of ${COMPANY_INFO.name} (${COMPANY_INFO.description}).
Products/Services: ${COMPANY_INFO.products}
Target Market: ${COMPANY_INFO.targetMarket}

The blog posts are mainly posted as part of an SEO campaign to get ${COMPANY_INFO.name} to rank high for its products and services.

In this instance, you are given a list of 2 keywords which have been trending the most on Google news search over the past few days.

Your job is to pick one which you think would make for the most relevant blog post with the best SEO outcomes for the client.

The keywords have two attributes:
1. query: This attribute determines the search query that users have been searching for which is trending.
2. value: This attribute determines what percentage increase the keyword has seen compared to previous periods (i.e. the increase in search volume).

You must choose one out of the taking into consideration both the relevance of the keyword for ${COMPANY_INFO.name}'s SEO efforts and the comparative trendiness determined by the value attribute.

Output ONLY the search query text (from the "query" field) and nothing else. Don't output the JSON. Don't explain your reasoning. Just output the plain text query.

For example, if the keyword is {"query":"AI Agents in Healthcare","score":"100"}, you should output only: AI Agents in Healthcare

This instance:

Keyword 1: ${keyword1.query} (trend score: ${keyword1.score})

Keyword 2: ${keyword2.query} (trend score: ${keyword2.score})`;
};

// ==============================================
// PROMPT 2: Blog Post Writing
// ==============================================
export const getBlogWritingPrompt = (
  topic: string,
  research: string
): string => {
  return `You are a professional blog writer creating high-quality, informative content about trending topics.

Your task is to write an engaging, well-researched blog post on the following topic for ${COMPANY_INFO.name}, a company in the ${COMPANY_INFO.description} industry.

Topic: ${topic}

Research Information:
${research}

Blog Post Requirements:

STRUCTURE:
- Start with an engaging title (H1) that includes the main topic/keyword
- Include a compelling introduction that hooks the reader and mentions the topic early
- Use clear H2 and H3 subheadings to organize the content
- Conclude with a helpful summary or key takeaways

CONTENT QUALITY:
- Write informative, educational content that provides real value to readers
- Use the research findings provided to create accurate, well-sourced content
- Include source URLs as inline citations where research points are mentioned
- Explain concepts clearly and thoroughly
- Use examples and practical insights where relevant
- Write in an engaging, professional tone that sparks curiosity

TECHNICAL REQUIREMENTS:
- Length: ${BLOG_REQUIREMENTS.minWordCount} to ${BLOG_REQUIREMENTS.maxWordCount} words
- Reading level: Suitable for ${BLOG_REQUIREMENTS.readingLevel}
- Use proper HTML formatting (H1, H2, H3, p, ul, ol tags)
- Flow naturally and maintain reader engagement throughout

CONTEXT:
- This blog is published by ${COMPANY_INFO.name}
- When relevant, you may naturally mention how this topic relates to ${COMPANY_INFO.products}
- Focus on educating readers, not selling products
- Be helpful, authoritative, and trustworthy

Output the complete blog post in HTML format. Include the full article from title to conclusion. Do not cut it short or stop mid-article.

Write the blog post now:`;
};

// ==============================================
// PROMPT 3: Internal Linking
// ==============================================
export const getInternalLinkingPrompt = (
  blogContent: string,
  previousBlogs: string
): string => {
  return `You are part of a team that creates world class blog posts.

You are in charge of internal linking between blog posts.

For each new blog post that comes across your desk, your job is to look through previously posted blogs and make at least ${BLOG_REQUIREMENTS.minInternalLinks} internal links.

To choose the best internal linking opportunities you must:
- Read the previous blog post summaries and look through their keywords. If there is a match where the previous blog post is highly relevant, then this is an internal linking opportunity.
- Do not link if it is not highly relevant. Only make a link if it makes sense and adds value for the reader.

Once you've found the best linking opportunities, you must update the blog post with the internal links. To do this you must:
- Add the link of the previous blog post at the relevant section of the new blog post. Drop the URL at the place which makes most sense. Later we will hyperlink the URL to the word in the blog post which it is placed next to. So your placing is very important.

Make sure to not delete any existing URLs or change anything about the blog post provided to you. You must only add new internal linking URLs and output the revised blog post.

Your output must be the blog post given to you plus the new urls. Don't remove any info.

Don't return the previous blog posts. Only return the current blog post with the internal links added.

Current blog Post:
${blogContent}

Previous Blog Posts (with their URLs and keywords):
${previousBlogs}`;
};

// ==============================================
// PROMPT 4: Slug Generation
// ==============================================
export const getSlugGenerationPrompt = (
  blogContent: string,
  primaryKeyword: string
): string => {
  return `Create a slug for the following blog post:

${blogContent}

A slug in a blog post is the part of the URL that comes after the domain name and identifies a specific page. It is typically a short, descriptive phrase that summarizes the content of the post, making it easier for users and search engines to understand what the page is about.

For example, in the URL www.example.com/intelligent-agents, the slug is "intelligent-agents".

A good slug is concise, contains relevant keywords, and avoids unnecessary words to improve readability and SEO.

The slug must be 4 or 5 words max and must include the primary keyword of the blog post which is "${primaryKeyword}".

Your output must be the slug and nothing else so that I can copy and paste your output and put it at the end of my blog post URL to post it right away.`;
};

// ==============================================
// PROMPT 5: Title Extraction
// ==============================================
export const getTitleExtractionPrompt = (
  blogContent: string,
  primaryKeyword: string
): string => {
  return `Extract the blog post title from the following blog post:

${blogContent}

The blog post title must include the primary keyword "${primaryKeyword}" and must inform the users right away of what they can expect from reading the blog post.

- Don't put the output in "". The output should just be text with no markdown or formatting.

Your output must only be the blog post title and nothing else.`;
};

// ==============================================
// PROMPT 6: Meta Description Generation
// ==============================================
export const getMetaDescriptionPrompt = (
  blogContent: string,
  primaryKeyword: string
): string => {
  return `Create a good meta description for the following blog post:

${blogContent}

A good meta description for a blog post that is SEO-optimized should:
- Be Concise: Stick to 150-160 characters to ensure the full description displays in search results.
- Include Keywords: Incorporate primary keywords naturally to improve visibility and relevance to search queries.

Primary keyword = "${primaryKeyword}"

- Provide Value: Clearly describe what the reader will learn or gain by clicking the link.
- Be Engaging: Use persuasive language, such as action verbs or a question, to encourage clicks.
- Align with Content: Ensure the description accurately reflects the blog post to meet user expectations and reduce bounce rates.

Your output must only be the meta description and nothing else.`;
};

// ==============================================
// HELPER: Format Previous Blogs for Linking
// ==============================================
export interface PreviousBlogFormatted {
  id: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  keywords: string[];
}

export const formatPreviousBlogsForPrompt = (
  blogs: PreviousBlogFormatted[]
): string => {
  return blogs
    .map((blog, index) => {
      return `
Blog #${index + 1}:
- Title: ${blog.title}
- URL: /${blog.slug}
- Primary Keyword: ${blog.primaryKeyword}
- Related Keywords: ${blog.keywords.join(', ')}
`;
    })
    .join('\n');
};
