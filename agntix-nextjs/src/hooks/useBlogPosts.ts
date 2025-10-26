import { useState, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { blogDT } from '@/types/blog-d-t';

// Default placeholder image
const defaultPlaceholder: StaticImageData = {
  src: '/assets/img/blog/blog-list/blog-list-1.jpg',
  height: 600,
  width: 800,
  blurDataURL: '',
};

interface SupabaseBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  metadescription: string;
  status: string;
  primary_keyword: string;
  imagename: string | null;
  webviewlink: string | null;
  tumbnaillink: string | null;
  created_at: string;
  updated_at: string;
}

interface UseBlogPostsOptions {
  limit?: number;
  offset?: number;
  status?: 'draft' | 'published';
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
  const { limit = 10, offset = 0, status = 'published' } = options;
  const [posts, setPosts] = useState<blogDT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
          status,
        });

        const response = await fetch(`/api/blogs?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();

        // Transform Supabase posts to match blogDT interface
        const transformedPosts: blogDT[] = data.posts.map(
          (post: SupabaseBlogPost, index: number) => ({
            id: parseInt(post.id) || offset + index + 1,
            author: 'Admin',
            date: new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
            category: post.primary_keyword || 'General',
            title: post.title,
            image: post.webviewlink
              ? {
                  src: post.webviewlink,
                  height: 600,
                  width: 800,
                  blurDataURL: '',
                }
              : defaultPlaceholder,
            excerpt: post.metadescription || post.content.substring(0, 150) + '...',
            link: `/blog-details-light?slug=${post.slug}`,
          })
        );

        setPosts(transformedPosts);
        setTotal(data.total);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [limit, offset, status]);

  return { posts, loading, error, total };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<SupabaseBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }

        const data = await response.json();
        setPost(data.post);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
