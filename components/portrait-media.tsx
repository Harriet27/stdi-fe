"use client";

import { useState } from "react";
import type { StaticImageData } from "next/image";

interface PortraitMediaProps {
  image?: string | StaticImageData;
  alt: string;
  initials: string;
}

function resolveImageSrc(image?: string | StaticImageData): string | null {
  if (!image) return null;
  if (typeof image === "string") {
    const trimmed = image.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  return image.src || null;
}

export function PortraitMedia({ image, alt, initials }: PortraitMediaProps) {
  const [failed, setFailed] = useState(false);
  const src = resolveImageSrc(image);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        className="portrait-image"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        style={{
          display: "block",
          width: "auto",
          height: "270px",
          borderRadius: "25px",
        }}
      />
    );
  }

  return <span style={{ fontSize: "2.25rem", fontWeight: 600 }}>{initials}</span>;
}