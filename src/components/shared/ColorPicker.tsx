import { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Palette, Check } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

/** Normalize to #rrggbb for native color input and consistent display. */
function toSixDigitHex(color: string): string {
  const m = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return color;
  if (m[1].length === 6) return "#" + m[1].toLowerCase();
  const r = m[1][0] + m[1][0], g = m[1][1] + m[1][1], b = m[1][2] + m[1][2];
  return "#" + r + g + b;
}

const presetColors = [
  '#ffffff', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373',
  '#525252', '#404040', '#262626', '#171717', '#0a0a0a', '#000000',
  '#fef2f2', '#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#dc2626',
  '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706',
];

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const normalizedValue = toSixDigitHex(value);
  const [showPicker, setShowPicker] = useState(false);
  const [hexInput, setHexInput] = useState(normalizedValue);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHexInput(toSixDigitHex(value));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    const six = toSixDigitHex(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(six)) {
      onChange(six);
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-border bg-card hover:border-primary/60 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-md border-2 border-border shadow-sm transition-transform group-hover:scale-105"
            style={{ backgroundColor: normalizedValue }}
          />
          <div className="flex flex-col items-start">
            <Label className="text-sm font-medium pointer-events-none">{label}</Label>
            <span className="text-xs text-muted-foreground font-mono">{normalizedValue}</span>
          </div>
        </div>
        <Palette className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      {showPicker && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border-2 border-border rounded-lg shadow-2xl p-4 space-y-4">
          {/* Main Color Input */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Color
            </Label>
            <input
              type="color"
              value={normalizedValue}
              onChange={(e) => onChange(toSixDigitHex(e.target.value))}
              className="w-full h-24 rounded-md border-2 border-border cursor-pointer"
            />
          </div>

          {/* Hex Input */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Hex Code
            </Label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 text-sm font-mono bg-background border-2 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="#000000"
              maxLength={7}
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Colors
            </Label>
            <div className="grid grid-cols-6 gap-1.5">
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange(color)}
                  className="relative h-8 w-full rounded border-2 transition-all hover:scale-110 hover:z-10"
                  style={{
                    backgroundColor: color,
                    borderColor: normalizedValue === toSixDigitHex(color) ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  }}
                  title={color}
                >
                  {normalizedValue === toSixDigitHex(color) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary drop-shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
