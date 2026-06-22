"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const galleryImages = Array.from(
  { length: 30 },
  (_, i) => `/gallery/${String(i + 1).padStart(2, "0")}.jpg`
);

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  // Reset image loaded state when selection changes
  useEffect(() => {
    setImageLoaded(false);
  }, [selectedIndex]);

  const selectImage = (index: number) => {
    setSelectedIndex(index);
    const strip = thumbStripRef.current;
    if (strip) {
      const thumb = strip.children[index] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const prev = () => selectImage((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  const next = () => selectImage((selectedIndex + 1) % galleryImages.length);

  const openLightbox = () => setLightboxIndex(selectedIndex);
  const closeLightbox = () => {
    if (lightboxIndex !== null) setSelectedIndex(lightboxIndex);
    setLightboxIndex(null);
  };
  const lbPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  };
  const lbNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null));
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header — minimal */}
        <div className="mb-16">
          <p className="text-[#FFB624] font-semibold text-sm tracking-widest uppercase mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#011936] tracking-tight">
            Our Recent Moves
          </h2>
        </div>

        {/* Main image — full width, clean */}
        <div className="relative mb-8 group">
          <div
            className="relative w-full aspect-[16/9] bg-gray-50 overflow-hidden cursor-pointer"
            onClick={openLightbox}
          >
            {/* Subtle loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <img
              src={galleryImages[selectedIndex]}
              alt={`Move ${selectedIndex + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Navigation arrows — appear on hover, Apple-style */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-[#011936]" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
            >
              <ChevronRight className="w-5 h-5 text-[#011936]" />
            </button>

            {/* Counter — top right, subtle */}
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-[#011936]">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>

        {/* Thumbnail strip — horizontal scroll, Apple-style */}
        <div
          ref={thumbStripRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryImages.map((src, i) => (
            <button
              key={i}
              onClick={() => selectImage(i)}
              className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden transition-all duration-300 focus:outline-none ${
                selectedIndex === i
                  ? "ring-2 ring-[#FFB624] ring-offset-2 ring-offset-white"
                  : "opacity-40 hover:opacity-80"
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox — clean, dark, Apple-style */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close — top right */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Counter — top left */}
          <div className="absolute top-6 left-6 text-white/60 text-sm font-medium z-10">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>

          {/* Prev */}
          <button
            onClick={lbPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
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
            onClick={lbNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Thumbnail strip at bottom */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`flex-shrink-0 w-12 h-12 overflow-hidden transition-all duration-200 ${
                  lightboxIndex === i
                    ? "ring-2 ring-[#FFB624] opacity-100"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
