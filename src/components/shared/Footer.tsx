import { Link } from "react-router";
import {
  Mail,
  Twitter,
  Linkedin,
  Facebook,
  Copyright,
  ExternalLink,
  Shield,
  Info,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LogoIcon } from "./LogoIcon";
import { categories } from "@/lib/categories-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-linear-to-b from-background to-muted/30 mt-auto overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="flex items-center gap-3">
                <LogoIcon />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight">
                    Headline
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
                    News Platform
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your gateway to curated news from trusted sources. We aggregate
              stories via our content partners API, delivering fresh
              perspectives and breaking updates with a clean, modern interface.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center group"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center group"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center group"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold">Popular Topics</h3>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Trending Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@newsdaily.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Contact Us
                </a>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Search Articles
                </Link>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  Follow on Twitter
                </a>
              </li>
              <li>
                <Link
                  to="/about#api-status"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  API Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 opacity-50" />

        {/* Bottom section with copyright and developer credit */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* Left: Branding + copyright block */}
          <div className="space-y-2">
            {/* First line: Copyright year + description + developer credit */}
            <p className="text-sm text-muted-foreground font-medium flex flex-wrap items-center justify-center md:justify-start gap-x-1">
              <span className="inline-flex items-center hover:text-foreground transition-colors duration-200 cursor-default group/copyright">
                <Copyright className="h-3.5 w-3.5 mr-0.5 group-hover/copyright:text-primary transition-colors" />
                <span className="group-hover/copyright:text-primary  transition-colors">
                  {currentYear}
                </span>
              </span>
              <span> Headline — Curated News via API</span>
              <span className="mx-1 text-border">•</span>
              <span>Developed by</span>
              <a
                href="https://github.com/Maher-Elmair"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors group/developer"
              >
                Maher-Elmair
                <ExternalLink className="h-3 w-3 opacity-0 group-hover/developer:opacity-100 transition-opacity duration-200" />
              </a>
            </p>
            {/* Second line: Description */}
            <p className="text-xs text-muted-foreground">
              Content automatically updated from our partners' feeds. We bring
              you the latest stories from across the web.
            </p>
          </div>
          {/* Right: Nav links — pill style */}
          <div className="flex items-center gap-2">
            <Link
              to="/privacy"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary bg-muted/40 hover:bg-muted/80 border border-border/50 hover:border-border px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <Shield className="h-3 w-3" />
              Privacy
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary bg-muted/40 hover:bg-muted/80 border border-border/50 hover:border-border px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <Info className="h-3 w-3" />
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
