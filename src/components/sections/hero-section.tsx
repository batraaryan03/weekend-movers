"use client";

import { Phone } from "lucide-react";
import QuickQuoteForm from "./quick-quote-form";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background image — covers first 100vh ── */}
      <div className="absolute inset-0 z-0" style={{ height: "100vh" }}>
        <img
          src="/special/men-loading-item-to-truck.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full py-20">
        {/* ── Centered text block ── */}
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <p className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.22em] mb-4">
            Melbourne&apos;s #1 Rated Movers
          </p>

          {/* Headlines */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]">
            Your Move.
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFB624] tracking-tight leading-[1.08]">
            Our Weekend.
          </h1>

          {/* Description */}
          <p className="text-white text-base font-bold md:text-lg lg:text-xl mt-5 max-w-lg mx-auto text-nowrap text-center leading-relaxed">
            Melbourne&apos;s trusted local movers. <br /> Professional service,
            transparent pricing, <br />
            And weekend availability.
          </p>

          {/* Trust badge */}
          <div className="mt-6 flex justify-center">
            <img
              src="/special/rated-5-stars-by-melbourne-locals.png"
              alt="Rated 5 stars by Melbourne locals"
              className="h-48 md:h-56 w-auto"
            />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-7">
            <a href="tel:+61416828199" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#FFB624] text-[#011936] hover:bg-yellow-500 font-bold text-lg h-14 px-10 flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white hover:text-[#FFB624] font-medium text-lg py-3 transition-colors"
            >
              View Pricing →
            </a>
          </div>
        </div>

        {/* ── Video card — 16:9, centered, autoplay ── */}
        <div className="max-w-8xl mx-auto mt-10 md:mt-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl border border-gray-200/60 bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/truck-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="text-sm text-white/40 italic">
          For illustration purposes
        </div>

        {/* ── Quote form — centered below video ── */}
        <div className="max-w-md mx-auto mt-10 md:mt-12">
          <div className="bg-[#f8f9fa] p-6 w-full border border-gray-200">
            <h3 className="text-lg font-bold text-[#011936] mb-4 text-center">
              Get a Free Quote
            </h3>
            <QuickQuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
