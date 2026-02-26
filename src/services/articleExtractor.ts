/**
 * Free article content extraction using Mozilla Readability + CORS proxy.
 * No paid API required.
 */

import { Readability } from "@mozilla/readability";
import DOMPurify from "dompurify";

const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?url=",
];

async function fetchViaProxy(url: string, base: string): Promise<string | null> {
  const full = `${base}${encodeURIComponent(url)}`;
  const res = await fetch(full, {
    method: "GET",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) return null;
  return res.text();
}

const JUNK_PATTERNS = [
  /loading\s+comments?\.{0,3}/gi,
  /read\s+more/gi,
  /show\s+more/gi,
  /continue\s+reading/gi,
  /sign\s+up\s+to\s+(?:read|continue)/gi,
  /subscribe\s+(?:to|now)/gi,
];

function removeJunkContent(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const removeElements: Element[] = [];
  const elements = doc.body.querySelectorAll("p, a, span, div, li");
  elements.forEach((el) => {
    const text = el.textContent?.trim() ?? "";
    if (!text || text.length > 80) return;
    const lower = text.toLowerCase();
    if (JUNK_PATTERNS.some((re) => lower.match(re))) {
      removeElements.push(el);
    }
  });

  removeElements.forEach((el) => el.remove());

  return doc.body.innerHTML;
}

export interface ArticleExtractResult {
  content: string;
  title?: string;
  url?: string;
  /** True if content is HTML (use with DOMPurify) */
  isHtml: true;
}

/**
 * Fetches full article content from a URL.
 * Uses CORS proxy + Readability for extraction.
 */
export async function fetchFullArticle(
  articleUrl: string,
): Promise<ArticleExtractResult | null> {
  if (!articleUrl || !articleUrl.startsWith("http")) {
    return null;
  }

  try {
    let html: string | null = null;
    for (const base of CORS_PROXIES) {
      html = await fetchViaProxy(articleUrl, base);
      if (html?.trim()) break;
    }
    if (!html?.trim()) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const reader = new Readability(doc, { charThreshold: 100 });
    const article = reader.parse();
    if (!article?.textContent?.trim()) return null;

    const rawContent = article.content ?? "";
    let sanitized: string = DOMPurify.sanitize(rawContent, {
      ALLOWED_TAGS: [
        "p", "h1", "h2", "h3", "h4", "h5", "h6",
        "br", "strong", "em", "u", "a", "ul", "ol", "li",
        "blockquote", "figure", "figcaption", "img",
      ],
      ALLOWED_ATTR: ["href", "src", "alt"],
    }) as string;

    sanitized = removeJunkContent(sanitized);

    return {
      content: sanitized.trim(),
      title: article.title ?? undefined,
      url: articleUrl,
      isHtml: true,
    };
  } catch {
    return null;
  }
}
