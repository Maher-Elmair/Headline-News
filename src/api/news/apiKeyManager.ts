/**
 * API Key Manager for NewsData.io
 * Clean Architecture approach to handle multiple fallback API keys.
 */
export class ApiKeyManager {
  private keys: string[] = [];
  private currentIndex: number = 0;

  constructor() {
    this.initializeKeys();
  }

  private initializeKeys(): void {
    // Load keys from Vite environment variables
    // Support standard key and numbered keys up to 5
    const primaryKey = import.meta.env.VITE_NEWSDATA_API_KEY;
    if (primaryKey) {
      this.keys.push(primaryKey);
    }

    // Try keys suffixed with 1 to 5
    for (let i = 1; i <= 5; i++) {
      const key = import.meta.env[`VITE_NEWSDATA_API_KEY_${i}`];
      if (key && !this.keys.includes(key)) {
        this.keys.push(key);
      }
    }

    if (this.keys.length === 0) {
      console.warn("No NewsData API keys found. Please add them to your .env.local");
    }
  }

  public getCurrentKey(): string {
    return this.keys[this.currentIndex] || "";
  }

  public rotateKey(): void {
    if (this.keys.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      console.warn(
        `[NewsApi] Rate limit reached. Rotating to API Key #${
          this.currentIndex + 1
        }/${this.keys.length}`
      );
    }
  }

  public getKeysCount(): number {
    return this.keys.length;
  }
}

// Export a singleton instance to be used across the app
export const apiKeyManager = new ApiKeyManager();
