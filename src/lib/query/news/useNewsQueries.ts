/**
 * TanStack Query hooks for news. Single responsibility: data fetching + cache.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchNews, fetchNewsTwoPages, fetchArticleById } from "@/api/news";
import { getCached, setCached } from "@/lib/localCache";
import type { Article } from "@/types";
import { newsKeys } from "./keys";
import { filterByCategory } from "./filters";
import { CACHE_MAX_AGE_MS, GC_TIME_MS } from "../queryClient";

// export newsKeys for external use
export { newsKeys };

// ============================================================
// useFeaturedNews (world news, claimed first)
// ============================================================
export function useFeaturedNews() {
  const cacheKey = "featured";

  return useQuery<Article[]>({
    queryKey: newsKeys.featured(),
    queryFn: async () => {
      const cached = getCached<Article[]>(cacheKey, CACHE_MAX_AGE_MS);
      if (cached) return cached;

      const articles = await fetchNews({ category: "world" });
      const featured = articles.slice(0, 3);
      setCached(cacheKey, featured);
      console.log(`Fetched ${featured.length} articles for featured`);
      return featured;
    },
    staleTime: CACHE_MAX_AGE_MS,
    gcTime: GC_TIME_MS,
  });
}

// ============================================================
// useTopNews (latest news)
// ============================================================
export function useTopNews() {
  const cacheKey = "top";

  return useQuery<Article[]>({
    queryKey: newsKeys.top(),
    queryFn: async () => {
      const cached = getCached<Article[]>(cacheKey, CACHE_MAX_AGE_MS);
      if (cached) return cached;

      const articles = await fetchNews({});
      setCached(cacheKey, articles);
      console.log(`Fetched ${articles.length} articles for top news`);
      return articles;
    },
    staleTime: CACHE_MAX_AGE_MS,
    gcTime: GC_TIME_MS,
  });
}

// ============================================================
// useTrendingNews (trending news)
// ============================================================
export function useTrendingNews() {
  const cacheKey = "trending";

  return useQuery<Article[]>({
    queryKey: newsKeys.trending(),
    queryFn: async () => {
      const cached = getCached<Article[]>(cacheKey, CACHE_MAX_AGE_MS);
      if (cached) return cached;

      const articles = await fetchNews({ query: "trending" });
      const sorted = [...articles].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
      setCached(cacheKey, sorted);
      console.log(`Fetched ${sorted.length} articles for trending`);
      return sorted;
    },
    staleTime: CACHE_MAX_AGE_MS,
    gcTime: GC_TIME_MS,
  });
}

// ============================================================
// useNewsByCategory (category news)
// ============================================================
export function useNewsByCategory(category: string) {
  const cacheKey = `category_${category}`;

  return useQuery<Article[]>({
    queryKey: newsKeys.category(category),
    queryFn: async () => {
      const cached = getCached<Article[]>(cacheKey, CACHE_MAX_AGE_MS);
      if (cached) return cached;

      const articles = await fetchNewsTwoPages({ category });
      const filtered = filterByCategory(articles, category);
      setCached(cacheKey, filtered);
      console.log(`Fetched ${filtered.length} articles for category ${category}`);
      return filtered;
    },
    enabled: !!category,
    staleTime: CACHE_MAX_AGE_MS,
    gcTime: GC_TIME_MS,
  });
}

// ============================================================
// useSearchNews (search news)
// ============================================================
export function useSearchNews(query: string, enabled: boolean = true) {
  return useQuery<Article[]>({
    queryKey: newsKeys.search(query),
    queryFn: async () => {
      const articles = await fetchNews({ query });
      console.log(`Fetched ${articles.length} results for search "${query}"`);
      return articles;
    },
    enabled: enabled && query.trim().length >= 2,
    staleTime: CACHE_MAX_AGE_MS,
    gcTime: GC_TIME_MS,
  });
}

// ============================================================
// useArticleBySlug (article by slug)
// ============================================================
export function useArticleBySlug(slug: string) {
  return useQuery<Article | null>({
    queryKey: newsKeys.article(slug),
    queryFn: async () => {
      const parts = slug.split("-");
      const articleId = parts[parts.length - 1];
      const article = await fetchArticleById(articleId);
      if (article) {
        console.log(`Fetched article: ${article.title}`);
      } else {
        console.warn(`Article not found: ${slug}`);
      }
      return article;
    },
    enabled: !!slug,
    staleTime: CACHE_MAX_AGE_MS,
    gcTime: GC_TIME_MS,
  });
}
