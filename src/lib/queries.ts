/**
 * TanStack Query Hooks
 * React Query hooks for fetching data
 * Note: NewsAPI does not allow requests from the browser on the free plan.
 * Therefore, we use high-quality mock data.
 */

import { QueryClient, useQuery } from "@tanstack/react-query";
import { getMockArticles, getMockArticlesByCategory } from "./mock-data";
import type { Article } from "./mock-data";

/**
 * Hook to fetch top news
 */
export function useTopNews(category?: string) {
  return useQuery<Article[]>({
    queryKey: ["news", "top", category],
    queryFn: async () => {
      // Use mock data directly
      return category
        ? getMockArticlesByCategory(category, 30)
        : getMockArticles(30);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch trending news
 */
export function useTrendingNews() {
  return useQuery<Article[]>({
    queryKey: ["news", "trending"],
    queryFn: async () => {
      // Use mock data directly
      return getMockArticles(10).sort((a, b) => b.views - a.views);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to search news
 */
export function useSearchNews(query: string, enabled: boolean = true) {
  return useQuery<Article[]>({
    queryKey: ["news", "search", query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];

      // Use mock data for search
      const lowerQuery = query.toLowerCase();
      return getMockArticles(30).filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.excerpt.toLowerCase().includes(lowerQuery) ||
          article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      );
    },
    enabled: enabled && query.length >= 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single article by slug
 */
export function useArticleBySlug(slug: string) {
  return useQuery<Article | null>({
    queryKey: ["news", "article", slug],
    queryFn: async () => {
      // Use mock data
      return getMockArticles(100).find((a) => a.slug === slug) || null;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch news by category
 */
export function useNewsByCategory(category: string) {
  return useQuery<Article[]>({
    queryKey: ["news", "category", category],
    queryFn: async () => {
      // Use mock data
      return getMockArticlesByCategory(category, 30);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Create Query Client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime in v4)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
