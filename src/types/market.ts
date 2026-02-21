/**
 * Types for Finnhub API and market data.
 */

export interface FinnhubQuoteResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  isLoading?: boolean;
  error?: boolean;
}

export interface SymbolConfig {
  id: string;
  display: string;
  name: string;
  apiSymbol: string;
}
