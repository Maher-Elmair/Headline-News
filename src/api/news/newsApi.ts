/**
 * News API client and functions.
 * Single responsibility: fetch and normalize news from NewsData.io.
 */

import axios from "axios";
import type { NewsDataResponse, NewsDataArticle, Article } from "@/types";

const BASE_URL = "https://newsdata.io/api/1";
const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

export const newsApiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
    language: "en",
  },
});

const generateAvatarUrl = (name: string): string => {
  const seed = name.trim() || "Unknown";
  return `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(seed)}&size=100`;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop";

const estimateReadingTime = (content: string | null): number => {
  if (!content) return 3;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const generateSlug = (title: string, id: string): string => {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return `${base}-${id.slice(0, 8)}`;
};

const extractExcerpt = (
  description: string | null,
  content: string | null,
): string => {
  const source = description ?? content ?? "";
  if (!source) return "";

  const clean = source.replace(/<[^>]*>/g, "").trim();
  if (clean.length <= 160) return clean;

  const slice = clean.slice(0, 220);
  const lastSentenceMatch = slice.search(/[.!?][^.!?]*$/);

  if (lastSentenceMatch > 80) {
    return slice.slice(0, lastSentenceMatch + 1);
  }

  return (
    clean
      .slice(0, 160)
      .replace(/\s+\S*$/, "")
      .trimEnd() + "..."
  );
};

export const normalizeArticle = (raw: NewsDataArticle): Article => {
  const authorName = raw.creator?.[0] ?? raw.source_name ?? "Unknown Author";
  const category = raw.category?.[0] ?? "General";

  return {
    id: raw.article_id,
    title: raw.title ?? "Untitled",
    slug: generateSlug(raw.title ?? raw.article_id, raw.article_id),
    excerpt: extractExcerpt(raw.description, raw.content),
    content: raw.content ?? raw.description ?? "",
    imageUrl: raw.image_url ?? FALLBACK_IMAGE,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    author: {
      name: authorName,
      avatar: generateAvatarUrl(authorName),
    },
    publishedAt: raw.pubDate,
    readingTime: estimateReadingTime(raw.content),
    views: 0,
    tags: raw.category ?? [],
  };
};

const normalizeTitleKey = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 80);

const deduplicateRaw = (results: NewsDataArticle[]): NewsDataArticle[] => {
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();
  const unique: NewsDataArticle[] = [];

  for (const article of results) {
    const titleKey = normalizeTitleKey(article.title ?? "");

    if (seenIds.has(article.article_id) || seenTitles.has(titleKey)) {
      continue;
    }

    seenIds.add(article.article_id);
    if (titleKey) seenTitles.add(titleKey);
    unique.push(article);
  }

  return unique;
};

export interface FetchNewsParams {
  category?: string;
  query?: string;
  page?: string;
}

export const fetchNews = async (
  params: FetchNewsParams = {},
): Promise<Article[]> => {
  const { data } = await newsApiClient.get<NewsDataResponse>("/latest", {
    params: {
      ...(params.category && { category: params.category.toLowerCase() }),
      ...(params.query && { q: params.query }),
      ...(params.page && { page: params.page }),
      image: 1,
    },
  });

  if (data.status !== "success") {
    throw new Error("Failed to fetch news from API");
  }

  const unique = deduplicateRaw(data.results);

  return unique
    .filter(
      (article) => article.title && (article.description || article.content),
    )
    .map(normalizeArticle);
};

export const fetchNewsTwoPages = async (
  params: FetchNewsParams = {},
): Promise<Article[]> => {
  const { data: page1 } = await newsApiClient.get<NewsDataResponse>("/latest", {
    params: {
      ...(params.category && { category: params.category.toLowerCase() }),
      image: 1,
    },
  });

  if (page1.status !== "success") {
    throw new Error("Failed to fetch page 1 from API");
  }

  const allRaw: NewsDataArticle[] = [...page1.results];

  if (page1.nextPage) {
    try {
      const { data: page2 } = await newsApiClient.get<NewsDataResponse>(
        "/latest",
        {
          params: {
            ...(params.category && {
              category: params.category.toLowerCase(),
            }),
            image: 1,
            page: page1.nextPage,
          },
        },
      );

      if (page2.status === "success") {
        allRaw.push(...page2.results);
      }
    } catch {
      // Page 2 failed, continue with page 1 only
    }
  }

  const unique = deduplicateRaw(allRaw);

  return unique
    .filter(
      (article) => article.title && (article.description || article.content),
    )
    .map(normalizeArticle);
};

export const fetchArticleById = async (
  articleId: string,
): Promise<Article | null> => {
  const { data } = await newsApiClient.get<NewsDataResponse>("/latest", {
    params: { id: articleId },
  });

  if (data.status !== "success" || !data.results.length) {
    return null;
  }

  return normalizeArticle(data.results[0]);
};
