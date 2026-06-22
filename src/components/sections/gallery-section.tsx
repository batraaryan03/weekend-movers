"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = Array.from({ length: 30 }, (_, i) => `/gallery/${String(i + 1).padStart(2, "0")}.jpg`);

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null));

  return (
    <section id="gallery" className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#011936] mb-4">Our Recent Moves</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">See our team in action handling furniture and homes with care.</p>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center hover:opacity-100 opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FFB624]"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center" onClick={closeLightbox}>
          {/* Close */}
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-[#FFB624] transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white hover:text-[#FFB624] transition-colors z-10">
            <ChevronLeft className="w-10 h-10" />
          </button>
          {/* Image */}
          <img
            src={galleryImages[lightboxIndex]}
            alt={`Gallery ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white hover:text-[#FFB624] transition-colors z-10">
            <ChevronRight className="w-10 h-10" />
          </button>
          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
            <span className="text-[#FFB624] font-bold text-lg">{lightboxIndex + 1}</span>
            <span className="mx-1 text-gray-400">of</span>
            {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
