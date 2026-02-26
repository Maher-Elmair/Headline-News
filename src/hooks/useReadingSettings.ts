import { useContext } from "react";
import { ReadingSettingsContext } from "@/lib/reading-settings";

export function useReadingSettings() {
  const context = useContext(ReadingSettingsContext);
  if (context === undefined) {
    throw new Error("useReadingSettings must be used within ReadingSettingsProvider");
  }
  return context;
}
