import { createContext } from "react";

export interface ReadingSettings {
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  fontSize: number;
  fontFamily: "serif" | "sans";
  lineHeight: number;
  maxWidth: number;
  textAlign: "left" | "center" | "justify";
}

export type ReadingPreset =
  | "default"
  | "dark"
  | "sepia"
  | "highcontrast"
  | "reading";

export interface ReadingSettingsContextType {
  settings: ReadingSettings;
  updateSetting: <K extends keyof ReadingSettings>(
    key: K,
    value: ReadingSettings[K],
  ) => void;
  applyPreset: (preset: ReadingPreset) => void;
  resetSettings: () => void;
}

export const presets: Record<ReadingPreset, ReadingSettings> = {
  default: {
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    headingColor: "#000000",
    fontSize: 18,
    fontFamily: "serif",
    lineHeight: 1.8,
    maxWidth: 680,
    textAlign: "left",
  },
  dark: {
    backgroundColor: "#0f1115",
    textColor: "#e8eaed",
    headingColor: "#ffffff",
    fontSize: 18,
    fontFamily: "serif",
    lineHeight: 1.8,
    maxWidth: 680,
    textAlign: "left",
  },
  sepia: {
    backgroundColor: "#f4f1ea",
    textColor: "#5c4f3d",
    headingColor: "#3d3426",
    fontSize: 18,
    fontFamily: "serif",
    lineHeight: 1.8,
    maxWidth: 680,
    textAlign: "left",
  },
  highcontrast: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    headingColor: "#ffffff",
    fontSize: 20,
    fontFamily: "sans",
    lineHeight: 1.9,
    maxWidth: 680,
    textAlign: "left",
  },
  reading: {
    backgroundColor: "#fefefe",
    textColor: "#2d2d2d",
    headingColor: "#1a1a1a",
    fontSize: 20,
    fontFamily: "serif",
    lineHeight: 2.0,
    maxWidth: 600,
    textAlign: "left",
  },
};

export const ReadingSettingsContext =
  createContext<ReadingSettingsContextType | undefined>(undefined);
