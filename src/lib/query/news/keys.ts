/**
 * Query key factory for news. Keeps cache keys consistent.
 */

export const newsKeys = {
  all: ["news"] as const,
  featured: () => [...newsKeys.all, "featured"] as const,
  top: () => [...newsKeys.all, "top"] as const,
  trending: (timeFrame: string = "today") => [...newsKeys.all, "trending", timeFrame] as const,
  search: (query: string) => [...newsKeys.all, "search", query] as const,
  article: (slug: string) => [...newsKeys.all, "article", slug] as const,
  category: (category: string) =>
    [...newsKeys.all, "category", category] as const,
  categoryCount: (slug: string) =>
    [...newsKeys.all, "categoryCount", slug] as const,
};
