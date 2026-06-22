"use client";

import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#011936] text-white">
      {/* Big brand text */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/90">
            WEEKEND
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFB624]">
            MOVERS
          </h2>
          <p className="text-white/60 mt-4 text-lg">Melbourne&apos;s Trusted Local Movers</p>
        </div>
      </div>

      {/* Footer links & contact */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#FFB624]">Contact Us</h3>
            <div className="space-y-3 text-white/80 text-sm">
              <a href="tel:+61416828199" className="flex items-center gap-2 hover:text-[#FFB624] transition-colors">
                <Phone className="w-4 h-4" />
                +61 416 828 199
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Melbourne, VIC
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                7 days a week
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#FFB624]">Quick Links</h3>
            <div className="space-y-2 text-sm">
              {["Home", "Services", "Pricing", "Gallery", "Reviews", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-white/70 hover:text-[#FFB624] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#FFB624]">Our Services</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Local House Moves</p>
              <p>Apartment Moves</p>
              <p>Office Relocations</p>
              <p>Packing &amp; Unpacking</p>
              <p>Furniture Assembly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
          <p>© {new Date().getFullYear()} Weekend Movers. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-[#FFB624] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FFB624] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
