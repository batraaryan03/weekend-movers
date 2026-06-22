"use client";

import { Phone, FileText } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-6">
          Ready to Move?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Get in touch today for a free, no-obligation quote. We&apos;re here to make your move as smooth as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+61416828199">
            <button className="bg-[#FFB624] text-[#011936] hover:bg-yellow-500 font-bold text-lg px-10 py-4 flex items-center justify-center gap-2 transition-colors">
              <Phone className="w-5 h-5" />
              Call: +61 416 828 199
            </button>
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#011936] text-white hover:bg-[#012a52] font-bold text-lg px-10 py-4 flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Get a Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}
