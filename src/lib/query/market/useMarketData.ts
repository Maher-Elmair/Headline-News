/**
 * Hook for market data. Fetches quotes via Finnhub and maps to MarketData.
 */

import { useMemo, useEffect, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import type { MarketData, FinnhubQuoteResponse, SymbolConfig } from "@/types";
import { fetchQuote } from "@/api/market";
import { DEFAULT_SYMBOLS } from "./constants";

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export function useMarketData(symbols: SymbolConfig[] = DEFAULT_SYMBOLS) {
  useEffect(() => {
    if (!API_KEY) {
      console.error("VITE_FINNHUB_API_KEY is not set in environment variables");
    }
  }, []);

  const queries = useQueries({
    queries: symbols.map(({ id, apiSymbol, display, name }) => ({
      queryKey: ["marketQuote", apiSymbol],
      queryFn: () => fetchQuote(apiSymbol),
      refetchInterval: 60000,
      staleTime: 30000,
      retry: (failureCount: number, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response
          ?.status;
        if (status === 429) return failureCount < 1;
        return failureCount < 2;
      },
      retryDelay: (attemptIndex: number, error: unknown) => {
        const status = (error as { response?: { status?: number } })?.response
          ?.status;
        return status === 429 ? 60000 : 1000 * (attemptIndex + 1);
      },
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

  const hasErrors = queries.some((q) => q.error);
  const allLoading = queries.every((q) => q.isLoading);
  const hasApiKey = !!API_KEY;

  const wasLoading = useRef(true);
  useEffect(() => {
    if (!hasApiKey) return;
    if (wasLoading.current && !allLoading) {
      wasLoading.current = false;
      const successCount = queries.filter((q) => q.data && !q.error).length;
      const failCount = queries.filter((q) => q.error).length;
      if (failCount > 0) {
        console.warn(
          `Market Watch: Fetch failed. Success: ${successCount}/${symbols.length}, Failed: ${failCount}`,
        );
      } else {
        console.log(
          `Market Watch: Data fetched successfully. ${successCount}/${symbols.length} symbols`,
        );
      }
    }
    if (allLoading) wasLoading.current = true;
  }, [allLoading, hasApiKey, queries, symbols.length]);

  return {
    marketData,
    hasErrors,
    allLoading,
    hasApiKey,
  };
}

export { DEFAULT_SYMBOLS } from "./constants";
