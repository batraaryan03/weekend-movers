"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = Array.from(
  { length: 30 },
  (_, i) => `/gallery/${String(i + 1).padStart(2, "0")}.jpg`
);

// Alternate aspect ratios for masonry rhythm
const heights = ["h-[280px]", "h-[360px]", "h-[320px]", "h-[400px]", "h-[300px]"];

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

  // Keyboard navigation
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
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FFB624] font-semibold text-sm tracking-widest uppercase mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-[56px] font-semibold text-[#011936] tracking-tight leading-tight">
            Our Recent Moves
          </h2>
        </div>

        {/* Masonry grid — CSS columns */}
        <div className="columns-2 md:columns-3 gap-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
            >
              <div
                className={`relative overflow-hidden ${heights[i % heights.length]} bg-gray-100`}
              >
                <img
                  src={src}
                  alt={`Move ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/50 text-sm font-medium tracking-wide z-10">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); lbPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <img
            src={galleryImages[lightboxIndex]}
            alt={`Move ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
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
