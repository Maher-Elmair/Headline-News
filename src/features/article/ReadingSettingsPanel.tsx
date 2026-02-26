import { useState } from 'react';
import { Settings, RotateCcw, Type, Palette, Layout, Sliders, FileText, Moon, Coffee, Zap, BookOpen, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useReadingSettings } from "@/hooks";
import { presets, type ReadingPreset, type ReadingSettings } from "@/lib/reading-settings";
import { ColorPicker } from '@/components/shared/ColorPicker';

function settingsMatchPreset(settings: ReadingSettings, presetId: ReadingPreset): boolean {
  const p = presets[presetId];
  return (
    p.backgroundColor === settings.backgroundColor &&
    p.textColor === settings.textColor &&
    p.headingColor === settings.headingColor &&
    p.fontSize === settings.fontSize &&
    p.fontFamily === settings.fontFamily &&
    Math.abs(p.lineHeight - settings.lineHeight) < 0.01 &&
    p.maxWidth === settings.maxWidth &&
    p.textAlign === settings.textAlign
  );
}

const presetConfigs: Array<{
  id: ReadingPreset;
  label: string;
  description: string;
  icon: typeof FileText;
}> = [
  { id: 'default', label: 'Default', description: 'Clean and classic', icon: FileText },
  { id: 'dark', label: 'Dark', description: 'Easy on the eyes', icon: Moon },
  { id: 'sepia', label: 'Sepia', description: 'Warm and cozy', icon: Coffee },
  { id: 'highcontrast', label: 'High Contrast', description: 'Maximum readability', icon: Zap },
  { id: 'reading', label: 'Reading Mode', description: 'Focused reading', icon: BookOpen },
];

