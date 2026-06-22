"use client";

import { useState, useEffect } from "react";
import { Phone, ChevronDown, Home, DollarSign, Truck, Image, Star, Mail, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#pricing", label: "Pricing", icon: DollarSign },
  { href: "#services", label: "Services", icon: Truck },
  { href: "#gallery", label: "Gallery", icon: Image },
  { href: "#reviews", label: "Reviews", icon: Star },
  { href: "#contact", label: "Contact", icon: Mail },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "").toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100" : "bg-white"
      )}
    >
      {/* Gradient accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#011936] via-[#FFB624] to-[#011936]" />

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}>
          <img src="/assets/logo.png" alt="Weekend Movers" className="h-9 w-auto" />
          <span className="font-bold text-lg text-[#011936] hidden sm:block tracking-tight">
            Weekend Movers
          </span>
        </a>

        {/* Desktop nav — centered links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-sm font-medium text-[#011936] hover:text-[#FFB624] px-3 py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Call button + mobile menu toggle */}
        <div className="flex items-center gap-3">
          <a href="tel:+61416828199" className="hidden md:inline-flex items-center gap-2 bg-[#011936] text-white text-sm font-bold px-4 py-2.5 hover:bg-[#012a52] transition-colors">
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center gap-1.5 text-[#011936] p-2 hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="flex items-center gap-3 px-3 py-2.5 text-[#011936] hover:bg-gray-50 transition-colors"
              >
                <link.icon className="w-4 h-4 text-[#FFB624]" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
            <a
              href="tel:+61416828199"
              className="flex items-center gap-3 px-3 py-2.5 bg-[#011936] text-white font-bold text-sm mt-2"
            >
              <Phone className="w-4 h-4" />
              Call: +61 416 828 199
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
