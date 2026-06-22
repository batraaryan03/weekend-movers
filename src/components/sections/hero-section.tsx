"use client";

import { Phone, Star } from "lucide-react";
import QuickQuoteForm from "./quick-quote-form";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full py-20">
        {/* ── Centered text block ── */}
        <div className="text-center mb-12">
          {/* Eyebrow */}
          <p className="text-[#FFB624] font-semibold text-xs md:text-sm uppercase tracking-[0.22em] mb-4">
            Melbourne&apos;s #1 Rated Movers
          </p>

          {/* Headlines */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#011936] tracking-tight leading-[1.08]">
            Your Move.
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFB624] tracking-tight leading-[1.08]">
            Our Weekend.
          </h1>

          {/* Description */}
          <p className="text-[#011936]/60 text-base md:text-lg lg:text-xl mt-5 max-w-lg mx-auto leading-relaxed">
            Melbourne&apos;s trusted local movers. Professional service,
            transparent pricing, and weekend availability.
          </p>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFB624] text-[#FFB624]" />
              ))}
            </div>
            <span className="text-[#011936]/50 text-sm font-medium">
              Rated by Melbourne locals
            </span>
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
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[#011936] hover:text-[#FFB624] font-medium text-lg py-3 transition-colors"
            >
              View Pricing →
            </a>
          </div>
        </div>

        {/* ── Quote form — centered below text ── */}
        <div className="max-w-md mx-auto">
          <div className="bg-[#f8f9fa] p-6 w-full border border-gray-200">
            <h3 className="text-lg font-bold text-[#011936] mb-4 text-center">Get a Free Quote</h3>
            <QuickQuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
