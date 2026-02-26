/**
 * Fetches full article content when API content is limited.
 * Uses Readability + CORS proxy (free, no API key).
 */

import { useQuery } from "@tanstack/react-query";
import { fetchFullArticle } from "@/services/articleExtractor";

export function useJinaContent(articleUrl: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ["fullArticle", articleUrl],
    queryFn: async () => {
      if (!articleUrl) return null;
      return fetchFullArticle(articleUrl);
    },
    enabled: Boolean(articleUrl) && enabled,
    staleTime: 1000 * 60 * 10, // 10 min
  });
}