export function ReadingSettingsPanel() {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { settings, updateSetting, applyPreset, resetSettings } = useReadingSettings();

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <SheetTrigger asChild>
        <div
          className="fixed bottom-6 left-6 z-40 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            variant="default"
            className={`rounded-full shadow-lg hover:shadow-xl transition-all ${
              isHovered ? 'pr-6 w-auto' : 'w-14'
            } h-14 flex items-center gap-3 overflow-hidden`}
          >
            <Settings className="h-6 w-6 shrink-0 transition-transform group-hover:rotate-45" />
            <span
              className={`whitespace-nowrap text-sm font-medium transition-all duration-300 hidden md:block ${
                isHovered ? 'opacity-100 max-w-50' : 'opacity-0 max-w-0'
              }`}
            >
              Reading Settings
            </span>
            <span className="sr-only">Reading settings</span>
          </Button>
        </div>
      </SheetTrigger>
      
      <SheetContent
        className="w-full sm:max-w-lg p-0 overflow-y-auto bg-background border-l border-border"
      >
        <SheetHeader className="sticky top-0 z-10 px-6 pt-5 pb-4 bg-background border-b-2 border-border shadow-sm relative">
          {/* Close button — pinned top-right */}
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-4 text-muted-foreground hover:text-foreground h-8 w-8"
              aria-label="Close reading settings"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>

          {/* Title row */}
          <SheetTitle className="font-serif text-2xl flex items-center gap-3 text-foreground pr-10">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden>
              <Sliders className="h-5 w-5" />
            </span>
            Reading Settings
          </SheetTitle>

          {/* Description + Reset */}
          <div className="flex items-center justify-between mt-2 pl-1">
            <SheetDescription className="text-sm text-muted-foreground">
              Customize typography, layout and colors for the article page.
            </SheetDescription>
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="shrink-0 ml-4 text-xs h-7 px-2.5 gap-1 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </SheetHeader>

        <div className="px-6 py-6 bg-background">
          <Tabs defaultValue="presets" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="presets" className="gap-2">
                <Sliders className="h-4 w-4" />
                Presets
              </TabsTrigger>
              <TabsTrigger value="custom" className="gap-2">
                <Settings className="h-4 w-4" />
                Custom
              </TabsTrigger>
            </TabsList>

            {/* Presets Tab */}
            <TabsContent value="presets" className="space-y-3 mt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Choose a preset theme. The selected preset is highlighted.
              </p>
              {presetConfigs.map((preset) => {
                const isSelected = settingsMatchPreset(settings, preset.id);
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all group relative overflow-hidden ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/30'
                        : 'border-border hover:border-primary/50 hover:bg-accent'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`${preset.label}: ${preset.description}. ${isSelected ? 'Currently selected.' : ''}`}
                  >
                    <div className="relative z-10 flex items-start gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <preset.icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold flex items-center gap-2">
                          {preset.label}
                          {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {preset.description}
                        </div>
                      </div>
                    </div>
                    {!isSelected && (
                      <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </TabsContent>

            {/* Custom Tab */}
            <TabsContent value="custom" className="space-y-6 mt-0">
              {/* Typography Section */}
              <section className="space-y-4 rounded-xl border border-border bg-card/50 p-4" aria-label="Typography options">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Type className="h-4 w-4 text-primary" />
                  Typography
                </div>

                {/* Font Family */}
                <div className="space-y-3">
                  <Label className="text-sm">Font Family</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={settings.fontFamily === 'serif' ? 'default' : 'outline'}
                      onClick={() => updateSetting('fontFamily', 'serif')}
                      className={`font-serif h-auto py-3 relative ${settings.fontFamily === 'serif' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                      aria-pressed={settings.fontFamily === 'serif'}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Aa</div>
                        <div className="text-xs mt-1">Serif</div>
                        {settings.fontFamily === 'serif' && <Check className="h-3.5 w-3.5 absolute top-2 right-2" />}
                      </div>
                    </Button>
                    <Button
                      variant={settings.fontFamily === 'sans' ? 'default' : 'outline'}
                      onClick={() => updateSetting('fontFamily', 'sans')}
                      className={`font-sans h-auto py-3 relative ${settings.fontFamily === 'sans' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                      aria-pressed={settings.fontFamily === 'sans'}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Aa</div>
                        <div className="text-xs mt-1">Sans</div>
                        {settings.fontFamily === 'sans' && <Check className="h-3.5 w-3.5 absolute top-2 right-2" />}
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Font Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Font Size</Label>
                    <span className="text-sm font-medium tabular-nums text-muted-foreground">
                      {settings.fontSize}px
                    </span>
                  </div>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]) => updateSetting('fontSize', value)}
                    min={14}
                    max={24}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                {/* Line Height */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Line Height</Label>
                    <span className="text-sm font-medium tabular-nums text-muted-foreground">
                      {settings.lineHeight.toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={[settings.lineHeight]}
                    onValueChange={([value]) => updateSetting('lineHeight', value)}
                    min={1.4}
                    max={2.2}
                    step={0.1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Compact</span>
                    <span>Relaxed</span>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Layout Section */}
              <section className="space-y-4 rounded-xl border border-border bg-card/50 p-4" aria-label="Layout options">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Layout className="h-4 w-4 text-primary" />
                  Layout
                </div>

                {/* Content Width */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Content Width</Label>
                    <span className="text-sm font-medium tabular-nums text-muted-foreground">
                      {settings.maxWidth}px
                    </span>
                  </div>
                  <Slider
                    value={[settings.maxWidth]}
                    onValueChange={([value]) => updateSetting('maxWidth', value)}
                    min={500}
                    max={900}
                    step={20}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Narrow</span>
                    <span>Wide</span>
                  </div>
                </div>

                {/* Text Alignment */}
                <div className="space-y-3">
                  <Label className="text-sm">Text Alignment</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={settings.textAlign === 'left' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('textAlign', 'left')}
                      className={`h-auto py-2 relative ${settings.textAlign === 'left' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                      aria-pressed={settings.textAlign === 'left'}
                    >
                      <div className="text-center">
                        <div className="text-xs">Left</div>
                        {settings.textAlign === 'left' && <Check className="h-3 w-3 absolute top-1.5 right-1.5" />}
                      </div>
                    </Button>
                    <Button
                      variant={settings.textAlign === 'center' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('textAlign', 'center')}
                      className={`h-auto py-2 relative ${settings.textAlign === 'center' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                      aria-pressed={settings.textAlign === 'center'}
                    >
                      <div className="text-center">
                        <div className="text-xs">Center</div>
                        {settings.textAlign === 'center' && <Check className="h-3 w-3 absolute top-1.5 right-1.5" />}
                      </div>
                    </Button>
                    <Button
                      variant={settings.textAlign === 'justify' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateSetting('textAlign', 'justify')}
                      className={`h-auto py-2 relative ${settings.textAlign === 'justify' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                      aria-pressed={settings.textAlign === 'justify'}
                    >
                      <div className="text-center">
                        <div className="text-xs">Justify</div>
                        {settings.textAlign === 'justify' && <Check className="h-3 w-3 absolute top-1.5 right-1.5" />}
                      </div>
                    </Button>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Colors Section */}
              <section className="space-y-4 rounded-xl border border-border bg-card/50 p-4" aria-label="Color options">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Palette className="h-4 w-4 text-primary" />
                  Colors
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <ColorPicker
                    label="Background"
                    value={settings.backgroundColor}
                    onChange={(color) => updateSetting('backgroundColor', color)}
                  />

                  <ColorPicker
                    label="Text"
                    value={settings.textColor}
                    onChange={(color) => updateSetting('textColor', color)}
                  />

                  <ColorPicker
                    label="Headings"
                    value={settings.headingColor}
                    onChange={(color) => updateSetting('headingColor', color)}
                  />
                </div>
              </section>

              <Separator />

              {/* Live Preview */}
              <section className="space-y-3 rounded-xl border border-border bg-card/50 p-4" aria-label="Live preview">
                <Label className="text-sm font-semibold">Live Preview</Label>
                <p className="text-xs text-muted-foreground">
                  This is how the article will look. Colors and typography apply to the article page below.
                </p>
                <div
                  className="p-6 rounded-lg border-2 border-border"
                  style={{
                    backgroundColor: settings.backgroundColor,
                    color: settings.textColor,
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    fontFamily: settings.fontFamily === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)',
                    textAlign: settings.textAlign,
                  }}
                >
                  <h4
                    style={{ color: settings.headingColor }}
                    className="font-bold mb-3"
                  >
                    Sample Heading
                  </h4>
                  <p>
                    This is how your article text will appear with the current settings. 
                    Adjust the controls above to find your perfect reading experience.
                  </p>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}