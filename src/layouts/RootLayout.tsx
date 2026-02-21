import { Outlet } from "react-router";
import { ModernHeader } from "@/components/shared/ModernHeader";
import { CategoriesBar } from "@/components/shared/CategoriesBar";
import { Footer } from "@/components/shared/Footer";
import { ModernBreakingNews } from "@/components/shared/ModernBreakingNews";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { useTopNews } from "@/lib/query";


export function RootLayout() {
  const { data: articles, isLoading } = useTopNews();
  const breakingArticle = articles?.[0] ?? null;
  
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Header section with logo and navigation */}
      <ModernHeader />
      {/* Categories bar */}
      <CategoriesBar />
      {/* Breaking news section */}
      <ModernBreakingNews article={breakingArticle} isLoading={isLoading} />
      {/* Main content area where nested routes will be rendered */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer section */}
      <Footer />
      {/* Scroll to top button and toaster for notifications */}
      <ScrollToTop />
      <Toaster />
    </div>
  );
}
