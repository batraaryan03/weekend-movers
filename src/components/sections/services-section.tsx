"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { TruckModel } from "@/components/three/truck-model";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";

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

/* ── Auto-rotating truck (smooth continuous spin) ── */
function RotatingTruck() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={1.75}>
      <TruckModel />
    </group>
  );
}

/* ── 3D Scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 5, -3]} intensity={0.4} color="#FFB624" />
      <Environment preset="city" />
      <RotatingTruck />
    </>
  );
}

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

        {/* Main content: 3D truck left, cards right */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* ── Left: Rotating 3D truck ── */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-lg h-[350px] md:h-[420px]">
              <Canvas
                camera={{ position: [0, 2, 6], fov: 32 }}
                dpr={[1, 1.5]}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.1,
                }}
                style={{ background: "transparent" }}
              >
                <Scene />
              </Canvas>
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
