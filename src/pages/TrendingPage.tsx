import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Flame, Clock, Calendar } from "lucide-react";
import { NewsList } from "@/components/shared/NewsList";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageLoading } from "@/hooks/usePageLoading";
import { useTrendingNews } from "@/lib/query";
import { SearchResultsSkeleton } from "@/components/shared/LoadingState";

type TimeFrame = "today" | "week" | "month";

function TrendingPage() {
  const isPageLoading = usePageLoading(800);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("today");

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useTrendingNews(timeFrame);

  const showSkeleton = isPageLoading || isLoading || isError;

  const timeFrames: { value: TimeFrame; label: string; icon: typeof Clock }[] =
    [
      { value: "today", label: "Today", icon: Clock },
      { value: "week", label: "This Week", icon: Calendar },
      { value: "month", label: "This Month", icon: TrendingUp },
    ];

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse" />
              <Flame className="h-16 w-16 text-orange-500 relative z-10" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-serif text-4xl md:text-5xl font-bold">
                  Trending Now
                </h1>
                <Badge variant="outline" className="text-sm animate-pulse">
                  Live
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                The most popular and talked-about stories right now
              </p>
            </div>
          </div>

          {/* Time Frame Filters */}
          <div className="flex flex-wrap gap-3">
            {timeFrames.map(({ value, label, icon: Icon }) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTimeFrame(value)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    timeFrame === value
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                      : "bg-card border-border hover:border-primary/50"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Trending Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="p-6 bg-linear-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Trending Stories
                </p>
                {showSkeleton ? (
                  <Skeleton className="h-9 w-16" />
                ) : (
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {articles.length}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Views
                </p>
                {showSkeleton ? (
                  <Skeleton className="h-9 w-24" />
                ) : (
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {articles.length > 0
                      ? (articles.length * 15420).toLocaleString()
                      : "0"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Top Category
                </p>
                {showSkeleton ? (
                  <Skeleton className="h-9 w-32" />
                ) : (
                  <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {articles[0]?.category || "N/A"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Updated</p>
                {showSkeleton ? (
                  <Skeleton className="h-9 w-20" />
                ) : (
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    Now
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Trending Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {showSkeleton ? (
            <SearchResultsSkeleton count={6} />
          ) : (
            <NewsList articles={articles} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default TrendingPage;
