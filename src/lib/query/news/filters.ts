/**
 * News filtering helpers. Used by category queries.
 */

import type { Article } from "@/types";

/**
 * Keeps only articles whose primary category matches the requested one.
 * Articles tagged as "top" are excluded.
 */
export function filterByCategory(
  articles: Article[],
  category: string,
): Article[] {
  const target = category.toLowerCase();

  return articles.filter((a) => {
    const primary = a.category.toLowerCase();
    if (primary === "top") return false;
    return primary === target;
  });
}
