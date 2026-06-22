"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = Array.from(
  { length: 30 },
  (_, i) => `/gallery/${String(i + 1).padStart(2, "0")}.jpg`
);

const row1 = galleryImages.slice(0, 15);
const row2 = galleryImages.slice(15, 30);

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lbPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);
  const lbNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : null
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, lbPrev, lbNext]);

  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-golden font-semibold text-sm tracking-widest uppercase mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-[56px] font-semibold text-[#011936] tracking-tight leading-tight">
            Our Recent Moves
          </h2>
        </div>
      </div>

      {/* Row 1 — scrolls LEFT infinitely */}
      <div className="group/row mb-4">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: "wm-gallery-left 200s linear infinite",
          }}
        >
          {[...row1, ...row1].map((src, i) => (
            <div
              key={`r1-${i}`}
              className="shrink-0 w-[280px] md:w-[380px] h-[200px] md:h-[260px] overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i % row1.length)}
            >
              <img
                src={src}
                alt={`Move ${(i % row1.length) + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT infinitely */}
      <div className="group/row">
        <div
          className="flex gap-4 w-max"
          style={{
            animation: "wm-gallery-right 240s linear infinite",
          }}
        >
          {[...row2, ...row2].map((src, i) => (
            <div
              key={`r2-${i}`}
              className="shrink-0 w-[280px] md:w-[380px] h-[200px] md:h-[260px] overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex((i % row2.length) + row1.length)}
            >
              <img
                src={src}
                alt={`Move ${(i % row2.length) + row1.length + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pause on hover via CSS */}
      <style>{`
        .group\/row:hover > div {
          animation-play-state: paused;
        }
      `}</style>

      {/* Lightbox — z-[200] to overlay everything including header */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-200 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-6 left-6 text-white/50 text-sm font-medium tracking-wide z-10">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); lbPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={galleryImages[lightboxIndex]}
            alt={`Move ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); lbNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}
