import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Automatically scroll to top on route change or refresh
  useEffect(() => {
    // Disable browser's default scroll restoration ensures we stay at top on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-8 right-8 z-50 group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full group-hover:bg-primary/50 transition-all" />

          <Button
            onClick={scrollToTop}
            size="icon"
            className="relative h-14 w-14 rounded-full shadow-2xl bg-linear-to-br from-primary to-blue-600 hover:from-primary hover:to-blue-700 border-2 border-primary-foreground/20 transition-all group-hover:scale-110"
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.div>

            {/* Star effect on hover */}
            <motion.div
              className="absolute -top-1 -right-1"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
