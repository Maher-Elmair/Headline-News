import { useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { Globe } from "lucide-react";
import { NewsList } from "@/components/shared/NewsList";
import { EmptyState } from "@/components/shared/EmptyState";
import { Badge } from "@/components/ui/badge";
import { usePageLoading } from "@/hooks/usePageLoading";
import { useNewsByCategory } from "@/lib/query/news";
import { categories } from "@/lib/categories-data";
import { categoriesData } from "@/lib/categories-data";
import {
  CategoryPageContentSkeleton,
  StatValueSkeleton,
  CategoryNameSkeleton,
  ArticleCountSkeleton,
  CategoryDescriptionSkeleton,
} from "@/components/shared/LoadingState";

function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const isPageLoading = usePageLoading(800);

  const { data: articles = [], isLoading } = useNewsByCategory(category || "");

  if (!category) {
    return <Navigate to="/" replace />;
  }

  // Capitalize first letter for display
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Check if category exists
  const categoryExists = categories.some(
    (cat) => cat.toLowerCase() === category.toLowerCase(),
  );

  if (!categoryExists) {
    return <Navigate to="/404" replace />;
  }

  const metadata =
    categoriesData.find(
      (c) => c.slug.toLowerCase() === category.toLowerCase(),
    ) || categoriesData.find((c) => c.slug === "other");
  const CategoryIcon = metadata?.icon || Globe;

  const showSkeleton = isPageLoading || isLoading;

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="relative">
              <div
                className={`absolute inset-0 ${metadata?.color || "text-primary"} opacity-20 blur-2xl rounded-full`}
              />
              <CategoryIcon
                className={`h-16 w-16 ${metadata?.color || "text-primary"} relative z-10`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {showSkeleton ? (
                  <CategoryNameSkeleton />
                ) : (
                  <h1 className="font-serif text-4xl md:text-5xl font-bold">
                    {categoryName}
                  </h1>
                )}

                {showSkeleton ? (
                  <ArticleCountSkeleton />
                ) : (
                  <Badge variant="outline" className="text-sm">
                    {articles.length} Articles
                  </Badge>
                )}
              </div>

              {showSkeleton ? (
                <CategoryDescriptionSkeleton />
              ) : (
                metadata?.description && (
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {metadata.description}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Category Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-accent/30 rounded-xl border border-border/50">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Stories
              </p>
              {showSkeleton ? (
                <StatValueSkeleton />
              ) : (
                <p className="text-2xl font-bold">{articles.length}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Updated</p>
              {showSkeleton ? (
                <StatValueSkeleton />
              ) : (
                <p className="text-2xl font-bold">Today</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sources</p>
              {showSkeleton ? (
                <StatValueSkeleton />
              ) : (
                <p className="text-2xl font-bold">
                  {new Set(articles.map((a) => a.author.name)).size}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              {showSkeleton ? (
                <StatValueSkeleton />
              ) : (
                <p className="text-2xl font-bold capitalize">{categoryName}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        {showSkeleton ? (
          <CategoryPageContentSkeleton />
        ) : /* Articles List */
        articles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NewsList articles={articles} />
          </motion.div>
        ) : (
          <EmptyState
            type="category"
            title={`No ${categoryName} articles found`}
            description="Check back later for new stories in this category."
          />
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
