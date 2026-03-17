import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesPageSkeleton } from "@/components/shared/LoadingState";
import { usePageLoading } from "@/hooks/usePageLoading";
import { useCategoryArticleCounts } from "@/hooks/useCategoryArticleCounts";
import { categoriesData } from "@/lib/categories-data";

function CategoriesPage() {
  const isLoading = usePageLoading();
  const { counts, isLoading: countsLoading } = useCategoryArticleCounts();

  return (
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="relative overflow-hidden border-b border-border bg-linear-to-br from-background via-muted/20 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Explore Our Categories
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Dive deep into the topics that matter to you. From breaking world
              news to cutting-edge technology, discover stories across nine
              comprehensive categories.
            </p>
          </motion.div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--primary),transparent_70%)]" />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Categories Grid - conditionally shows skeleton or real content */}
        {isLoading ? (
          <CategoriesPageSkeleton />
        ) : (
          categoriesData.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 overflow-hidden">
                  <CardContent className="p-0">
                    <Link to={`/category/${category.slug}`} className="block">
                      <div className="flex flex-col md:flex-row">
                        {/* Icon Section - Fixed Height Issue */}
                        <div
                          className={`${category.bgColor} aspect-3/2 md:aspect-auto md:w-50 md:min-h-full md:self-stretch flex items-center justify-center relative overflow-hidden shrink-0`}
                        >
                          <div className="relative z-10">
                            <Icon
                              className={`h-16 w-16 md:h-20 md:w-20 ${category.color} group-hover:scale-110 transition-transform duration-300`}
                            />
                          </div>
                          <div className="absolute inset-0 bg-linear-to-br from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content Section */}
                        <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                              {category.name}
                            </h2>

                            {/* Article count badge — shows skeleton while loading,
                                "N/A" for unsupported categories, or the real count */}
                            {countsLoading &&
                            counts[category.name] === undefined ? (
                              <Skeleton className="h-5 w-20 shrink-0 rounded-full" />
                            ) : counts[category.name] === null ? (
                              <Badge
                                variant="outline"
                                className="shrink-0 text-muted-foreground"
                              >
                                N/A
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="shrink-0">
                                {counts[category.name]}{" "}
                                {counts[category.name] === 1
                                  ? "Article"
                                  : "Articles"}
                              </Badge>
                            )}
                          </div>

                          <p className="text-base text-muted-foreground mb-4">
                            {category.longDescription}
                          </p>

                          <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                            <span>Explore {category.name}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-muted-foreground mb-6">
              Use our powerful search to find articles across all categories
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Search Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default CategoriesPage;
