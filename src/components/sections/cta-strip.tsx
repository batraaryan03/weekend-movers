"use client";

import { Phone, FileText, CalendarCheck } from "lucide-react";

export default function CtaStrip() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FFB624] to-[#ffc84d] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgb(1, 25, 54) 1px, transparent 0px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-[#011936] mb-8 leading-tight">
          Need a mover today?
          <br />
          <span className="text-white">Call Weekend Movers now</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="/book-move">
            <button className="bg-[#011936] text-white hover:bg-[#012a52] font-bold text-xl px-10 py-8 flex items-center gap-3 transition-colors">
              <CalendarCheck className="h-7 w-7" />
              Book Your Move
            </button>
          </a>
          <a href="tel:+61416828199">
            <button className="bg-white text-[#011936] border-2 border-[#011936] hover:bg-gray-50 font-bold text-xl px-10 py-8 flex items-center gap-3 transition-colors">
              <Phone className="h-7 w-7" />
              Call: +61 416 828 199
            </button>
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-[#011936] border-2 border-[#011936] hover:bg-gray-50 font-bold text-xl px-10 py-8 flex items-center gap-3 transition-colors"
          >
            <FileText className="h-7 w-7" />
            Get Free Quote
          </button>
        </div>
        <p className="text-lg text-[#011936] mt-8 font-semibold">
          Same-day availability • Weekend moves • Transparent pricing
        </p>
      </div>
    </section>
  );
}
