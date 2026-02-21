import React, { useState } from "react";
import { ImageOff } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  if (didError) {
    return (
      // Use theme-aware bg and text colors so the fallback looks correct
      // in both light and dark modes.
      <div
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className ?? ""}`}
        style={style}
        aria-label={alt ?? "Image unavailable"}
        role="img"
      >
        <ImageOff className="w-12 h-12 opacity-40" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={getImageUrl(src)}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      referrerPolicy="no-referrer"
      {...rest}
    />
  );
}