import { Link } from "react-router";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Landmark,
  Briefcase,
  Cpu,
  FlaskConical,
  Heart,
  Trophy,
  Palette,
  MessageSquare,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryShowcaseSkeleton } from "@/components/shared/LoadingState";

const categoryData: Array<{
  name: string;
  slug: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}> = [
  {
    name: "World",
    slug: "world",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-500",
  },
  {
    name: "Politics",
    slug: "politics",
    icon: Landmark,
    gradient: "from-purple-500 to-pink-500",
    iconColor: "text-purple-500",
  },
  {
    name: "Business",
    slug: "business",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-500",
  },
  {
    name: "Technology",
    slug: "technology",
    icon: Cpu,
    gradient: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-500",
  },
  {
    name: "Science",
    slug: "science",
    icon: FlaskConical,
    gradient: "from-indigo-500 to-purple-500",
    iconColor: "text-indigo-500",
  },
  {
    name: "Health",
    slug: "health",
    icon: Heart,
    gradient: "from-rose-500 to-pink-500",
    iconColor: "text-rose-500",
  },
  {
    name: "Sports",
    slug: "sports",
    icon: Trophy,
    gradient: "from-orange-500 to-amber-500",
    iconColor: "text-orange-500",
  },
  {
    name: "Culture",
    slug: "culture",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    iconColor: "text-pink-500",
  },
  {
    name: "Opinion",
    slug: "opinion",
    icon: MessageSquare,
    gradient: "from-amber-500 to-yellow-500",
    iconColor: "text-amber-500",
  },
];

export function CategoryShowcase({ isLoading = false }: { isLoading?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    let animationFrameId: number;
    let isHovered = false;

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollPosition += 0.5; // Scroll speed

        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        // Reset to start when reaching end (infinite loop)
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start the auto-scroll animation
    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate categories for infinite scroll effect
  const duplicatedCategories = [
    ...categoryData,
    ...categoryData,
    ...categoryData,
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Explore by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Discover stories that matter to you
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            asChild
            className="font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg hover:shadow-xl"
          >
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Layers className="h-4 w-4 shrink-0" />
              <span>View All Categories</span>
              <ArrowRight className="h-4 w-4 fshrink-0" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Horizontal Scrollable Container with Auto-scroll */}
      {isLoading ? (
        <CategoryShowcaseSkeleton />
      ) : (
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-6 pt-3 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {duplicatedCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={`${category.slug}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: (index % categoryData.length) * 0.05,
                  }}
                  className="shrink-0"
                >
                  <Link to={`/category/${category.slug}`} className="block">
                    <div className="group relative overflow-hidden rounded-2xl bg-card border-2 border-border hover:border-primary/50 transition-all duration-500 w-56 h-48 shadow-lg hover:shadow-2xl hover:-translate-y-2">
                      {/* Background Gradient on Hover */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-[0.03]">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                            backgroundSize: "24px 24px",
                          }}
                        />
                      </div>

                      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        {/* Icon with Gradient Background */}
                        <div className="relative">
                          <div
                            className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-10 blur-xl rounded-full`}
                          />
                          <div
                            className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${category.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                          >
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div>
                          <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            <span className="font-medium">Explore</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-2"
      >
        <div className="h-1 w-1 rounded-full bg-primary/40 animate-pulse" />
        <p className="text-xs text-muted-foreground font-medium">
          Categories auto-scroll • Hover to pause
        </p>
        <div className="h-1 w-1 rounded-full bg-primary/40 animate-pulse" />
      </motion.div>
    </section>
  );
}