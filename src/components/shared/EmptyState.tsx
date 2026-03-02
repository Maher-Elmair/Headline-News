import { motion, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { Search, FileText, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface EmptyStateProps {
  type?: "search" | "category" | "general";
  title?: string;
  description?: string;
}

const configs = {
  search: {
    Icon: Search,
    defaultTitle: "No results found",
    defaultDescription:
      "Try different keywords or explore our trending topics below.",
    cta: { label: "Back to Home", to: "/" },
    label: "Search",
  },
  category: {
    Icon: FileText,
    defaultTitle: "Content is being updated",
    defaultDescription:
      "New articles will be available soon. Explore other categories in the meantime.",
    cta: { label: "Browse All News", to: "/" },
    label: "Category",
  },
  general: {
    Icon: Clock,
    defaultTitle: "Content coming soon",
    defaultDescription:
      "We're curating the best stories for you. Check back shortly.",
    cta: { label: "Go to Homepage", to: "/" },
    label: "Notice",
  },
} as const;

/* Floating particle dots */
const PARTICLES = [
  { cx: "12%", cy: "18%", delay: 0 },
  { cx: "85%", cy: "12%", delay: 0.4 },
  { cx: "78%", cy: "75%", delay: 0.8 },
  { cx: "8%", cy: "80%", delay: 1.2 },
  { cx: "50%", cy: "6%", delay: 0.6 },
  { cx: "92%", cy: "48%", delay: 1.0 },
];

/* Shared easing as a named string — avoids the number[] TS error */
const EASE = "easeOut" as const;

export function EmptyState({
  type = "general",
  title,
  description,
}: EmptyStateProps) {
  const shouldReduce = useReducedMotion();
  const { Icon, defaultTitle, defaultDescription, cta, label } = configs[type];

  const displayTitle = title ?? defaultTitle;
  const displayDescription = description ?? defaultDescription;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: EASE } satisfies Transition,
  });

  const ringTransition = (delay: number): Transition => ({
    delay,
    duration: 0.7,
    ease: EASE,
  });

  return (
    <div className="relative flex flex-col items-center justify-center py-28 text-center overflow-hidden select-none isolate">
      {/* ── Grid pattern overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-96 w-96 rounded-full bg-primary/10 blur-[80px]" />
      </div>

      {/* ── Concentric rings ── */}
      {[56, 72, 88].map((size, i) => (
        <motion.div
          key={size}
          aria-hidden
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={ringTransition(0.08 * i)}
          className="absolute rounded-full border border-primary/15"
          style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
        />
      ))}

      {/* ── Floating particles ── */}
      {!shouldReduce &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-primary opacity-40"
            style={{ left: p.cx, top: p.cy }}
            animate={{ y: [0, -8, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              delay: p.delay,
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* ── Icon container ── */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, type: "spring", bounce: 0.3 }}
        className="relative z-10 mb-10"
      >
        {/* Layered glow halos */}
        <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl scale-150" />
        <div className="absolute inset-0 rounded-3xl bg-primary/8 blur-xl scale-125" />

        {/* Icon box — glass card */}
        <div className="relative rounded-3xl border border-primary/20 bg-linear-to-br from-primary/15 via-primary/5 to-transparent p-8 shadow-2xl backdrop-blur-md">
          {/* Inner top shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent rounded-t-3xl" />
          <Icon className="h-11 w-11 text-primary" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* ── Eyebrow badge ── */}
      <motion.div {...fade(0.28)} className="relative z-10 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-linear-to-r from-primary/10 via-primary/5 to-transparent px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary opacity-80" />
          {label}
        </span>
      </motion.div>

      {/* ── Title ── */}
      <motion.h3
        {...fade(0.36)}
        className="relative z-10 font-serif text-3xl md:text-4xl font-bold tracking-tight mb-2 leading-tight"
      >
        {displayTitle}
      </motion.h3>

      {/* ── Description ── */}
      <motion.p
        {...fade(0.44)}
        className="relative z-10 max-w-75 text-sm text-muted-foreground leading-relaxed mb-9"
      >
        {displayDescription}
      </motion.p>

      {/* ── CTA ── */}
      <motion.div {...fade(0.52)} className="relative z-10">
        <Button
          asChild
          size="lg"
          className="group rounded-full gap-2 px-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:gap-3"
        >
          <Link to={cta.to}>
            {cta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
