import { useState } from "react";
import { motion, Reorder } from "motion/react";
import {
  Activity,
  TrendingUp,
  TrendingDown as TrendingDownIcon,
  GripVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  useMarketData,
  DEFAULT_SYMBOLS,
} from "@/lib/query";
import { MarketWatchLoadingSkeleton } from "@/components/shared/LoadingState";
import { type MarketData } from "@/types";

export function CompactMarketWatch() {
  // State for draggable items order
  const [orderedItems, setOrderedItems] = useState<MarketData[]>([]);

  // Fetch market data using custom hook
  const { marketData, hasErrors, allLoading } = useMarketData(DEFAULT_SYMBOLS);

  // Initialize ordered items when data is loaded
  if (orderedItems.length === 0 && marketData.length > 0) {
    setOrderedItems(marketData);
  }

  // Update ordered items when market data changes (preserve order)
  const updatedOrderedItems = orderedItems.map((orderedItem) => {
    const updated = marketData.find((item) => item.id === orderedItem.id);
    return updated || orderedItem;
  });

  return (
    <Card className="border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 p-4 border-b border-border/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-md rounded-full animate-pulse" />
              <Activity className="h-5 w-5 text-blue-500 relative z-10" />
            </div>
            <h3 className="font-serif text-base md:text-lg font-bold">
              Market Watch
            </h3>
          </div>
          {!hasErrors && !allLoading && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 text-xs px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded-full font-medium"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="hidden sm:inline">Live</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Market Items - Drag and Drop Design */}
      <CardContent className="p-2 sm:p-3 space-y-1.5">
        {allLoading ? (
          // Loading skeleton using LoadingState component
          <MarketWatchLoadingSkeleton count={10} />
        ) : (
          // Reorderable market items with smooth drag and drop
          <Reorder.Group
            axis="y"
            values={updatedOrderedItems}
            onReorder={setOrderedItems}
            className="space-y-1.5"
          >
            {updatedOrderedItems.map((item) => (
              <Reorder.Item key={item.id} value={item} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors border border-border/20 cursor-grab active:cursor-grabbing"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Drag Handle */}
                  <div className="shrink-0">
                    <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                  </div>

                  {/* Left: Symbol & Name */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-bold text-xs sm:text-sm truncate">
                      {item.symbol}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {item.name}
                    </span>
                  </div>

                  {/* Right: Price & Change */}
                  {item.isLoading ? (
                    <div className="flex flex-col items-end gap-1">
                      <div className="h-3 bg-muted rounded w-16 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-12 animate-pulse" />
                    </div>
                  ) : item.error ? (
                    <div className="text-xs text-rose-500">Error</div>
                  ) : (
                    <div className="flex flex-col items-end gap-0.5 sm:gap-1 ml-2">
                      <span className="font-semibold text-xs sm:text-sm tabular-nums">
                        $
                        {item.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded tabular-nums ${
                          item.change >= 0
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-rose-500/10 text-rose-600"
                        }`}
                      >
                        {item.change >= 0 ? (
                          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : (
                          <TrendingDownIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        )}
                        <span>
                          {item.change >= 0 ? "+" : ""}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </CardContent>

      {/* Footer Info */}
      <div className="px-3 sm:px-4 py-2 bg-muted/30 border-t border-border/30">
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
          {hasErrors
            ? "Connection error - Retrying..."
            : "Updated every 10 seconds • Drag to reorder"}
        </p>
      </div>
    </Card>
  );
}
