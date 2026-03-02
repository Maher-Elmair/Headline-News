import React from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { Clock, Calendar, ArrowLeft, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReadingProgressBar } from "@/features/article/ReadingProgressBar";
import { ReadingSettingsPanel } from "@/features/article/ReadingSettingsPanel";
import { ShareButtons } from "@/features/article/ShareButtons";
import { NewsList } from "@/features/article/NewsList";
import { usePageLoading, useJinaContent } from "@/hooks";
import { ReadingSettingsProvider } from "@/lib/reading-settings-context";
import {
  useArticleBySlug,
  useTopNews,
  useFeaturedNews,
  useTrendingNews,
  newsKeys,
} from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";
import { formatDateFull } from "@/lib/dateUtils";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { ArticlePageSkeleton, ArticleContentSkeleton } from "@/components/shared/LoadingState";
import NotFoundPage from "@/pages/NotFoundPage";
import type { Article } from "@/types";

/** Builds a readable title from slug (segment before "--" if any, dashes to spaces, title case). */
function getTitleFromSlug(slug: string): string {
  const base = slug.includes("--") ? slug.split("--")[0] : slug;
  return base
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .slice(0, 120);
}

function ArticlePageContent() {
  const { slug } = useParams<{ slug: string }>();
  const isPageLoading = usePageLoading(800);
  const queryClient = useQueryClient();

  const { data: topArticles = [] } = useTopNews();
  const { data: featuredArticles = [] } = useFeaturedNews();
  const { data: trendingArticles = [] } = useTrendingNews();

  // Prefer article from already-loaded lists (avoids API fetch-by-id which can return 422)
  const articleFromList = [
    ...topArticles,
    ...featuredArticles,
    ...trendingArticles,
  ].find((a) => a.slug === slug);

  // Also check per-article cache seeded by SearchPage
  const cachedSearchArticle = slug
    ? queryClient.getQueryData(newsKeys.article(slug))
    : undefined;

  const shouldFetchBySlug = !articleFromList && !cachedSearchArticle && !!slug;
  const {
    data: fetchedArticle,
    isLoading: articleLoading,
    isError: articleError,
  } = useArticleBySlug(shouldFetchBySlug ? slug : "");

  const article = articleFromList ?? (cachedSearchArticle as Article | undefined) ?? fetchedArticle ?? null;

  const rawContent = article?.content?.trim() ?? "";
  const isContentLimited =
    /only\s+available\s+in\s+paid\s+plans/i.test(rawContent) ||
    rawContent.length < 400;
  const shouldFetchJina = Boolean(article?.link) && isContentLimited;

  const { data: jinaData, isLoading: jinaLoading, isError: jinaError } = useJinaContent(
    article?.link,
    shouldFetchJina,
  );

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const articleFetchFailed =
    shouldFetchBySlug && !articleLoading && (articleError || fetchedArticle === null);
  if (articleFetchFailed) {
    return (
      <NotFoundPage
        variant="article-failed"
        articleSlug={slug}
        articleTitleFromSlug={getTitleFromSlug(slug)}
      />
    );
  }

  const showLoading = isPageLoading || (shouldFetchBySlug && articleLoading);
  const showSkeleton = showLoading || !article;

  if (showSkeleton) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <ArticlePageSkeleton />
      </motion.div>
    );
  }

  if (!article) return null;

  const allArticles = [
    ...topArticles,
    ...featuredArticles,
    ...trendingArticles,
  ];
  const others = allArticles.filter((a) => a.id !== article.id);
  const sameCategory = others.filter((a) => a.category === article.category);
  const otherCategory = others.filter((a) => a.category !== article.category);
  const relatedArticles = [
    ...sameCategory.slice(0, 3),
    ...otherCategory.slice(0, Math.max(0, 3 - sameCategory.length)),
  ].slice(0, 3);

  return (
    <>
      <ReadingProgressBar />
      <ReadingSettingsPanel />

      <article
        className="min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: "var(--article-bg)",
        }}
      >
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="group inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Category & Breaking News badge (breaking = first in top news) */}
            <div className="flex items-center gap-3 flex-wrap">
              {topArticles[0]?.id === article.id && (
                <motion.div
                  animate={{ opacity: [1, 0.9, 1], scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Badge
                    variant="destructive"
                    className="text-xs uppercase tracking-wider"
                  >
                    Breaking News
                  </Badge>
                </motion.div>
              )}
              <Badge className="text-xs uppercase tracking-wider">
                {article.category}
              </Badge>
            </div>

            {/* Title */}
            <h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "var(--article-heading)" }}
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p
              className="text-xl md:text-2xl leading-relaxed"
              style={{ color: "var(--article-text-muted)" }}
            >
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
              {/* Author */}
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full border-2 border-border object-cover"
                />
                <div>
                  <p
                    className="font-medium"
                    style={{ color: "var(--article-text)" }}
                  >
                    {article.author.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--article-text-muted)" }}
                  >
                    Author
                  </p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-12" />

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar
                  className="h-4 w-4"
                  style={{ color: "var(--article-text-muted)" }}
                />
                <span style={{ color: "var(--article-text-muted)" }}>
                  {formatDateFull(article.publishedAt)}
                </span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2">
                <Clock
                  className="h-4 w-4"
                  style={{ color: "var(--article-text-muted)" }}
                />
                <span style={{ color: "var(--article-text-muted)" }}>
                  {article.readingTime} min read
                </span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-2">
                <Eye
                  className="h-4 w-4"
                  style={{ color: "var(--article-text-muted)" }}
                />
                <span style={{ color: "var(--article-text-muted)" }}>
                  {article.views.toLocaleString()} views
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={article.title}
            />
          </motion.div>
        </header>

        {/* Featured Image */}
        {article.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto px-4 sm:px-6 lg:px-8 pb-16"
          style={{ maxWidth: "var(--article-max-width)" }}
        >
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            style={{
              color: "var(--article-text)",
              fontSize: "var(--article-font-size)",
              lineHeight: "var(--article-line-height)",
              fontFamily: "var(--article-font-family)",
              textAlign: "var(--article-text-align)" as React.CSSProperties["textAlign"],
            }}
          >
            {(() => {
              const excerpt = article.excerpt?.trim() ?? "";

              if (shouldFetchJina && jinaLoading) {
                return <ArticleContentSkeleton />;
              }

              if (shouldFetchJina && jinaData?.content) {
                return (
                  <div
                    className="article-content [&_p]:mb-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:no-underline"
                    style={{ "--prose-heading": "var(--article-heading)" } as React.CSSProperties}
                    dangerouslySetInnerHTML={{ __html: jinaData.content }}
                  />
                );
              }

              if (isContentLimited) {
                const fetchFailed = shouldFetchJina && !jinaLoading && (jinaError || !jinaData?.content);

                if (!excerpt) {
                  return (
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        Full article content is not available for this article.
                      </p>
                      {fetchFailed && article.link && (
                        <div
                          className="rounded-lg border border-border bg-muted/30 p-4"
                          style={{ color: "var(--article-text-muted)" }}
                        >
                          <p className="font-medium mb-2">
                            Full article could not be loaded.
                          </p>
                          <p className="text-sm mb-3">
                            The source website may be blocking access or the page is temporarily unavailable.
                          </p>
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-2 font-medium"
                          >
                            Open article on source website
                          </a>
                        </div>
                      )}
                      {!fetchFailed && article.link && (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          Read on source website
                        </a>
                      )}
                    </div>
                  );
                }

                const excerptParagraphs = excerpt
                  .split(/(?<=[.!?])\s+/)
                  .filter((s) => s.length > 0);
                const chunkSize = Math.max(
                  1,
                  Math.ceil(excerptParagraphs.length / 3),
                );
                const groups: string[] = [];
                for (let i = 0; i < excerptParagraphs.length; i += chunkSize) {
                  groups.push(
                    excerptParagraphs.slice(i, i + chunkSize).join(" "),
                  );
                }
                return (
                  <>
                    {groups.map((paragraph, index) => (
                      <p key={index} className="mb-6">
                        {paragraph}
                      </p>
                    ))}
                    {fetchFailed && article.link && (
                      <div
                        className="rounded-lg border border-border bg-muted/30 p-4 mt-8"
                        style={{ color: "var(--article-text-muted)" }}
                      >
                        <p className="font-medium mb-2">
                          Full article could not be loaded.
                        </p>
                        <p className="text-sm mb-3">
                          The source website may be blocking access or the page is temporarily unavailable.
                        </p>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-2 font-medium"
                        >
                          Open article on source website
                        </a>
                      </div>
                    )}
                    {!fetchFailed && article.link && (
                      <p className="text-sm text-muted-foreground italic mt-8">
                        Full article may be available on the{" "}
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          source website
                        </a>
                        .
                      </p>
                    )}
                  </>
                );
              }

              const paragraphs = rawContent
                .split(/\n\n+/)
                .map((p) => p.trim())
                .filter(Boolean);
              if (paragraphs.length === 0) {
                return (
                  <p className="text-muted-foreground italic">
                    Full article content is not available for this article.
                  </p>
                );
              }
              return paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-6 whitespace-pre-line">
                  {paragraph}
                </p>
              ));
            })()}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3
                className="text-sm font-medium mb-3"
                style={{ color: "var(--article-text-muted)" }}
              >
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-(--article-text-muted)/50 text-(--article-text)"
                    style={{
                      borderColor: "var(--article-text-muted)",
                      color: "var(--article-text)",
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-border/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="font-serif text-3xl font-bold mb-8"
                style={{ color: "var(--article-heading)" }}
              >
                Related Articles
              </h2>
              <NewsList articles={relatedArticles.slice(0, 3)} columns={3} />
            </motion.div>
          </section>
        )}
      </article>
    </>
  );
}

export default function ArticlePage() {
  return (
    <ReadingSettingsProvider>
      <ArticlePageContent />
    </ReadingSettingsProvider>
  );
}
