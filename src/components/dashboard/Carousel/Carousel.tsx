'use client';

import { useState, useRef } from 'react';

type CarouselProps = {
  children: React.ReactNode[];     // cada hijo es un slide
  className?: string;
  heightClass?: string;            // ej: "h-56 md:h-96"
  loop?: boolean;
};

export default function Carousel({
  children,
  className = '',
  heightClass = 'h-56 md:h-96',
  loop = true,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const total = children.length;

  // Swipe (opcional)
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
    startX.current = null;
  };

  const next = () => {
    if (index < total - 1) setIndex(index + 1);
    else if (loop) setIndex(0);
  };
  const prev = () => {
    if (index > 0) setIndex(index - 1);
    else if (loop) setIndex(total - 1);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Wrapper */}
      <div
        className={`relative overflow-hidden rounded-lg ${heightClass}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Track */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {children.map((child, i) => (
            <div key={i} className="w-full h-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-2 bottom-3 left-1/2">
        {children.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full border
              ${i === index ? 'bg-black/90 border-black' : 'bg-black/40 border-black/70'}
            `}
          />
        ))}
      </div>

      {/* Controles */}
      <button
        type="button"
        onClick={prev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-3 focus:outline-none"
        aria-label="Anterior"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/40">
          {/* ‹ */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-3 focus:outline-none"
        aria-label="Siguiente"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/40">
          {/* › */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
}
