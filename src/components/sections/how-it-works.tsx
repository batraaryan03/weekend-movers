"use client";

import { MessageSquare, FileText, Truck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Tell us your move details",
    desc: "Fill out our simple form or give us a call to share your moving requirements",
  },
  {
    num: "02",
    icon: FileText,
    title: "Get a free quote & confirm",
    desc: "Receive a transparent quote with no hidden fees and confirm your booking",
  },
  {
    num: "03",
    icon: Truck,
    title: "We handle your move with care",
    desc: "Our professional team arrives on time and moves your belongings safely to your new home",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#011936]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">Three simple steps to a stress-free move</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-[#FFB624]/30 z-0" />
              )}
              {/* Number circle */}
              <div className="relative z-10 mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-[#FFB624]">
                  <span className="text-5xl font-bold text-[#011936]">{step.num}</span>
                </div>
              </div>
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10">
                  <step.icon className="w-8 h-8 text-[#FFB624]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/80 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
