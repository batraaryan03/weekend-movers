"use client";

import { Check } from "lucide-react";
import StaggerReveal from "@/components/stagger-reveal";

const plans = [
  {
    name: "4 Tonne Truck",
    subtitle: "Ideal for 1–2 Bedroom Unit or Small Apartment",
    price: 120,
    features: ["2 Professional Movers", "Suitable for smaller moves", "Moving Truck & Equipment"],
    popular: false,
  },
  {
    name: "8 Tonne Truck",
    subtitle: "Ideal for 3–4 Bedroom House",
    price: 140,
    features: ["2 Professional Movers", "Medium-size moves with more furniture", "Moving Truck & Equipment", "Disassembly & Reassembly Included"],
    popular: true,
  },
  {
    name: "10 Tonne Truck",
    subtitle: "Ideal for 5–6 Bedroom House or Large Office Relocation",
    price: 160,
    features: ["2 Professional Movers", "Large capacity for big moves", "Moving Truck & Equipment", "Full Packing Assistance"],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0d254c]">Transparent Pricing</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the right truck size for your move. Prices are charged per hour with professional movers and full equipment included.
          </p>
        </div>
        <StaggerReveal className="grid lg:grid-cols-3 gap-8 items-stretch" stagger={0.15}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col bg-white p-8 border-2 ${
                plan.popular ? "border-[#FFC107]" : "border-gray-100"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#FFC107] text-[#0d254c] font-bold px-4 py-1 text-sm">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#0d254c] text-center">{plan.name}</h3>
              <p className="text-gray-500 text-center mt-1 text-sm">{plan.subtitle}</p>
              <p className="text-5xl font-extrabold text-center my-6 text-[#0d254c]">
                ${plan.price} <span className="text-2xl font-semibold">/ hour</span>
              </p>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full font-bold text-lg py-4 transition-colors ${
                  plan.popular
                    ? "bg-[#FFC107] text-[#0d254c] hover:bg-[#FFD54F]"
                    : "bg-[#0d254c] text-white hover:bg-[#012a52]"
                }`}
              >
                Book This Truck
              </button>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
