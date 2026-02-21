/**
 * TanStack Query client and default options.
 */

import { QueryClient } from "@tanstack/react-query";

const CACHE_MAX_AGE = 30 * 60 * 1000;
const GC_TIME = 60 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_MAX_AGE,
      gcTime: GC_TIME,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const CACHE_MAX_AGE_MS = CACHE_MAX_AGE;
export const GC_TIME_MS = GC_TIME;
