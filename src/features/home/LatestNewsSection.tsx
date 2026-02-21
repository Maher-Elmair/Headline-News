import { motion } from "motion/react";
import { Link } from "react-router";
import { Newspaper, ArrowRight, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import type { Article } from "@/lib/mock-data";
// import { formatDate } from "@/lib/mock-data";
import type { Article } from "@/types";
// import { formatDate } from "@/lib/dateUtils";

import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import {
  FeaturedArticleCardSkeleton,
  ArticleCardSkeleton,
} from "@/components/shared/LoadingState";
import { formatDate } from "@/lib/dateUtils";

interface LatestNewsSectionProps {
  articles: Article[];
  isLoading?: boolean;
}

export function LatestNewsSection({
  articles,
  isLoading = false,
}: LatestNewsSectionProps) {
  // If not loading and there are no articles, don't render anything
  if (!isLoading && articles.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Section Header - always visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between border-b-2 border-primary/20 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            <Newspaper className="h-7 w-7 text-primary relative z-10" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Latest News
          </h2>
        </div>
        <Link to="/trending">
          <Button variant="ghost" className="group hidden sm:flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>

      {/* Featured Article (Large with Image on Left) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {isLoading ? (
          <FeaturedArticleCardSkeleton />
        ) : (
          <Link to={`/article/${articles[0].slug}`} className="group block">
            <Card className="overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row">
                {/* Image - Left Side */}
                <div className="relative md:w-1/2 lg:w-[55%] aspect-16/10 md:aspect-auto overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={articles[0].imageUrl}
                    alt={articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-background/90 via-background/30 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white font-bold uppercase tracking-wider shadow-lg border border-primary hover:bg-primary hover:text-white transition-all">
                      {articles[0].category}
                    </Badge>
                  </div>
                </div>

                {/* Content - Right Side */}
                <div className="md:w-1/2 lg:w-[45%] p-6 md:p-6 lg:p-8 flex flex-col justify-center space-y-3 md:space-y-4">
                  <h3 className="font-serif text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-3">
                    {articles[0].title}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                    {articles[0].excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <ImageWithFallback
                        src={articles[0].author.avatar}
                        alt={articles[0].author.name}
                        className="h-7 w-7 md:h-8 md:w-8 rounded-full ring-2 ring-border"
                      />
                      <span className="font-semibold">
                        {articles[0].author.name}
                      </span>
                    </div>
                    <span className="text-muted-foreground/80">
                      {formatDate(articles[0].publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {articles[0].readingTime} min
                    </span>
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all pt-2">
                    <span>Read Full Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )}
      </motion.div>

      {/* Grid Articles - 2 Columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {isLoading
          ? // Show skeleton grid items while loading
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ArticleCardSkeleton />
              </motion.div>
            ))
          : // Show actual grid articles
            articles.slice(1).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link
                  to={`/article/${article.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full overflow-hidden border hover:border-primary/50 hover:shadow-lg transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        {/* Category Badge */}
                        <Badge
                          variant="secondary"
                          className="text-xs font-bold uppercase tracking-wider shadow-md text-primary bg-primary/10 border-2 border-primary/30 hover:bg-primary hover:text-white transition-all"
                        >
                          {article.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-serif text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span className="font-medium truncate">
                            {article.author.name}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock className="h-3 w-3" />
                          {article.readingTime} min
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
      </motion.div>

      {/* View All on Mobile */}
      <div className="sm:hidden flex justify-center">
        <Link to="/trending">
          <Button variant="outline" className="group">
            View All Latest News
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
