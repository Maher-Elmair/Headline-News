import { Link, useLocation } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { LogoIcon } from "./LogoIcon";
// import { categories } from "@/lib/mock-data";
import { categories } from "@/lib/categories-data";

/**
 * NavigationDrawer Component
 *
 * A separate, reusable component for the side navigation menu.
 * This component is responsible for displaying the hamburger menu content.
 *
 * Features:
 * - Clean separation of concerns
 * - Manages its own navigation logic
 * - Displays main pages and categories
 * - Highlights active routes
 *
 * @param open - Controls the drawer visibility
 * @param onOpenChange - Callback to update drawer state
 */

interface NavigationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
  { label: "Categories", path: "/categories" },
  { label: "Trending", path: "/trending" },
  { label: "About", path: "/about" },
];

export function NavigationDrawer({
  open,
  onOpenChange,
}: NavigationDrawerProps) {
  const location = useLocation();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[320px] sm:w-95 p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <SheetHeader className="px-8 pt-8 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              {/* Logo with hover animation */}
              <LogoIcon />
              <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu for Headline news
              </SheetDescription>
            </div>
          </SheetHeader>

          {/* Navigation Content */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            {/* Main Pages Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 px-4 mb-5">
                <div className="h-px flex-1 bg-linear-to-r from-primary/60 via-primary/30 to-transparent" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                  Main Pages
                </h3>
                <div className="h-px flex-1 bg-linear-to-l from-primary/60 via-primary/30 to-transparent" />
              </div>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      group relative block px-5 py-4 rounded-lg font-bold text-lg
                      transition-all duration-300 overflow-hidden
                      ${
                        isActive(item.path)
                          ? "text-white bg-primary shadow-lg shadow-primary/30"
                          : "text-foreground hover:text-primary hover:bg-accent/70 hover:pl-7"
                      }
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <span>{item.label}</span>
                      {isActive(item.path) && (
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                      )}
                    </div>
                    {!isActive(item.path) && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-8 bg-primary rounded-r-full transition-all duration-300" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-muted-foreground font-semibold">
                  OR EXPLORE
                </span>
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <div className="flex items-center gap-3 px-4 mb-5">
                <div className="h-px flex-1 bg-linear-to-r from-primary/60 via-primary/30 to-transparent" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                  Categories
                </h3>
                <div className="h-px flex-1 bg-linear-to-l from-primary/60 via-primary/30 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    onClick={handleLinkClick}
                    className={`
                      group block px-3 py-3 rounded-md font-semibold text-sm text-center
                      transition-all duration-300 border
                      ${
                        isActive(`/category/${category.toLowerCase()}`)
                          ? "text-white bg-primary border-primary shadow-md"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5 border-border hover:border-primary/50 hover:shadow-sm"
                      }
                    `}
                  >
                    <span className="block truncate">{category}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
