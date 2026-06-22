"use client";

import dynamic from "next/dynamic";

const TruckCanvas = dynamic(() => import("./truck-canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[#FFB624] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm font-medium tracking-wide">
          Loading 3D model...
        </p>
      </div>
    </div>
  ),
});

export default function TruckScene() {
  return <TruckCanvas className="w-full h-full" />;
}
