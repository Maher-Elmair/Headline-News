import { motion } from "motion/react";
import { FeaturedCarousel } from "@/features/home/FeaturedCarousel";
import { LatestNewsSection } from "@/features/home/LatestNewsSection";
import { TrendingList } from "@/features/home/TrendingList";
import { CompactMarketWatch } from "@/features/home/CompactMarketWatch";
import { EliteCategorySection } from "@/features/home/EliteCategorySection";
import { CategoryShowcase } from "@/features/home/CategoryShowcase";
import { Separator } from "@/components/ui/separator";
// import { Loader } from '@/components/shared/Loader';
import { usePageLoading } from "@/hooks/usePageLoading";
import { useTopNews, useTrendingNews } from "@/lib/queries";

function HomePage() {
  const isPageLoading = usePageLoading(800);
  const { data: articles = [], isLoading: articlesLoading } = useTopNews();
  const { data: trendingArticles = [], isLoading: trendingLoading } =
    useTrendingNews();

  const featuredArticles = articles.filter((a) => a.isFeatured).slice(0, 5);
  const latestArticles = articles.slice(0, 7);
  const technologyArticles = articles
    .filter((a) => a.category === "Technology")
    .slice(0, 4);
  const businessArticles = articles
    .filter((a) => a.category === "Business")
    .slice(0, 4);
  const scienceArticles = articles
    .filter((a) => a.category === "Science")
    .slice(0, 4);

  if (isPageLoading || articlesLoading || trendingLoading) {
    // return <Loader message="Loading latest news and stories..." />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section - Featured Carousel */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FeaturedCarousel articles={featuredArticles} />
        </motion.div>
      </section>

      {/* Latest News & Sidebar (Trending + Market Watch) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Latest News - 8/12 width */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <LatestNewsSection articles={latestArticles} />
            </motion.div>
          </div>

          {/* Sidebar - 4/12 width */}
          <div className="lg:col-span-4 space-y-8">
            {/* Sticky Container */}
            <div className="sticky top-24 space-y-8">
              {/* Trending List - First */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <TrendingList articles={trendingArticles.slice(0, 5)} />
              </motion.div>

              {/* Market Watch - Second */}
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

      {/* Category Sections - Elite Editorial Design */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {technologyArticles.length > 0 && (
          <EliteCategorySection
            title="Technology"
            articles={technologyArticles}
            categorySlug="technology"
          />
        )}

        {businessArticles.length > 0 && (
          <EliteCategorySection
            title="Business"
            articles={businessArticles}
            categorySlug="business"
          />
        )}

        {scienceArticles.length > 0 && (
          <EliteCategorySection
            title="Science"
            articles={scienceArticles}
            categorySlug="sHealthe"
          />
        )}
      </section>

      <Separator className="my-16" />

      {/* Category Showcase - All Categories Grid */}
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
