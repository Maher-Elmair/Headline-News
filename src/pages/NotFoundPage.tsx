import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Home,
  Search,
  TrendingUp,
  ArrowRight,
  Newspaper,
  FileQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { floatVariants } from "@/utils/variants";

function NotFoundPage() {
  // Get the navigate function from react-router
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative py-10 z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Animated Illustration */}
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Large 404 */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="font-serif text-[140px] md:text-[200px] font-black leading-none">
                  <span className="text-primary/20">4</span>
                  <span className="text-primary/30">0</span>
                  <span className="text-primary/20">4</span>
                </h1>
              </motion.div>

              {/* Floating icons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -left-8 top-1/4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Newspaper className="h-8 w-8 text-primary/60" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -right-8 top-1/3"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileQuestion className="h-7 w-7 text-primary/60" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-6 w-6 text-primary/60" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 mb-12"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold">
              Lost in the Headlines?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Looks like this story doesn't exist. The page you're looking for
              may have been moved, deleted, or never existed in the first place.
            </p>
            <p className="text-base text-muted-foreground">
              But don't worry—there's plenty of great content waiting for you!
            </p>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
          >
            <Link
              to="/"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                  <Home className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Go Home
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start fresh from the homepage
                </p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              to="/search"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Search
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find what you're looking for
                </p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              to="/trending"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  Trending
                </h3>
                <p className="text-sm text-muted-foreground">
                  See what's popular now
                </p>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button size="lg" onClick={() => navigate(-1)} className="group">
              Go Back{" "}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground">
              Need help? Browse our{" "}
              <Link
                to="/categories"
                className="text-primary hover:underline font-medium"
              >
                categories
              </Link>{" "}
              or check out the{" "}
              <Link
                to="/about"
                className="text-primary hover:underline font-medium"
              >
                about page
              </Link>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFoundPage;
