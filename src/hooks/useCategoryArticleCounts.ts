/**
 * Hook: category article counts via TanStack Query.
 *
 * Uses `useQueries` to run one query per supported category.
 * TanStack handles:
 *  - In-memory deduplication & caching (staleTime = 60 min)
 *  - Automatic retry on failure
 *  - StrictMode double-invocation (no manual lock needed)
 *
 * `getCached` / `setCached` (localStorage) acts as a persistent layer so
 * counts survive page reloads without extra API calls.
 *
 * Requests are staggered with a per-query `initialDelay` to avoid
 * hitting the NewsData.io free-plan rate limit when multiple queries
 * start at the same time.
 * - Categories unsupported by the API (Other) are skipped; their badge
 *   renders "N/A".
 */

import { useQueries } from "@tanstack/react-query";
import { newsApiClient } from "@/api/news";
import { getCached, setCached } from "@/lib/localCache";
import type { NewsDataResponse } from "@/types";
import { newsKeys } from "@/lib/query/news/keys";
import { categoriesData } from "@/lib/categories-data";

// ─── Constants ────────────────────────────────────────────────────────────────

/** 60 minutes – matches the TTL used by other news queries. */
const COUNT_STALE_MS = 60 * 60 * 1000;
const COUNT_GC_MS    = 60 * 60 * 1000;

/** Gap between consecutive category requests (ms). */
const REQUEST_STAGGER_MS = 1000;

// ─── Category slug mapping ────────────────────────────────────────────────────

/**
 * Maps our UI slugs → the slugs accepted by NewsData.io free plan.
 * `null` = unsupported → no request is made; badge shows "N/A".
 */
const NEWS_SLUG_MAP: Record<string, string | null> = {
  world:        "world",
  politics:     "politics",
  business:     "business",
  technology:   "technology",
  science:      "science",
  health:       "health",
  sports:       "sports",
  entertainment:"entertainment",
  Other:        "other",
};

// ─── Types ────────────────────────────────────────────────────────────────────

/** null = API doesn't support this category → Badge shows "N/A" */
export type CategoryCount = number | null;

export interface CategoryCountsMap {
  [categoryName: string]: CategoryCount;
}

export interface UseCategoryArticleCountsResult {
  counts: CategoryCountsMap;
  isLoading: boolean;
  isError: boolean;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

/**
 * Fetches the article count for a single API slug using newsApiClient directly.
 * Checks localStorage first; saves the result if it fetches from the network.
 */
async function fetchCategoryCount(
  uiName: string,
  apiSlug: string,
): Promise<number> {
  const cacheKey = `categoryCount_${apiSlug}`;
  const cached = getCached<number>(cacheKey, COUNT_STALE_MS);
  if (cached !== null) return cached;

  const { data } = await newsApiClient.get<NewsDataResponse>("/latest", {
    params: { category: apiSlug, image: 1 },
  });

  if (data.status !== "success") {
    throw new Error(`API error for category "${uiName}"`);
  }

  const count = data.results?.length ?? 0;
  setCached(cacheKey, count);
  return count;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCategoryArticleCounts(): UseCategoryArticleCountsResult {
  const results = useQueries({
    queries: categoriesData.map((cat, index) => {
      const apiSlug = NEWS_SLUG_MAP[cat.slug];

      // Unsupported slug → disabled query; data stays undefined → "N/A"
      if (apiSlug === null) {
        return {
          queryKey: newsKeys.categoryCount(cat.slug),
          queryFn: (): Promise<number> => Promise.resolve(0),
          enabled: false,
          staleTime: COUNT_STALE_MS,
          gcTime: COUNT_GC_MS,
        };
      }

      return {
        queryKey: newsKeys.categoryCount(cat.slug),
        queryFn: async (): Promise<number> => {
          // Stagger requests: each category waits index * 1 000 ms before
          // firing so they don't hit the API simultaneously.
          if (index > 0) {
            await new Promise<void>((r) =>
              setTimeout(r, index * REQUEST_STAGGER_MS),
            );
          }
          return fetchCategoryCount(cat.name, apiSlug);
        },
        staleTime: COUNT_STALE_MS,
        gcTime: COUNT_GC_MS,
        retry: 1,
      };
    }),
  });

  // Build count map: null for disabled (unsupported) queries, number otherwise
  const counts: CategoryCountsMap = {};
  let anyLoading = false;
  let anyError   = false;

  categoriesData.forEach((cat, i) => {
    const r       = results[i];
    const apiSlug = NEWS_SLUG_MAP[cat.slug];

    if (apiSlug === null) {
      // Explicitly unsupported
      counts[cat.name] = null;
    } else if (r.isSuccess) {
      counts[cat.name] = r.data;
    } else if (r.isError) {
      counts[cat.name] = null;
      anyError = true;
    } else {
      // pending / loading
      if (r.isPending) anyLoading = true;
    }
  });

  return { counts, isLoading: anyLoading, isError: anyError };
}
