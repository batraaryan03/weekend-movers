"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { TruckInstances, TruckModel } from "@/components/three/truck-model";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";

/* ── Scroll store (mutable, no React re-renders in useFrame) ── */
const scrollStore = { value: 0 };

const services = [
  {
    icon: Home,
    title: "Local House Moves",
    desc: "Complete residential moving services across Melbourne. We handle everything from small apartments to large family homes with care and professionalism.",
    rotationY: 0,
  },
  {
    icon: Building2,
    title: "Apartment Moves",
    desc: "Specialized in apartment and unit relocations. We navigate stairs, elevators, and tight spaces with ease to ensure a smooth move.",
    rotationY: -Math.PI / 3,
  },
  {
    icon: Briefcase,
    title: "Office Relocations",
    desc: "Professional office moving services that minimize downtime. We handle furniture, equipment, and documents with efficiency and care.",
    rotationY: Math.PI,
  },
  {
    icon: Package,
    title: "Packing & Unpacking",
    desc: "Full packing services available with quality materials. We pack, move, and unpack your belongings, saving you time and stress.",
    rotationY: Math.PI / 3,
  },
  {
    icon: Wrench,
    title: "Furniture Assembly",
    desc: "Expert furniture disassembly and reassembly included. We handle complex furniture pieces to ensure safe transport and proper setup.",
    rotationY: -Math.PI / 6,
  },
];

/* ── Scroll-driven truck (rotates based on scroll progress) ── */
function ScrollDrivenTruck() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const p = scrollStore.value;

    const totalServices = services.length;
    const segmentSize = 1 / totalServices;
    const segmentIndex = Math.min(Math.floor(p / segmentSize), totalServices - 1);
    const nextIndex = Math.min(segmentIndex + 1, totalServices - 1);
    const segmentProgress = (p - segmentIndex * segmentSize) / segmentSize;

    const fromY = services[segmentIndex].rotationY;
    const toY = services[nextIndex].rotationY;

    let diff = toY - fromY;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    g.rotation.y = fromY + diff * segmentProgress;
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={0.4}>
      <TruckModel />
    </group>
  );
}

/* ── 3D Scene (rendered ONCE, never destroyed) ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 5, -3]} intensity={0.5} color="#FFB624" />
      <Environment preset="city" />
      <TruckInstances>
        <ScrollDrivenTruck />
      </TruckInstances>
    </>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const maxScroll = section.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(0.999, -rect.top / maxScroll));
      scrollStore.value = p;
      setActiveIndex(Math.min(Math.floor(p * services.length), services.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTruckLeft = activeIndex % 2 === 0;

  return (
    <section ref={sectionRef} className="relative bg-white" style={{ height: `${services.length * 100 + 100}vh` }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section header */}
        <div className="text-center pt-10 pb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-3">Our Moving Services</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive moving solutions tailored to your needs in Melbourne</p>
        </div>

        {/* Main content area — truck on one side, text on the other */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-[calc(100vh-160px)] relative flex items-center">
          {/* ── SINGLE Canvas (always mounted, never destroyed) ── */}
          <div
            className="hidden md:block w-1/2 h-[300px] shrink-0 transition-all duration-700 ease-out"
            style={{
              order: isTruckLeft ? 0 : 1,
            }}
          >
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

          {/* ── Service info (text only, no Canvas) ── */}
          <div className="w-full md:w-1/2 px-4 md:px-8 relative">
            {services.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={s.title}
                  className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none px-4 md:px-8"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateX(${isActive ? 0 : (i % 2 === 0 ? -20 : 20)}px)`,
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                  }}
                >
                  <div className={`w-full max-w-lg mx-auto md:text-left ${isTruckLeft ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0"}`}>
                    <div className="bg-[#FFB624] w-14 h-14 flex items-center justify-center mb-5">
                      <s.icon className="w-7 h-7 text-[#011936]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#011936] mb-4">{s.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {services.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-[#FFB624] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
