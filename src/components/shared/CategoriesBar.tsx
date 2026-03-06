import { Link, useLocation } from 'react-router';
import { categories } from "@/lib/categories-data";

export function CategoriesBar() {
  const location = useLocation();

  const isActiveCategory = (category: string) => {
    return location.pathname === `/category/${category.toLowerCase()}`;
  };

  // Hide on article pages for cleaner reading experience
  if (location.pathname.startsWith('/article/')) {
    return null;
  }

  return (
    <div className="hidden md:block border-b border-border/40 bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80 sticky top-16 z-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 py-3">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={`
                px-4 py-2 whitespace-nowrap font-medium text-sm
                transition-all duration-200 relative group
                ${
                  isActiveCategory(category)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }
              `}
            >
              <span className="relative z-10">{category}</span>
              {/* Underline on hover and active */}
              <span 
                className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all
                  ${
                    isActiveCategory(category)
                      ? 'w-3/4'
                      : 'w-0 group-hover:w-3/4'
                  }
                `} 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
