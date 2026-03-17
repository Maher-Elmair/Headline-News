import { Link } from "react-router";
import { AlertCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/types";

interface ModernBreakingNewsProps {
  article?: Article | null;
  isLoading?: boolean;
  isError?: boolean;
}

export function ModernBreakingNews({
  article,
  isLoading = false,
  isError = false,
}: ModernBreakingNewsProps) {
  const showSkeleton = isLoading || isError;
  if (!showSkeleton && !article) return null;

  return (
    <div className="border-b border-border/40 bg-card">
      <div className="mx-auto max-w-7xl">
        {!isLoading && article ? (
          <Link
            to={`/article/${article.slug}`}
            className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 group hover:bg-accent/30 transition-colors"
          >
            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="flex items-center justify-center gap-1.5 font-semibold text-sm uppercase tracking-wide text-primary">
                Breaking <span className="hidden sm:block">News</span>
              </span>
            </div>
            <div className="w-px h-4 bg-border shrink-0" />
            <p className="flex-1 text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {article.title}
            </p>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ) : (
          <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3" aria-busy="true">
            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="flex items-center justify-center gap-1.5 font-semibold text-sm uppercase tracking-wide text-primary">
                Breaking <span className="hidden sm:block">News</span>
              </span>
            </div>
            <div className="w-px h-4 bg-border shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-5 w-full" />
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}