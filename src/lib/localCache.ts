// Cache version — increment this string whenever the Article shape changes
// to automatically invalidate all stored entries.
const CACHE_VERSION = "news_v1";

// Default max age: 30 minutes in milliseconds
const DEFAULT_MAX_AGE = 30 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Build a namespaced localStorage key
const buildKey = (key: string): string => `${CACHE_VERSION}_${key}`;

// Read a cached value from localStorage.
// Returns null if the entry is missing, expired, or unreadable.
export function getCached<T>(
  key: string,
  maxAgeMs: number = DEFAULT_MAX_AGE,
): T | null {
  try {
    const raw = localStorage.getItem(buildKey(key));
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    const age = Date.now() - entry.timestamp;

    if (age > maxAgeMs) {
      localStorage.removeItem(buildKey(key));
      return null;
    }

    return entry.data;
  } catch {
    // Corrupted entry — remove it silently
    localStorage.removeItem(buildKey(key));
    return null;
  }
}

// Write a value to localStorage with the current timestamp.
// Silently ignores errors (e.g. storage quota exceeded).
export function setCached<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(buildKey(key), JSON.stringify(entry));
  } catch {
    console.warn(`[localCache] Could not write "${key}" to localStorage.`);
  }
}

// Remove a single entry from localStorage.
export function removeCached(key: string): void {
  localStorage.removeItem(buildKey(key));
}

// Clear all cache entries managed by this utility (matching the current version).
export function clearAllCache(): void {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_VERSION)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
