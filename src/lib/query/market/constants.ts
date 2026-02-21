/**
 * Default market symbols for the ticker/watch.
 */

import type { SymbolConfig } from "@/types";

export const DEFAULT_SYMBOLS: SymbolConfig[] = [
  { id: "1", display: "SPX", name: "S&P 500", apiSymbol: "SPY" },
  { id: "2", display: "IXIC", name: "NASDAQ", apiSymbol: "QQQ" },
  { id: "3", display: "OIL", name: "Oil", apiSymbol: "USO" },
  { id: "4", display: "GOLD", name: "Gold", apiSymbol: "GLD" },
  { id: "5", display: "AAPL", name: "Apple", apiSymbol: "AAPL" },
  { id: "6", display: "MSFT", name: "Microsoft", apiSymbol: "MSFT" },
  { id: "7", display: "GOOGL", name: "Google", apiSymbol: "GOOGL" },
  { id: "8", display: "AMZN", name: "Amazon", apiSymbol: "AMZN" },
  { id: "9", display: "TSLA", name: "Tesla", apiSymbol: "TSLA" },
  { id: "10", display: "NVDA", name: "NVIDIA", apiSymbol: "NVDA" },
];
