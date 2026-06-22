"use client";

import { Phone, FileText, Star } from "lucide-react";
import QuickQuoteForm from "./quick-quote-form";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[700px] flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/assets/hero-truck.png"
          alt="Melbourne Local Movers Truck"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011936] via-[#011936]/60 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 md:gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Melbourne Local Movers
            </h1>
            <div className="text-white/95 text-sm md:text-base font-semibold tracking-wide">
              Trusted • Insured • Transparent Pricing • Weekend Moves
            </div>
            <div className="text-[#FFB624] font-bold text-xs md:text-sm">
              ⚡ We respond to quote requests within 60 seconds.
            </div>
            <div className="w-full max-w-2xl mt-2">
              <p className="text-base md:text-lg font-bold text-[#FFB624] mb-1">
                2 Movers + Truck — Starting from $130/hr
              </p>
              <p className="text-white/90 text-xs md:text-sm font-medium">
                Final price depends on distance, access &amp; time. No hidden fees.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start items-center mt-2">
              <a href="tel:+61416828199" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#FFB624] text-[#011936] hover:bg-yellow-500 font-bold text-lg h-12 md:h-14 px-8 flex items-center justify-center gap-2 transition-colors">
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
              </a>
              <button className="w-full sm:w-auto bg-white text-[#011936] hover:bg-gray-100 font-bold text-lg h-12 md:h-14 px-8 flex items-center justify-center gap-2 transition-colors lg:hidden">
                Get Instant Quote
              </button>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white hover:text-[#FFB624] font-medium py-2 sm:ml-2 transition-colors"
              >
                View Pricing
              </a>
            </div>
            {/* Star rating */}
            <div className="flex flex-col items-center lg:items-start gap-2 mt-4 border-t border-white/20 pt-6 w-full">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-[#FFB624] text-[#FFB624]" />
                ))}
              </div>
              <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">
                Rated by Melbourne locals
              </span>
            </div>
          </div>

          {/* Right — Quick Quote form */}
          <div className="w-full lg:w-1/3 max-w-md">
            <div className="bg-white p-4 w-full shadow-lg border border-gray-100">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[#FFB624]" />
                <h3 className="text-lg font-bold text-[#011936]">Quick Quote</h3>
              </div>
              <QuickQuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
