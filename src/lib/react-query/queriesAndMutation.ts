import { useMemo, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  type MarketData,
  type SymbolConfig,
  type FinnhubQuoteResponse,
} from "@/types";
import axios from "axios";

// ========================================
//  React Query Hooks for Market Data
// ========================================

// Default symbols list - 10 stocks
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

// API configuration
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

// Create axios instance
const apiClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
});

// Fetch quote data from Finnhub API
const fetchQuote = async (apiSymbol: string): Promise<FinnhubQuoteResponse> => {
  try {
    const { data } = await apiClient.get<FinnhubQuoteResponse>("/quote", {
      params: {
        symbol: apiSymbol,
        token: API_KEY,
      },
    });

    // Validate data response
    if (!data || data.c === 0) {
      throw new Error("Invalid data received");
    }

    return data;
  } catch (error) {
    console.error(`Error fetching quote for ${apiSymbol}:`, error);
    throw error;
  }
};

// Custom hook for market data
export function useMarketData(symbols: SymbolConfig[] = DEFAULT_SYMBOLS) {
  // Check for API key on mount
  useEffect(() => {
    if (!API_KEY) {
      console.error("VITE_FINNHUB_API_KEY is not set in environment variables");
    }
  }, []);

  // Fetch data for all symbols using useQueries
  const queries = useQueries({
    queries: symbols.map(({ id, apiSymbol, display, name }) => ({
      queryKey: ["marketQuote", apiSymbol],
      queryFn: () => fetchQuote(apiSymbol),
      refetchInterval: 10000, // Refetch every 10 seconds
      staleTime: 5000,
      retry: 2,
      retryDelay: 1000,
      select: (data: FinnhubQuoteResponse): MarketData => ({
        id,
        symbol: display,
        name,
        price: data.c ?? 0,
        change: data.d ?? 0,
        changePercent: data.dp ?? 0,
        isLoading: false,
        error: false,
      }),
    })),
  });

  // Combine query results with loading/error states
  const marketData = useMemo(() => {
    return symbols.map((symbol, index) => {
      const query = queries[index];

      if (query.isLoading && !query.data) {
        return {
          id: symbol.id,
          symbol: symbol.display,
          name: symbol.name,
          price: 0,
          change: 0,
          changePercent: 0,
          isLoading: true,
          error: false,
        };
      }

      if (query.error) {
        return {
          id: symbol.id,
          symbol: symbol.display,
          name: symbol.name,
          price: 0,
          change: 0,
          changePercent: 0,
          isLoading: false,
          error: true,
        };
      }

      return (
        query.data ?? {
          id: symbol.id,
          symbol: symbol.display,
          name: symbol.name,
          price: 0,
          change: 0,
          changePercent: 0,
          isLoading: false,
          error: false,
        }
      );
    });
  }, [queries, symbols]);

  // Check if there are any errors or if all queries are loading
  const hasErrors = queries.some((q) => q.error);
  const allLoading = queries.every((q) => q.isLoading);
  const hasApiKey = !!API_KEY;

  return {
    marketData,
    hasErrors,
    allLoading,
    hasApiKey,
  };
}

// ============================================
// Additional Queries and Mutations Can Go Here
// ============================================
