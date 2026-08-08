"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

export default function QRImage({ value, size = 128 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(value, { width: size, margin: 1, color: { dark: "#000000", light: "#ffffff" } })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, [value, size]);

  if (!src) return <div style={{ width: size, height: size }} className="bg-gray-700 rounded animate-pulse" />;
  return <Image src={src} alt={value} width={size} height={size} className="rounded" unoptimized />;
}
