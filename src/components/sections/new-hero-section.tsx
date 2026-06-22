"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { TruckInstances, TruckModel } from "@/components/three/truck-model";

/* ─────────────────────────────────────────────
 * Mutable scroll store — updated by scroll
 * handler, read inside useFrame (no React
 * re-renders, guaranteed 60 fps).
 * ───────────────────────────────────────────── */
const scrollStore = { value: 0 };

/* ─────────────────────────────────────────────
 * ScrollDrivenTruck
 *
 * Rotates the truck from a RIGHT-SIDE PROFILE
 * (front pointing left) to FRONT-FACING as
 * scroll progress goes 0 → 1.
 *
 * Default GLB orientation : truck faces +Z.
 * Rotate  −90° on Y       → front points −X
 * (left), right side faces camera (+Z).
 * ───────────────────────────────────────────── */
function ScrollDrivenTruck() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const p = scrollStore.value;

    // Y rotation: −90° (right profile) → 0° (front-facing)
    g.rotation.y = THREE.MathUtils.lerp(-Math.PI / 2, 0, p);

    // Subtle Z tilt during mid-rotation (peaks at p = 0.5)
    g.rotation.z = Math.sin(p * Math.PI) * -0.03;

    // Slight X drift — truck slides a little as it rotates
    g.position.x = THREE.MathUtils.lerp(1.2, 0, p);

    // Gentle Y rise
    g.position.y = THREE.MathUtils.lerp(-1.8, -1.2, p);
  });

  return (
    <group ref={groupRef}>
      <TruckModel />
    </group>
  );
}

/* ─────────────────────────────────────────────
 * Scene — lighting, environment, shadows
 * ───────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        castShadow
        color="#ffffff"
      />
      <directionalLight
        position={[-3, 5, -3]}
        intensity={0.6}
        color="#FFB624"
      />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#FFB624" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.5}
        color="#ffffff"
      />

      <Environment preset="city" />

      <TruckInstances>
        <ScrollDrivenTruck />
      </TruckInstances>

      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.2}
        scale={14}
        blur={2.5}
        far={5}
        color="#011936"
      />
    </>
  );
}

/* ─────────────────────────────────────────────
 * NewHeroSection
 *
 * 200vh tall section with a sticky inner
 * container.  The 3D canvas fills the viewport
 * while the extra 100vh provides scroll room
 * for the animation.
 *
 * Layout:
 *   TOP    → centered text (eyebrow, headline, description, CTA)
 *   BOTTOM → 3D truck model (smaller, centered)
 * ───────────────────────────────────────────── */
export default function NewHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const maxScroll = section.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / maxScroll));
      scrollStore.value = p;
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── text animation helpers ── */
  // Fade in: 0 → 0.12   |  Visible: 0.12 → 0.65  |  Fade out: 0.65 → 0.9
  const textOpacity =
    progress < 0.12
      ? progress / 0.12
      : progress > 0.65
        ? Math.max(0, (1 - progress) / 0.35)
        : 1;

  // Slide up (completes at 15 % scroll)
  const slideUp = Math.min(progress / 0.15, 1);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-white"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* ── Text — top center ── */}
        <div className="flex-shrink-0 pt-16 md:pt-20 lg:pt-24 z-10">
          <div className="max-w-4xl mx-auto px-6 text-center pointer-events-none">
            <div
              style={{
                opacity: textOpacity,
                transform: `translateY(${(1 - slideUp) * 30}px)`,
              }}
            >
              {/* Eyebrow */}
              <p className="text-[#FFB624] font-semibold text-xs md:text-sm uppercase tracking-[0.22em] mb-4">
                Melbourne&apos;s #1 Rated Movers
              </p>

              {/* Headlines */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#011936] tracking-tight leading-[1.08]">
                Your Move.
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFB624] tracking-tight leading-[1.08]">
                Our Weekend.
              </h1>

              {/* Description */}
              <p className="text-[#011936]/60 text-base md:text-lg lg:text-xl mt-5 max-w-lg mx-auto leading-relaxed">
                Melbourne&apos;s trusted local movers. Professional service,
                transparent pricing, and weekend availability.
              </p>

              {/* CTA */}
              <div className="mt-7 pointer-events-auto">
                <a href="tel:+61416828199">
                  <button className="bg-[#FFB624] text-[#011936] hover:bg-yellow-500 font-bold text-base h-12 px-8 transition-colors">
                    Call Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3D Truck — bottom center ── */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            <div className="w-full h-[45vh] md:h-[50vh]">
              <Canvas
                camera={{ position: [0, 3, 9], fov: 34 }}
                dpr={[1, 2]}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.2,
                }}
                style={{ background: "transparent" }}
              >
                <Scene />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
