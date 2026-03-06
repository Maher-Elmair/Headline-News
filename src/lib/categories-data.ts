/**
 * Static metadata for all news categories.
 * Centralised here so CategoriesPage and other components all share the same source.
 */
import {
  Globe,
  Landmark,
  Briefcase,
  Cpu,
  FlaskConical,
  Heart,
  Trophy,
  type LucideIcon,
  Clapperboard,
  Shapes,
} from "lucide-react";

export interface CategoryData {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
  longDescription: string;
}

export const categoriesData: CategoryData[] = [
  {
    name: "World",
    slug: "world",
    icon: Globe,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    description: "Breaking news and stories from around the globe",
    longDescription:
      "Stay informed with the latest international news, global politics, and worldwide events shaping our world today.",
  },
  {
    name: "Politics",
    slug: "politics",
    icon: Landmark,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    description: "Political analysis, policy updates, and election coverage",
    longDescription:
      "In-depth political reporting, policy analysis, and comprehensive coverage of elections and government affairs.",
  },
  {
    name: "Business",
    slug: "business",
    icon: Briefcase,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    description: "Markets, economy, and business insights",
    longDescription:
      "Expert analysis of financial markets, economic trends, corporate news, and business strategy from industry leaders.",
  },
  {
    name: "Technology",
    slug: "technology",
    icon: Cpu,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    description: "Tech innovations, startups, and digital transformation",
    longDescription:
      "Explore the latest in technology, from breakthrough innovations and startup stories to AI, gadgets, and digital trends.",
  },
  {
    name: "Science",
    slug: "science",
    icon: FlaskConical,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    description: "Scientific discoveries, research, and exploration",
    longDescription:
      "Discover groundbreaking research, space exploration, environmental science, and the latest scientific breakthroughs.",
  },
  {
    name: "Health",
    slug: "health",
    icon: Heart,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    description: "Health news, medical breakthroughs, and wellness",
    longDescription:
      "Comprehensive health coverage including medical research, wellness tips, mental health, and healthcare policy updates.",
  },
  {
    name: "Sports",
    slug: "sports",
    icon: Trophy,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    description: "Sports news, highlights, and athlete profiles",
    longDescription:
      "Follow your favorite teams and athletes with live scores, game highlights, sports analysis, and championship coverage.",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    icon: Clapperboard,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    description: "Arts, entertainment, and cultural trends",
    longDescription:
      "Explore arts, music, film, books, and cultural movements that shape our society and creative expression.",
  },
  {
    name: "Other",
    slug: "other",
    icon: Shapes,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    description: "Perspectives, editorials, and thought leadership",
    longDescription:
      "Thought-provoking editorials, expert Other, and diverse perspectives on the issues that matter most.",
  },
];

export const categories = categoriesData.map((c) => c.name);
