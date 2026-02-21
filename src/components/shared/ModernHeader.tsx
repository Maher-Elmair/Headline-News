import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Moon, Sun, Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartSearch } from "./SmartSearch";
import { NavigationDrawer } from ".//NavigationDrawer";
import { LogoIcon } from "./LogoIcon";
import { useTheme } from "@/lib/theme";
import { motion } from "motion/react";
import { useUserCity } from "@/hooks";

export function ModernHeader() {
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Use the custom hook to get user's city
  const { data: userCity, isLoading , isError } = useUserCity();

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDrawerOpen(true)}
                className="rounded-full hover:bg-accent/50 transition-all"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* City & Time Info */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-primary text-lg leading-none">•</span>
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />

                {isLoading ? (
                  <Skeleton className="h-4 w-16" /> 
                ) : isError || !userCity ? (
                  <span className="font-medium">Unknown</span>
                ) : (
                  <span className="font-medium">{userCity}</span>
                )}

                <span className="text-muted-foreground">{currentTime}</span>
              </div>
            </div>

            {/* Center Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group"
            >
              <div className="flex items-center gap-3">
                <LogoIcon />
                <span className="font-serif text-2xl font-bold pt-1 transition-colors">
                  Headline
                </span>
              </div>
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <SmartSearch />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-accent/50 transition-all"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <NavigationDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
