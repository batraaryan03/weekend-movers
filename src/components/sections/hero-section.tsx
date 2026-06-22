"use client";

import { Phone, Star } from "lucide-react";
import QuickQuoteForm from "./quick-quote-form";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/assets/hero-truck.png"
          alt="Weekend Movers Truck"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011936] via-[#011936]/60 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            {/* Brand slogan */}
            <div className="mb-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                You Move.
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFB624] tracking-tight leading-tight">
                We Weekend.
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

          {/* Right — Quick Quote form */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-white p-5 w-full border border-gray-100">
              <h3 className="text-lg font-bold text-[#011936] mb-4 text-center">Get a Free Quote</h3>
              <QuickQuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
