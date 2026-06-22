"use client";

import dynamic from "next/dynamic";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";

const ModelViewer = dynamic(() => import("@/components/three/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl">
      <div className="animate-pulse text-gray-400">Loading 3D model...</div>
    </div>
  ),
});

const services = [
  {
    icon: Home,
    title: "Local House Moves",
    desc: "Complete residential moving services across Melbourne. We handle everything from small apartments to large family homes with care and professionalism.",
  },
  {
    icon: Building2,
    title: "Apartment Moves",
    desc: "Specialized in apartment and unit relocations. We navigate stairs, elevators, and tight spaces with ease to ensure a smooth move.",
  },
  {
    icon: Briefcase,
    title: "Office Relocations",
    desc: "Professional office moving services that minimize downtime. We handle furniture, equipment, and documents with efficiency and care.",
  },
  {
    icon: Package,
    title: "Packing & Unpacking",
    desc: "Full packing services available with quality materials. We pack, move, and unpack your belongings, saving you time and stress.",
  },
  {
    icon: Wrench,
    title: "Furniture Assembly",
    desc: "Expert furniture disassembly and reassembly included. We handle complex furniture pieces to ensure safe transport and proper setup.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[#FFB624] font-semibold text-xs md:text-sm uppercase tracking-[0.22em] mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-3">
            Our Moving Services
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Comprehensive moving solutions tailored to your needs in Melbourne
          </p>
        </div>

        {/* Main content: 3D model left, cards right */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* ── Left: Interactive 3D truck model ── */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-lg">
              <ModelViewer
                url="/truck-special-model.glb"
                width="100%"
                height={650}
                autoRotate
                autoRotateSpeed={0.15}
                defaultZoom={3}
                
                
              />
            </div>
          </div>

          {/* ── Right: Vertical service cards ── */}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="group flex items-start gap-5 p-5 rounded-xl border border-gray-100 bg-white hover:border-[#FFB624]/30 hover:shadow-lg hover:shadow-[#FFB624]/5 transition-all duration-300 cursor-default"
              >
                <div className="bg-[#FFB624]/10 group-hover:bg-[#FFB624] w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <s.icon className="w-6 h-6 text-[#011936] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#011936] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
