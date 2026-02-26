import React, { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme";
import {
  ReadingSettingsContext,
  presets,
  type ReadingSettings,
  type ReadingPreset,
} from "@/lib/reading-settings";

/** Convert hex (#rgb or #rrggbb) to rgba with given alpha. Falls back to textColor if invalid. */
function hexToRgba(hex: string, alpha: number): string {
  const m = hex.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return hex;
  let r: number, g: number, b: number;
  if (m[1].length === 3) {
    r = parseInt(m[1][0] + m[1][0], 16);
    g = parseInt(m[1][1] + m[1][1], 16);
    b = parseInt(m[1][2] + m[1][2], 16);
  } else {
    r = parseInt(m[1].slice(0, 2), 16);
    g = parseInt(m[1].slice(2, 4), 16);
    b = parseInt(m[1].slice(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Normalize color to #rrggbb for consistent storage and comparison. */
function normalizeHex(color: string): string {
  const m = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return color;
  if (m[1].length === 6) return "#" + m[1].toLowerCase();
  const r = m[1][0] + m[1][0], g = m[1][1] + m[1][1], b = m[1][2] + m[1][2];
  return "#" + r + g + b;
}

function getStoredSettings(): {
  mode: "theme";
  custom: null;
  appliedPreset: ReadingPreset | null;
  appliedAtTheme: string | null;
} | {
  mode: "custom";
  custom: ReadingSettings;
  appliedPreset: ReadingPreset | null;
  appliedAtTheme: string | null;
} {
  if (typeof window === "undefined") {
    return { mode: "theme", custom: null, appliedPreset: null, appliedAtTheme: null };
  }
  const hasCustom = localStorage.getItem("reading-settings-custom");
  const stored = localStorage.getItem("reading-settings");
  if (hasCustom && stored) {
    try {
      const custom = JSON.parse(stored) as ReadingSettings;
      return {
        mode: "custom",
        custom: {
          ...custom,
          backgroundColor: normalizeHex(custom.backgroundColor),
          textColor: normalizeHex(custom.textColor),
          headingColor: normalizeHex(custom.headingColor),
        },
        appliedPreset: null,
        appliedAtTheme: null,
      };
    } catch {
      return { mode: "theme", custom: null, appliedPreset: null, appliedAtTheme: null };
    }
  }
  return { mode: "theme", custom: null, appliedPreset: null, appliedAtTheme: null };
}

export function ReadingSettingsProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [state, setState] = useState<
    | { mode: "theme"; custom: null; appliedPreset: ReadingPreset | null; appliedAtTheme: string | null }
    | { mode: "custom"; custom: ReadingSettings; appliedPreset: ReadingPreset | null; appliedAtTheme: string | null }
  >(getStoredSettings);

  const themePreset = theme === "dark" ? presets.dark : presets.default;
  const settings =
    state.mode === "custom" && state.custom
      ? state.custom
      : state.appliedPreset && state.appliedAtTheme === theme
        ? presets[state.appliedPreset]
        : themePreset;

  useEffect(() => {
    const toStore =
      state.mode === "custom" && state.custom
        ? state.custom
        : state.appliedPreset && state.appliedAtTheme === theme
          ? presets[state.appliedPreset]
          : themePreset;
    if (state.mode === "custom" && state.custom) {
      localStorage.setItem("reading-settings", JSON.stringify(state.custom));
    } else {
      localStorage.setItem("reading-settings", JSON.stringify(toStore));
    }
    const root = document.documentElement;
    root.style.setProperty("--article-bg", settings.backgroundColor);
    root.style.setProperty("--article-text", settings.textColor);
    root.style.setProperty("--article-heading", settings.headingColor);
    root.style.setProperty("--article-text-muted", hexToRgba(settings.textColor, 0.7));
    root.style.setProperty("--article-font-size", `${settings.fontSize}px`);
    root.style.setProperty("--article-line-height", settings.lineHeight.toString());
    root.style.setProperty("--article-max-width", `${settings.maxWidth}px`);
    root.style.setProperty(
      "--article-font-family",
      settings.fontFamily === "serif" ? "var(--font-serif)" : "var(--font-sans)",
    );
    root.style.setProperty("--article-text-align", settings.textAlign);
  }, [settings, state.mode, state.custom, state.appliedPreset, state.appliedAtTheme, theme, themePreset]);

  const updateSetting = <K extends keyof ReadingSettings>(
    key: K,
    value: ReadingSettings[K],
  ) => {
    localStorage.setItem("reading-settings-custom", "true");
    let normalizedValue = value;
    if (
      (key === "backgroundColor" || key === "textColor" || key === "headingColor") &&
      typeof value === "string"
    ) {
      normalizedValue = normalizeHex(value) as ReadingSettings[K];
    }
    setState((prev) => ({
      mode: "custom",
      custom: {
        ...(prev.mode === "custom" && prev.custom ? prev.custom : themePreset),
        [key]: normalizedValue,
      },
      appliedPreset: null,
      appliedAtTheme: null,
    }));
  };

  const applyPreset = (preset: ReadingPreset) => {
    localStorage.removeItem("reading-settings-custom");
    setState({
      mode: "theme",
      custom: null,
      appliedPreset: preset,
      appliedAtTheme: theme,
    });
  };

  const resetSettings = () => {
    localStorage.removeItem("reading-settings-custom");
    setState({
      mode: "theme",
      custom: null,
      appliedPreset: null,
      appliedAtTheme: null,
    });
  };

  return (
    <ReadingSettingsContext.Provider
      value={{ settings, updateSetting, applyPreset, resetSettings }}
    >
      {children}
    </ReadingSettingsContext.Provider>
  );
}
