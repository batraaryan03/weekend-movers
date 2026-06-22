"use client";

import { Phone, Star } from "lucide-react";
import QuickQuoteForm from "./quick-quote-form";
import dynamic from "next/dynamic";

const TruckScene = dynamic(() => import("@/components/three/truck-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[#FFB624] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm font-medium tracking-wide">
          Loading 3D model...
        </p>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/assets/hero-truck.png"
          alt="Weekend Movers Truck"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011936] via-[#011936]/70 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          {/* Left content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            {/* Brand slogan */}
            <div className="mb-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                Your Move.
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFB624] tracking-tight leading-tight">
                Our Weekend.
              </h1>
            </div>

            <p className="text-white/80 text-lg md:text-xl max-w-lg leading-relaxed">
              Melbourne&apos;s trusted local movers. Professional service, transparent pricing, and weekend availability.
            </p>

            {/* Star rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFB624] text-[#FFB624]" />
                ))}
              </div>
              <span className="text-white/70 text-sm font-medium">
                Rated by Melbourne locals
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start items-center mt-2">
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
                className="text-white hover:text-[#FFB624] font-medium text-lg py-3 transition-colors"
              >
                View Pricing →
              </a>
            </div>
          </div>

          {/* Right — 3D Truck Model */}
          <div className="w-full lg:w-1/2 h-[350px] md:h-[450px] lg:h-[520px] relative">
            <TruckScene />
          </div>
        </div>
      </div>

      {/* Floating Quote Form — bottom center, visible on mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4 lg:hidden">
        <div className="bg-white/95 backdrop-blur-sm p-4 w-full border border-gray-100 shadow-xl">
          <h3 className="text-sm font-bold text-[#011936] mb-3 text-center">Get a Free Quote</h3>
          <QuickQuoteForm />
        </div>
      </div>

      {/* Floating Quote Form — desktop, bottom-right corner */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block w-[340px]">
        <div className="bg-white/95 backdrop-blur-sm p-5 w-full border border-gray-100 shadow-2xl">
          <h3 className="text-base font-bold text-[#011936] mb-3 text-center">Get a Free Quote</h3>
          <QuickQuoteForm />
        </div>
      </div>
    </section>
  );
}
