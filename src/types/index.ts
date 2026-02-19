// ===================================================
//  TypeScript Types for Finnhub API and Market Data
// ===================================================

// Define Finnhub API response type
export interface FinnhubQuoteResponse {
  c: number;   // current price
  d: number;   // change
  dp: number;  // percent change
  h: number;   // high
  l: number;   // low
  o: number;   // open
  pc: number;  // previous close
  t: number;   // timestamp
}

// Define market data interface used in UI
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

// Symbol configuration
export interface SymbolConfig {
  id: string;
  display: string;
  name: string;
  apiSymbol: string;
}

// ===================================================
//  TypeScript Types for News Articles
// ===================================================

// Define article type
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  views: number;
}