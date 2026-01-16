"use client";

import React from "react";

type Props = {
  videoId: string; // p.ej. "123456789"
  title?: string; // accesibilidad
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  byline?: boolean;
  portrait?: boolean;
};

export default function VimeoPlayer({
  videoId,
  title = "Vimeo video",
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  byline = false,
  portrait = false,
}: Props) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    loop: loop ? "1" : "0",
    muted: muted ? "1" : "0",
    controls: controls ? "1" : "0",
    byline: byline ? "1" : "0",
    portrait: portrait ? "1" : "0",
    // Opcionales recomendados:
    playsinline: "1",
    dnt: "1", // Do Not Track
    app_id: "nextjs", // marca tu app en analytics
    responsive: "1",
  }).toString();

  const src = `https://player.vimeo.com/video/${videoId}?${params}`;

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
      <iframe
        src={src}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
        loading="lazy"
        style={{
          border: 0,
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {/* Noscript de cortesía */}
      <noscript>
        <a
          href={`https://vimeo.com/${videoId}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver en Vimeo
        </a>
      </noscript>
    </div>
  );
}
