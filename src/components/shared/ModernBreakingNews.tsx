import { Link } from "react-router";
import { AlertCircle, ChevronRight } from "lucide-react";
import { getBreakingNews } from "@/lib/mock-data";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

interface ModernBreakingNewsProps {
  isLoading?: boolean;
}

export function ModernBreakingNews({ isLoading = false }: ModernBreakingNewsProps) {
  const breakingNews = !isLoading ? getBreakingNews() : null;

  // If not loading and no breaking news, don't render anything
  if (!isLoading && !breakingNews) return null;

  return (
    <div className="border-b border-border/40 bg-card">
      <div className="mx-auto max-w-7xl">
        {!isLoading && breakingNews ? (
          <Link
            to={`/article/${breakingNews.slug}`}
            className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 group hover:bg-accent/30 transition-colors"
          >
            {/* Breaking News Badge */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="font-semibold text-sm uppercase tracking-wide text-primary">
                Breaking News
              </span>
            </div>

            {/* Separator */}
            <div className="w-px h-4 bg-border shrink-0" />

            {/* News Title */}
            <p className="flex-1 text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {breakingNews.title}
            </p>

            {/* Arrow Icon */}
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ) : (
          // Skeleton version (while loading)
          <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3">
            {/* Breaking News Badge (same as above) */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="font-semibold text-sm uppercase tracking-wide text-primary">
                Breaking News
              </span>
            </div>

            {/* Separator */}
            <div className="w-px h-4 bg-border shrink-0" />

            {/* Skeleton for title */}
            <div className="flex-1">
              <Skeleton className="h-5 w-full" />
            </div>

            {/* Arrow Icon (semi-transparent to indicate loading) */}
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}