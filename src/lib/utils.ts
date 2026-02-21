import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * In development, proxy external images through CORS proxy to avoid CORS blocks.
 * In production, return the original URL.
 */
export function getImageUrl(url: string | undefined): string | undefined {
  if (!url || !url.startsWith("http")) return url
  if (import.meta.env.PROD) return url
  return `https://corsproxy.io/?${encodeURIComponent(url)}`
}
