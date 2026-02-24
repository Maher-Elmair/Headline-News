import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/types";
import { formatDateFull } from "@/lib/dateUtils";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { FeaturedCarouselSkeleton } from "@/components/shared/LoadingState";

interface FeaturedCarouselProps {
  articles: Article[];
  isLoading?: boolean;
  isError?: boolean;
}

export function FeaturedCarousel({
  articles,
  isLoading = false,
  isError = false,
}: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slideDuration = 0.6;
  const autoPlayInterval = 6000;

  const displayArticles = articles.slice(0, 3);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = displayArticles.length - 1;
        if (nextIndex >= displayArticles.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [displayArticles.length]
  );

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered && displayArticles.length > 1) {
      const timer = setInterval(() => {
        paginate(1);
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }
  }, [isHovered, displayArticles.length, paginate]);

  // Show skeleton while loading or on error to keep stable layout (best practice for failed fetch)
  if (isLoading || isError) {
    return <FeaturedCarouselSkeleton />;
  }

  // Nothing to render if no articles are available
  if (displayArticles.length === 0) {
    return null;
  }

  const currentArticle = displayArticles[currentIndex];

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-card shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video sm:aspect-21/10 lg:aspect-21/9 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 1000 : -1000,
                opacity: 0,
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1,
              },
              exit: (dir: number) => ({
                zIndex: 0,
                x: dir < 0 ? 1000 : -1000,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 30 },
              opacity: { duration: slideDuration },
            }}
            className="absolute inset-0"
          >
            <Link
              to={`/article/${currentArticle.slug}`}
              className="block h-full group"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ImageWithFallback
                    src={currentArticle.imageUrl}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-end ml-10 p-6 sm:p-8 md:p-10 lg:p-16 max-w-4xl">
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3 sm:mb-4"
                >
                  <Badge className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold uppercase tracking-wider bg-primary/90 text-white border border-primary hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/50">
                    {currentArticle.category}
                  </Badge>
                </motion.div>

                {/* Title - clamped to 2 lines max */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight line-clamp-2 group-hover:text-primary-foreground transition-colors"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
                >
                  {currentArticle.title}
                </motion.h2>

                {/* Excerpt - clamped to 3 lines with a narrower max-width for readability */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="hidden sm:block text-white/95 text-sm md:text-base lg:text-lg mb-4 sm:mb-6 line-clamp-3 max-w-2xl leading-relaxed"
                  style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
                >
                  {currentArticle.excerpt}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-5 text-xs sm:text-sm text-white/90"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                    <span className="font-medium truncate max-w-30 sm:max-w-none">
                      {currentArticle.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                    <span className="truncate">
                      {formatDateFull(currentArticle.publishedAt)}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Slide Indicator Dots */}
              {displayArticles.length > 1 && (
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 lg:right-16 flex items-center gap-2 sm:gap-2.5 z-10">
                  {displayArticles.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        goToSlide(index);
                      }}
                      className={`transition-all rounded-full backdrop-blur-md ${
                        index === currentIndex
                          ? "w-8 sm:w-12 h-2.5 sm:h-3 bg-white shadow-xl shadow-white/30"
                          : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next Buttons */}
        {displayArticles.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(-1)}
              className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 transition-all shadow-xl"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(1)}
              className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 transition-all shadow-xl"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}