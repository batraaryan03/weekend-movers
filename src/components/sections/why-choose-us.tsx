"use client";

import { CheckCircle, Users, DollarSign, Shield, Calendar, Heart } from "lucide-react";
import { CanvasRightDirectionTruck } from "@/components/sections/services-section";

const features = [
  { icon: Users, title: "Local Melbourne Team", desc: "Born and raised in Melbourne, we know the city inside out" },
  { icon: DollarSign, title: "Clear Upfront Pricing", desc: "Transparent quotes with no surprise fees or hidden costs" },
  { icon: Shield, title: "Careful Handling", desc: "Your belongings are protected" },
  { icon: Calendar, title: "Weekend & Same-Day Availability", desc: "Flexible scheduling including weekends and last-minute moves" },
  { icon: Heart, title: "Friendly Professionals", desc: "Experienced movers who treat your home like their own" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="/assets/background.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-4">
            Why Choose Weekend Movers
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Melbourne's trusted local movers with a commitment to excellence
          </p>
        </div>
        <CanvasRightDirectionTruck />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="bg-golden w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#011936]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <f.icon className="w-6 h-6 text-[#011936]" />
                  <h3 className="text-xl font-bold text-[#011936]">
                    {f.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
