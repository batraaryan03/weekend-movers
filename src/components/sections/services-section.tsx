"use client";

import dynamic from "next/dynamic";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";
import StaggerReveal from "@/components/stagger-reveal";

const ServiceTruck = dynamic(() => import("@/components/three/service-truck"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#FFB624] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const services = [
  {
    icon: Home,
    title: "Local House Moves",
    desc: "Complete residential moving services across Melbourne. We handle everything from small apartments to large family homes with care and professionalism.",
    rotationY: 0, // front-facing
  },
  {
    icon: Building2,
    title: "Apartment Moves",
    desc: "Specialized in apartment and unit relocations. We navigate stairs, elevators, and tight spaces with ease to ensure a smooth move.",
    rotationY: -Math.PI / 2, // right profile
  },
  {
    icon: Briefcase,
    title: "Office Relocations",
    desc: "Professional office moving services that minimize downtime. We handle furniture, equipment, and documents with efficiency and care.",
    rotationY: Math.PI, // back
  },
  {
    icon: Package,
    title: "Packing & Unpacking",
    desc: "Full packing services available with quality materials. We pack, move, and unpack your belongings, saving you time and stress.",
    rotationY: Math.PI / 4, // angled front-right
  },
  {
    icon: Wrench,
    title: "Furniture Assembly",
    desc: "Expert furniture disassembly and reassembly included. We handle complex furniture pieces to ensure safe transport and proper setup.",
    rotationY: -Math.PI / 4, // angled front-left
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-4">Our Moving Services</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">Comprehensive moving solutions tailored to your needs in Melbourne</p>
        </div>
        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
          {services.map((s) => (
            <div key={s.title} className="p-8 border border-gray-200 hover:border-[#FFB624] transition-colors">
              {/* 3D Truck model */}
              <ServiceTruck rotationY={s.rotationY} className="mb-4" />

              <div className="bg-[#FFB624] w-16 h-16 flex items-center justify-center mb-6">
                <s.icon className="w-8 h-8 text-[#011936]" />
              </div>
              <h3 className="text-2xl font-bold text-[#011936] mb-4">{s.title}</h3>
              <p className="text-gray-700 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
