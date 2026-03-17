import { Link } from "react-router";
import { motion } from "motion/react";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Article } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal";
}

export function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/article/${article.slug}`} className="group block">
          <div className="space-y-3">
            <Badge variant="secondary" className="text-xs font-bold">
              {article.category}
            </Badge>
            <h3 className="font-serif text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium">
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime} min
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        <Link to={`/article/${article.slug}`} className="group">
          <Card className="overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full">
            <div className="flex flex-col sm:flex-row h-full">
              <div className="relative h-56 sm:h-auto sm:w-96 shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ImageWithFallback
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {article.isFeatured && (
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-primary/90 backdrop-blur-sm shadow-lg">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="flex-1 p-6 sm:p-8">
                <div className="space-y-4 h-full flex flex-col">
                  <Badge className="w-fit font-bold uppercase text-xs tracking-wider">
                    {article.category}
                  </Badge>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-2 mt-auto">
                    <div className="flex items-center gap-2">
                      <ImageWithFallback
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-border"
                      />
                      <span className="font-semibold">
                        {article.author.name}
                      </span>
                    </div>
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {article.readingTime} min read
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm pt-2 group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  // Default variant - Premium Card Design
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/article/${article.slug}`} className="group block h-full">
        <Card className="overflow-hidden border-2 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ImageWithFallback
              src={article.imageUrl}
              alt={article.title}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {article.isFeatured && (
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-primary/90 backdrop-blur-sm shadow-lg font-bold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute top-4 right-4 z-20">
              {/* Category Badge */}
              <Badge
                variant="secondary"
                className="text-xs font-bold uppercase tracking-wider shadow-md text-primary bg-card group-hover:bg-primary group-hover:text-white transition-all"
              >
                {article.category}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
            <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-3">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <ImageWithFallback
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-7 w-7 rounded-full ring-2 ring-border"
                />
                <span className="font-semibold">{article.author.name}</span>
              </div>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime} min
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
