import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// // ===================================================
// //  Article Card Loading Skeletons
// // ===================================================
export function ArticleCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <CardContent className="p-6 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

// ===================================================
//  Featured Carousel Loading Skeleton
// ===================================================
export function FeaturedCarouselSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card shadow-2xl">
      <div className="relative aspect-video sm:aspect-21/10 lg:aspect-21/9 overflow-hidden">
        {/* Background Image Skeleton */}
        <Skeleton className="absolute inset-0 w-full h-full" />

        {/* Gradient Overlay (just for visual consistency) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-end ml-10 p-6 sm:p-8 md:p-10 lg:p-16 max-w-5xl">
          {/* Category Badge Skeleton */}
          <div className="mb-3 sm:mb-4">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          {/* Title Skeletons (two lines) */}
          <div className="space-y-2 mb-3 sm:mb-4 lg:mb-6">
            <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-3/4" />
            <Skeleton className="h-8 sm:h-10 md:h-12 lg:h-14 w-1/2" />
          </div>

          {/* Excerpt Skeletons (hidden on small screens) */}
          <div className="hidden sm:block space-y-2 mb-4 sm:mb-6 max-w-3xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Meta Info Skeletons (author and date) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-5">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-full" />
          </div>
        </div>

        {/* Pagination Dots Skeletons */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 lg:right-16 flex items-center gap-2 sm:gap-2.5 z-10">
          <Skeleton className="w-8 sm:w-12 h-2.5 sm:h-3 rounded-full" />
          <Skeleton className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" />
          <Skeleton className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full" />
        </div>

        {/* Navigation Arrows Skeletons */}
        <div className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full" />
        </div>
        <div className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-10">
          <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ===================================================
//  Market Watch Loading Skeletons
// ===================================================
export function MarketItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/20 border border-border/20">
      <div className="flex items-center gap-2 flex-1">
        <Skeleton className="h-4 w-4 rounded" />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export function MarketWatchLoadingSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <MarketItemSkeleton key={i} />
      ))}
    </div>
  );
}

// ===================================================
//  Trending List Items Loading Skeleton
// ===================================================
export function TrendingListItemsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0 -mx-2 px-2 py-2"
        >
          {/* Ranking badge skeleton */}
          <div className="shrink-0">
            <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg" />
          </div>

          {/* Content skeleton */}
          <div className="flex-1 space-y-2 min-w-0">
            {/* Category badge skeleton */}
            <Skeleton className="h-5 w-16 rounded-full" />

            {/* Title lines */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Meta info skeleton */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-3 w-10 sm:w-12" />
              <Skeleton className="h-3 w-8 sm:w-10" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// ===================================================
//  Latest News Section Skeletons (content only, header excluded)
// ===================================================
export function FeaturedArticleCardSkeleton() {
  return (
    <Card className="overflow-hidden border-2">
      <div className="flex flex-col md:flex-row">
        {/* Image Skeleton - Left Side */}
        <div className="relative md:w-1/2 lg:w-[55%] aspect-16/10 md:aspect-auto bg-muted">
          <Skeleton className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-background/90 via-background/30 to-transparent" />
          {/* Category Badge Skeleton */}
          <div className="absolute top-4 left-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Content Skeleton - Right Side */}
        <div className="md:w-1/2 lg:w-[45%] p-6 md:p-6 lg:p-8 flex flex-col justify-center space-y-3 md:space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-5/6" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          {/* Meta Info Skeleton */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 md:h-8 md:w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          {/* Read More Link Skeleton */}
          <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function LatestNewsSectionSkeleton({
  gridCount = 4,
}: {
  gridCount?: number;
}) {
  return (
    <>
      {/* Featured Article Skeleton */}
      <FeaturedArticleCardSkeleton />

      {/* Grid Articles Skeleton - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: gridCount }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}

// ===================================================
//  Elite Editorial Design Skeletons
// ===================================================

// Skeleton for the main featured article
export function EliteMainArticleSkeleton() {
  return (
    <div className="relative aspect-21/24 sm:aspect-21/14 lg:aspect-21/12 overflow-hidden rounded-sm bg-muted">
      <Skeleton className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
        <Skeleton className="h-6 w-24 mb-4" /> {/* Category badge */}
        <Skeleton className="h-8 w-3/4 mb-2" /> {/* Title line 1 */}
        <Skeleton className="h-8 w-2/3 mb-4" /> {/* Title line 2 */}
        <Skeleton className="h-4 w-full mb-2" /> {/* Excerpt line 1 */}
        <Skeleton className="h-4 w-5/6 mb-6" /> {/* Excerpt line 2 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
            <Skeleton className="h-4 w-24" /> {/* Author name */}
          </div>
          <Skeleton className="h-4 w-16" /> {/* Date */}
          <Skeleton className="h-4 w-12" /> {/* Reading time */}
        </div>
      </div>
    </div>
  );
}

// Skeleton for a side article card
export function EliteSideArticleSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-card shadow-sm">
      <div className="flex gap-4 p-4">
        <Skeleton className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-sm" />
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Category badge */}
            <Skeleton className="h-5 w-full" /> {/* Title line 1 */}
            <Skeleton className="h-5 w-3/4" /> {/* Title line 2 */}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-3 w-20" /> {/* Author name */}
            <Skeleton className="h-3 w-8" /> {/* Reading time */}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ===================================================
//  Category Showcase Skeleton
// ===================================================
export function CategoryShowcaseSkeleton() {
  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
      <div
        className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 pt-3 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="shrink-0">
            <div className="w-56 h-48 rounded-2xl bg-card border-2 border-border overflow-hidden">
              <div className="p-6 h-full flex flex-col justify-between">
                {/* Icon Skeleton */}
                <div className="relative">
                  <Skeleton className="w-14 h-14 rounded-xl" />
                </div>
                {/* Text content Skeleton */}
                <div>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//==================================================
//==================================================
//==================================================
//==================================================
