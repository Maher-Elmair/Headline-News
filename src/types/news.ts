/**
 * Types for NewsData.io API responses.
 */

export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  category: string[];
  creator: string[] | null;
  pubDate: string;
  source_name: string;
}

export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage?: string;
}
