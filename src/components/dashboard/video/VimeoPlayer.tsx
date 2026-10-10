"use client";

import { parseVimeoVideo } from "@/infrastructure/advertising/parseVimeoVideo";

type Props = {
  videoId: string;
  h?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  byline?: boolean;
  portrait?: boolean;
};

export default function VimeoPlayer({
  videoId,
  h,
  title = "Vimeo video",
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  byline = false,
  portrait = false,
}: Props) {
  const video = parseVimeoVideo(videoId, h);

  if (!video) {
    return <p role="alert">Enter a valid Vimeo ID or URL.</p>;
  }

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    loop: loop ? "1" : "0",
    muted: muted ? "1" : "0",
    controls: controls ? "1" : "0",
    byline: byline ? "1" : "0",
    portrait: portrait ? "1" : "0",
    playsinline: "1",
    dnt: "1",
  }).toString();

  const src = `${video.embedUrl}${video.hash ? "&" : "?"}${params}`;

  return (
    <div className="w-full min-w-0">
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      >
        <iframe
          key={src}
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            border: 0,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <a
        href={video.watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-sm text-blue-700 underline"
      >
        Open in Vimeo
      </a>
    </div>
  );
}
