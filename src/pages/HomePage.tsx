import { useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { FeaturedCarousel } from "@/features/home/FeaturedCarousel";
import { LatestNewsSection } from "@/features/home/LatestNewsSection";
import { TrendingList } from "@/features/home/TrendingList";
import { CompactMarketWatch } from "@/features/home/CompactMarketWatch";
import { EliteCategorySection } from "@/features/home/EliteCategorySection";
import { CategoryShowcase } from "@/features/home/CategoryShowcase";
import { Separator } from "@/components/ui/separator";
// import { Loader } from "@/components/shared/Loader";
import { usePageLoading } from "@/hooks";
import {
  useFeaturedNews,
  useTopNews,
  useTrendingNews,
  useNewsByCategory,
} from "@/lib/query";
import type { Article } from "@/types";

// ============================================================
// Filters out any article whose ID is already in usedIds,
// takes the first `limit` results, and adds their IDs to
// usedIds so subsequent sections cannot reuse them.
// The return type is explicitly Article[] so TypeScript can
// confirm the output matches the prop types of each section.
// ============================================================
function claimArticles(
  articles: Article[],
  usedIds: Set<string>,
  limit: number,
): Article[] {
  const available = articles.filter((a) => !usedIds.has(a.id));
  const claimed = available.slice(0, limit);
  claimed.forEach((a) => usedIds.add(a.id));
  return claimed;
}

function HomePage() {
  const isPageLoading = usePageLoading(800);

  const { data: featuredArticles = [], isLoading: featuredLoading } =
    useFeaturedNews();
  const { data: topArticles = [], isLoading: topLoading } = useTopNews();
  const { data: trendingArticles = [], isLoading: trendingLoading } =
    useTrendingNews();
  const { data: technologyArticles = [], isLoading: techLoading } =
    useNewsByCategory("technology");
  const { data: businessArticles = [], isLoading: businessLoading } =
    useNewsByCategory("business");
  const { data: scienceArticles = [], isLoading: scienceLoading } =
    useNewsByCategory("science");

  // ============================================================
  // A shared usedIds Set is passed through each claimArticles
  // call in priority order, guaranteeing zero article repetition
  // across the entire page.
  // ============================================================
  const sections = useMemo(() => {
    const usedIds = new Set<string>();

    // Priority 1 — Carousel (world news, claimed first)
    const carousel = claimArticles(featuredArticles, usedIds, 3);

    // Priority 2 — Latest News
    const latest = claimArticles(topArticles, usedIds, 7);

    // Priority 3 — Trending sidebar
    const trending = claimArticles(trendingArticles, usedIds, 5);

    // Priority 4-6 — Category sections
    const technology = claimArticles(technologyArticles, usedIds, 4);
    const business = claimArticles(businessArticles, usedIds, 4);
    const science = claimArticles(scienceArticles, usedIds, 4);

    return { carousel, latest, trending, technology, business, science };
  }, [
    featuredArticles,
    topArticles,
    trendingArticles,
    technologyArticles,
    businessArticles,
    scienceArticles,
  ]);

  const isCriticalLoading =
    isPageLoading || featuredLoading || topLoading || trendingLoading;

  useEffect(() => {
    if (!scienceLoading && sections.science.length < 4) {
      console.warn(
        `[HomePage] Science has only ${sections.science.length}/4 articles after strict filter and deduplication. ` +
          "The API may not have enough strictly-categorized science articles available right now.",
      );
    }
  }, [scienceLoading, sections.science.length]);

  if (isCriticalLoading) {
    // return <Loader message="Loading latest news and stories..." />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FeaturedCarousel articles={sections.carousel} />
        </motion.div>
      </section>

      {/* Latest News + Sidebar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <LatestNewsSection articles={sections.latest} />
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <TrendingList articles={sections.trending} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <CompactMarketWatch />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Category Sections */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <EliteCategorySection
          title="Technology"
          categorySlug="technology"
          articles={sections.technology}
          isLoading={techLoading}
          sectionNumber={1}
        />

        <EliteCategorySection
          title="Business"
          categorySlug="business"
          articles={sections.business}
          isLoading={businessLoading}
          sectionNumber={2}
        />

        <EliteCategorySection
          title="Science"
          categorySlug="science"
          articles={sections.science}
          isLoading={scienceLoading}
          sectionNumber={3}
        />
      </section>

      <Separator className="my-16" />

      {/* Category Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CategoryShowcase />
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;
