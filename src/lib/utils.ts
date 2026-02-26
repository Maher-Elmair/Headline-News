import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * In development, proxy external images to avoid CORS and hotlink blocks (403).
 * In production, return the original URL.
 */
export function getImageUrl(url: string | undefined): string | undefined {
  if (!url || !url.startsWith("http")) return url;
  if (import.meta.env.PROD) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}`;
}
