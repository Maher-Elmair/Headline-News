import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Article } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import {
  EliteMainArticleSkeleton,
  EliteSideArticleSkeleton,
} from "@/components/shared/LoadingState";

interface EliteCategorySectionProps {
  title: string;
  categorySlug: string;
  articles: Article[];
  isLoading?: boolean;
  // Section number passed from the parent to avoid counter issues in StrictMode
  sectionNumber: number;
}

export function EliteCategorySection({
  title,
  categorySlug,
  articles,
  isLoading = false,
  sectionNumber,
}: EliteCategorySectionProps) {
  const instanceNumber = String(sectionNumber).padStart(2, "0");

  // Do not render if there is nothing to show and we are not loading
  if (!isLoading && articles.length === 0) return null;

  // For skeleton state we do not need to destructure articles
  const [mainArticle, ...sideArticles] = isLoading ? [] : articles;

  return (
    <section className="relative overflow-hidden">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-start justify-between mb-6">
          {/* Left: vertical bar + sequential number + title */}
          <div className="flex items-stretch gap-4">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="w-0.5 flex-1 bg-primary" />
              <span className="text-[9px] font-semibold tracking-[3px] text-primary uppercase [writing-mode:vertical-rl] rotate-180 font-sans pb-1">
                {instanceNumber}
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground tracking-tight self-end">
              {title}
            </h2>
          </div>

          <Link to={`/category/${categorySlug}`} className="hidden sm:block">
            <Button
              variant="ghost"
              className="group text-sm font-semibold hover:text-primary"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Content Grid - 70/30 split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Article - 8 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8"
        >
          {isLoading ? (
            <EliteMainArticleSkeleton />
          ) : (
            <Link to={`/article/${mainArticle.slug}`} className="group block">
              <div className="relative aspect-21/24 sm:aspect-21/14 lg:aspect-21/12 overflow-hidden rounded-sm bg-muted">
                <ImageWithFallback
                  src={mainArticle.imageUrl}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                  <Badge className="bg-primary/90 text-white w-fit mb-4 uppercase text-xs font-bold tracking-wider border border-primary hover:bg-primary hover:text-white transition-all">
                    {mainArticle.category}
                  </Badge>

                  {/* Title clamped to 2 lines */}
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight line-clamp-2 group-hover:text-primary/90 transition-colors">
                    {mainArticle.title}
                  </h3>

                  {/* Excerpt clamped to 2 lines */}
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed mb-6 line-clamp-2 max-w-3xl">
                    {mainArticle.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-white/80 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <ImageWithFallback
                        src={mainArticle.author.avatar}
                        alt={mainArticle.author.name}
                        className="h-8 w-8 rounded-full ring-2 ring-white/30"
                      />
                      <span className="font-semibold truncate max-w-32 sm:max-w-none">
                        {mainArticle.author.name}
                      </span>
                    </div>
                    <span>•</span>
                    <span className="shrink-0">
                      {formatDate(mainArticle.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="h-3.5 w-3.5" />
                      {mainArticle.readingTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </motion.div>

        {/* Side Articles - 4 columns, max 3 items */}
        <div className="lg:col-span-4 space-y-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <EliteSideArticleSkeleton />
                </motion.div>
              ))
            : sideArticles.slice(0, 3).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/article/${article.slug}`} className="group block">
                    <Card className="overflow-hidden border-0 bg-card hover:bg-muted/50 transition-all duration-500 shadow-sm hover:shadow-md">
                      <div className="flex gap-4 p-4">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-sm overflow-hidden bg-muted">
                          <ImageWithFallback
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="space-y-2">
                            <Badge
                              variant="outline"
                              className="text-[10px] uppercase font-bold tracking-wider w-fit text-primary bg-primary/5 border-primary hover:bg-primary hover:text-white transition-all"
                            >
                              {article.category}
                            </Badge>

                            {/* Title clamped to 2 lines */}
                            <h4 className="font-serif text-base md:text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                            <span className="font-medium truncate max-w-24">
                              {article.author.name}
                            </span>
                            <span>•</span>
                            <span className="shrink-0">
                              {article.readingTime}m
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>

      {/* Mobile View All Button */}
      <div className="sm:hidden mt-6 text-center">
        <Link to={`/category/${categorySlug}`}>
          <Button variant="outline" className="group">
            View All {title}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}