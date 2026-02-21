/**
 * Finnhub API client and fetch functions.
 * Single responsibility: fetch market quote data.
 */

import axios from "axios";
import type { FinnhubQuoteResponse } from "@/types";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export const finnhubApiClient = axios.create({
  baseURL: FINNHUB_BASE_URL,
});

export async function fetchQuote(
  apiSymbol: string
): Promise<FinnhubQuoteResponse> {
  try {
    const { data } = await finnhubApiClient.get<FinnhubQuoteResponse>("/quote", {
      params: {
        symbol: apiSymbol,
        token: API_KEY,
      },
    });

    if (!data || data.c === 0) {
      throw new Error("Invalid data received");
    }

    return data;
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status !== 429) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`[Market Watch] Fetch failed for ${apiSymbol}: ${msg}`);
    }
    throw error;
  }
}
