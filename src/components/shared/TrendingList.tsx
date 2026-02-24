import { Link } from "react-router";
import { motion } from "motion/react";
import { Eye, Clock, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingListItemsSkeleton } from "@/components/shared/LoadingState";
import type { Article } from "@/types";

interface TrendingListProps {
  articles: Article[];
  isLoading?: boolean;
  isError?: boolean;
}

export function TrendingList({
  articles,
  isLoading = false,
  isError = false,
}: TrendingListProps) {
  const showSkeleton = isLoading || isError;
  return (
    <Card className="border shadow-lg overflow-hidden">
      {/* Header - always visible */}
      <div className="bg-linear-to-br from-orange-500/5 via-red-500/5 to-pink-500/5 p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/30 blur-md rounded-full animate-pulse" />
            <Flame className="h-5 w-5 text-orange-500 relative z-10" />
          </div>
          <div>
            <h3 className="font-serif text-base md:text-lg font-bold">
              Trending
            </h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Popular now
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4 space-y-4">
        {showSkeleton ? (
          <TrendingListItemsSkeleton count={6} />
        ) : (
          // Show actual articles
          articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/article/${article.slug}`}
                className="group flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0 hover:bg-accent/30 -mx-2 px-2 py-2 rounded-lg transition-all"
              >
                {/* Ranking Badge */}
                <div className="shrink-0">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base transition-all group-hover:scale-110 ${
                      index === 0
                        ? "bg-linear-to-br from-yellow-400 to-orange-500 text-white shadow-md shadow-orange-500/20"
                        : index === 1
                          ? "bg-linear-to-br from-slate-300 to-slate-400 text-white shadow-md shadow-slate-400/20"
                          : index === 2
                            ? "bg-linear-to-br from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/20"
                            : "bg-primary/10 text-primary"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1 space-y-2 min-w-0">
                  {/* Category Badge */}
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/30 hover:bg-primary hover:text-white transition-all"
                  >
                    {article.category}
                  </Badge>

                  {/* Title */}
                  <h4 className="font-serif text-sm sm:text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span className="hidden sm:inline">
                        {(article.views / 1000).toFixed(1)}k
                      </span>
                      <span className="sm:hidden">
                        {Math.round(article.views / 1000)}k
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readingTime}m
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
