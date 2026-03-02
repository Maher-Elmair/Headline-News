import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchNews, useTrendingNews, newsKeys } from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";
import type { Article } from "@/types";

interface SmartSearchProps {
  onClose?: () => void;
}

export function SmartSearch({ onClose }: SmartSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches] = useState<string[]>([
    "Technology",
    "Climate",
    "Business",
  ]);
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const { data: searchResults = [] } = useSearchNews(
    query,
    isOpen && query.length >= 2,
  );
  const { data: trendingArticles = [] } = useTrendingNews();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    if (onClose) onClose();
  }, [onClose]);

  // Handle keyboard shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }

      // Close on Escape if open
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };

    // Use capture phase on window to intercept the event before the browser
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [isOpen, handleClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, handleClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Seed search results into per-article cache so ArticlePage can find them
  useEffect(() => {
    if (searchResults.length > 0) {
      searchResults.forEach((article) => {
        queryClient.setQueryData(newsKeys.article(article.slug), article);
      });
    }
  }, [searchResults, queryClient]);

  const results = (searchResults as Article[]).slice(0, 10);
  const trending = (trendingArticles as Article[]).slice(0, 3);

  return (
    <>
      {/* Search Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="rounded-full hover:bg-accent/50 transition-all"
        title="Search (Ctrl+K)"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Search Panel */}
            <motion.div
              ref={searchPanelRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Search articles, topics, authors..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-12 pr-12 h-12 text-lg border-0 focus-visible:ring-0"
                    />
                    {query && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Search Results or Suggestions */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {query.length >= 2 ? (
                    // Search Results
                    <div className="p-4">
                      {results.length > 0 ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">
                            {results.length} results found
                          </p>
                          <div className="space-y-3">
                            {results.map((article) => (
                              <Link
                                key={article.id}
                                to={`/article/${article.slug}`}
                                onClick={handleClose}
                                className="block p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                              >
                                <h4 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                  {article.title}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {article.category}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {article.readingTime} min read
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <Link
                            to={`/search?q=${encodeURIComponent(query)}`}
                            onClick={handleClose}
                            className="block mt-4 text-center py-2 text-sm text-primary hover:underline"
                          >
                            View all results →
                          </Link>
                        </>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          No results found for "{query}"
                        </p>
                      )}
                    </div>
                  ) : (
                    // Suggestions when no query
                    <div className="p-4 space-y-6">
                      {/* Recent Searches */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-medium">
                            Recent Searches
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search) => (
                            <button
                              key={search}
                              onClick={() => setQuery(search)}
                              className="px-3 py-1.5 text-sm bg-accent/50 hover:bg-accent rounded-full transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Trending Articles */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-medium">Trending Now</h3>
                        </div>
                        <div className="space-y-3">
                          {trending.map((article) => (
                            <Link
                              key={article.id}
                              to={`/article/${article.slug}`}
                              onClick={handleClose}
                              className="block p-3 rounded-lg hover:bg-accent/50 transition-colors group"
                            >
                              <h4 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {article.views.toLocaleString()} views
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-accent/30">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Press ESC to close</span>
                    <span>Ctrl+K to search</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
