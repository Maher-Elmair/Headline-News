import { useState } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Search, X, Filter, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewsList } from "@/features/article/NewsList";
import { TrendingList } from "@/components/shared/TrendingList";
import { EmptyState } from "@/components/shared/EmptyState";
import { SearchResultsSkeleton } from "@/components/shared/LoadingState";
import { Badge } from "@/components/ui/badge";
import { useSearchNews, useTrendingNews, newsKeys } from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";
import { categories } from "@/lib/constants";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Use React Query for search
  const { data: searchResults = [], isLoading: isSearching } = useSearchNews(
    searchQuery,
    searchQuery.length >= 2,
  );

  // Seed search results into per-article cache so ArticlePage can find them
  if (searchResults.length > 0) {
    searchResults.forEach((article) => {
      queryClient.setQueryData(newsKeys.article(article.slug), article);
    });
  }

  // Load trending articles
  const { data: trendingArticles = [] } = useTrendingNews();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  // Filter by category if selected
  const filteredResults =
    selectedCategory === "all"
      ? searchResults
      : searchResults.filter(
          (article) =>
            article.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <Search className="h-12 w-12 text-primary relative z-10" />
            </div>
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold">
                Search News
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Search through thousands of articles
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-24 h-14 text-lg border-2"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Category Filters */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Filter by:
              </span>
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {categories.slice(0, 6).map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category.toLowerCase()
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Search Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {searchQuery ? (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isSearching ? (
                        "Searching..."
                      ) : (
                        <>
                          {filteredResults.length}{" "}
                          {filteredResults.length === 1 ? "Result" : "Results"}
                        </>
                      )}
                    </h2>
                    {searchQuery && !isSearching && (
                      <p className="text-muted-foreground mt-1">
                        for "{searchQuery}"
                      </p>
                    )}
                  </div>
                  {filteredResults.length > 0 && (
                    <Badge variant="outline">
                      <SortAsc className="h-3 w-3 mr-1" />
                      Relevance
                    </Badge>
                  )}
                </div>

                {/* Results List */}
                {isSearching ? (
                  <SearchResultsSkeleton count={6} />
                ) : filteredResults.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <NewsList articles={filteredResults} />
                  </motion.div>
                ) : (
                  <EmptyState
                    type="search"
                    title="No results found"
                    description={`No articles found for "${searchQuery}". Try different keywords.`}
                  />
                )}
              </>
            ) : (
              <EmptyState
                type="search"
                title="Start searching"
                description="Enter keywords to search for articles"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <TrendingList articles={trendingArticles.slice(0, 5)} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
