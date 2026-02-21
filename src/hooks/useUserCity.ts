import { useQuery } from "@tanstack/react-query";
import axios, { isCancel } from "axios";

/**
 * Custom error class to identify when the user denies geolocation permission.
 * This helps in preventing retries for this specific case.
 */
class GeolocationPermissionDeniedError extends Error {
  constructor() {
    super("User denied Geolocation");
    this.name = "GeolocationPermissionDeniedError";
  }
}

/**
 * Fetches the user's city using:
 * 1. Geolocation API + reverse geocoding (Nominatim).
 * 2. IP-based fallback (ipapi.co) only if geolocation fails for a technical reason.
 *
 * This implementation does NOT rely on the Permissions API to decide whether to
 * attempt geolocation. The Permissions API returns unreliable results on
 * http://localhost in Chrome (permission reverts to 'denied' after refresh even
 * when the user selected "Allow always" or "Allow while visiting").
 *
 * Instead, we attempt geolocation directly and inspect the GeolocationPositionError
 * code to decide the correct next step:
 * - PERMISSION_DENIED (code 1): user explicitly denied - return null, no IP fallback.
 * - TIMEOUT (code 3) or POSITION_UNAVAILABLE (code 2): technical failure - use IP fallback.
 *
 * Caching strategy:
 * - On success via GPS: cache in localStorage for 1 hour.
 * - On success via IP fallback (technical GPS failure): cache in localStorage for 1 hour.
 * - On explicit denial: clear cache and return null.
 *
 * @param signal - AbortSignal from TanStack Query to cancel the request if needed
 * @returns The city name as a string, or null if the user denied permission
 */
const fetchUserCity = async (signal?: AbortSignal): Promise<string | null> => {
  // Check localStorage cache first to avoid unnecessary API calls
  const cachedCity = localStorage.getItem("userCity");
  if (cachedCity) return cachedCity;

  // Attempt precise geolocation directly without pre-checking the Permissions API.
  // The Permissions API is unreliable on http://localhost in Chrome.
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            maximumAge: 60000,
          });
        },
      );

      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat: latitude,
            lon: longitude,
            "accept-language": "en",
          },
          headers: {
            "User-Agent": "HeadlineApp/1.0",
          },
          signal,
        },
      );

      const address = response.data.address;
      const city = address?.city || address?.town || address?.village;

      if (city) {
        localStorage.setItem("userCity", city);
        console.log(`Location: ${city}`);
        return city;
      }
    } catch (error) {
      if (isCancel(error)) {
        throw error;
      }

      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED) {
          const isLocalhost =
            typeof window !== "undefined" &&
            (window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1" ||
              window.location.protocol === "http:");
          if (!isLocalhost) {
            localStorage.removeItem("userCity");
            console.warn("Location: User denied geolocation");
            return null;
          }
          // On localhost, PERMISSION_DENIED is often a false positive - fall through to IP fallback
        }
      }
    }
  }

  // IP-based fallback
  // never when the user explicitly denied permission.
  try {
    const response = await axios.get<{ city?: string }>(
      "https://ipapi.co/json/",
      { signal },
    );
    const city = response.data.city;
    if (city) {
      localStorage.setItem("userCity", city);
      console.log(`Location: ${city}`);
      return city;
    }
  } catch (error) {
    if (!isCancel(error)) {
      console.error("Location: Failed to determine city", error);
    } else {
      throw error;
    }
  }

  console.warn("Location: Unable to determine city");
  return null;
};

/**
 * Query options for fetching the user's city.
 */
export const userCityQueryOptions = () => ({
  queryKey: ["userCity"],
  queryFn: ({ signal }: { signal?: AbortSignal }) => fetchUserCity(signal),
  staleTime: 1000 * 60 * 60, // 1 hour - fetchUserCity handles cache invalidation internally
  retry: (failureCount: number, error: unknown) => {
    if (error instanceof GeolocationPermissionDeniedError) {
      return false;
    }
    return failureCount < 1;
  },
});

/**
 * Custom hook that provides the user's city with loading/error states.
 */
export const useUserCity = () => {
  return useQuery(userCityQueryOptions());
};
