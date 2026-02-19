import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export function usePageLoading(loadingDuration: number = 800) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Trigger loading state change during render when path changes
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setIsLoading(true);
  }

  useEffect(() => {
    // Hide loader after duration
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingDuration);
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingDuration]);

  return isLoading;
}
