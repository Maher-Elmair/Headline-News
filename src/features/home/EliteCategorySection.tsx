import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState, useLayoutEffect, useRef } from "react";
import type { Article } from "@/lib/mock-data";
import { formatDate } from "@/lib/mock-data";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import {
  EliteMainArticleSkeleton,
  EliteSideArticleSkeleton,
} from "@/components/shared/LoadingState";

// Module-level counter for dynamic numbers (increments with each instance)
let instanceCounter = 0;

interface EliteCategorySectionProps {
  title: string;
  categorySlug: string;
  articles: Article[];
  isLoading?: boolean;
}

export function EliteCategorySection({
  title,
  categorySlug,
  articles,
  isLoading = false,
}: EliteCategorySectionProps) {
  // State for the unique number, initially null
  const [instanceNumber, setInstanceNumber] = useState<string>("--");
  // Ref to track if the number has been set (to avoid double increment in Strict Mode)
  const numberSetRef = useRef(false);

  // Use useLayoutEffect to set the number before the browser paints
  useLayoutEffect(() => {
    if (!numberSetRef.current) {
      instanceCounter += 1;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInstanceNumber(String(instanceCounter).padStart(2, "0"));
      numberSetRef.current = true;
    }
  }, []);

  // If not loading and there are no articles, don't render anything
  if (!isLoading && articles.length === 0) return null;

  // For skeleton, we don't need to extract articles
  const [mainArticle, ...sideArticles] = isLoading ? [] : articles;

  return (
    <section className="relative overflow-hidden">
      {/* Section Header - Premium & Bold */}
      <div className="mb-10">
        <div className="flex items-start justify-between mb-6">
          {/* Left: Bar + Number + Title */}
          <div className="flex items-stretch gap-4">
            {/* Gold vertical bar + number */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="w-0.5 flex-1 bg-primary" />
              <span className="text-[9px] font-semibold tracking-[3px] text-primary uppercase [writing-mode:vertical-rl] rotate-180 font-sans pb-1">
                {instanceNumber}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground tracking-tight self-end">
              {title}
            </h2>
          </div>

          {/* View All */}
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

        {/* Decorative Line with Gradient - Below Title */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent" />
        {/* <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent to-primary/70" />
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
            <div className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent to-primary/70" />
        </div> */}
      </div>

      {/* Content Grid - 70/30 Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Article - Large Featured (70% ≈ 8.4/12, rounded to 8/12) */}
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
                {/* Image */}
                <ImageWithFallback
                  src={mainArticle.imageUrl}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                  {/* Category Badge - Improved */}
                  <Badge className="bg-primary/90 text-white w-fit mb-4 uppercase text-xs font-bold tracking-wider border border-primary hover:bg-primary hover:text-white transition-all">
                    {mainArticle.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-primary/90 transition-colors">
                    {mainArticle.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed mb-6 line-clamp-2 max-w-3xl">
                    {mainArticle.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-white/80 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <ImageWithFallback
                        src={mainArticle.author.avatar}
                        alt={mainArticle.author.name}
                        className="h-8 w-8 rounded-full ring-2 ring-white/30"
                      />
                      <span className="font-semibold">
                        {mainArticle.author.name}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(mainArticle.publishedAt)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {mainArticle.readingTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </motion.div>

        {/* Side Articles - Compact List (30% ≈ 3.6/12, rounded to 4/12) */}
        <div className="lg:col-span-4 space-y-6">
          {isLoading
            ? // Show 3 skeleton items while loading
              Array.from({ length: 3 }).map((_, index) => (
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
            : // Show up to 3 side articles (slice to ensure maximum 3)
              sideArticles.slice(0, 3).map((article, index) => (
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
                            {/* Category Badge - Improved */}
                            <Badge
                              variant="outline"
                              className="text-[10px] uppercase font-bold tracking-wider w-fit text-primary bg-primary/5 border-primary hover:bg-primary hover:text-white transition-all"
                            >
                              {article.category}
                            </Badge>

                            <h4 className="font-serif text-base md:text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                            <span className="font-medium truncate">
                              {article.author.name}
                            </span>
                            <span>•</span>
                            <span>{article.readingTime}m</span>
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
