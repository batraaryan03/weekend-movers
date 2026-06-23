"use client";

import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#ffffff",
    showAtmosphere: true,
    atmosphereColor: "#D4AF37",
    atmosphereAltitude: 0.15,
    emissive: "#ffffff",
    emissiveIntensity: 0.6,
    shininess: 0.9,
    polygonColor: "rgba(212,175,55,0.6)",
    ambientLight: "#D4AF37",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#D4AF37",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 0,
    maxRings: 0,
    initialPosition: { lat: -25.2744, lng: 133.7751 },
    autoRotate: false,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#D4AF37", "#F4D03F"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -37.8136,
      startLng: 144.9631,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: -37.8136,
      startLng: 144.9631,
      endLat: -31.9505,
      endLng: 115.8605,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: -37.8136,
      startLng: 144.9631,
      endLat: -27.4698,
      endLng: 153.0251,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: -37.8136,
      startLng: 144.9631,
      endLat: -34.9285,
      endLng: 138.6007,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: -37.8136,
      startLng: 144.9631,
      endLat: -12.4634,
      endLng: 130.8456,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 1,
      startLat: -37.8136,
      startLng: 144.9631,
      endLat: -31.9522,
      endLng: 115.8589,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white relative w-full">
      <div className="max-w-10xl mx-auto w-full relative overflow-hidden h-full md:h-160 px-4">
        <div
          className="absolute w-full bottom-0 inset-x-0 h-[55%] z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="absolute w-full bottom-0 h-full md:h-160 z-0"
          // style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
        >
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}