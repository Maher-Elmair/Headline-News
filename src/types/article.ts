/**
 * Normalized article shape used across the app.
 */

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** Source article URL - used for Jina Reader full content fetch */
  link?: string;
  imageUrl: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
  views: number;
  isFeatured?: boolean;
  isBreaking?: boolean;
  tags: string[];
}
