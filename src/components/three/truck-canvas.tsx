"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, ContactShadows } from "@react-three/drei";
import { TruckInstances, TruckModel } from "./truck-model";

interface TruckCanvasProps {
  className?: string;
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[#FFB624] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm font-medium tracking-wide">
          Loading 3D model...
        </p>
      </div>
    </div>
  );
}

export default function TruckCanvas({ className = "" }: TruckCanvasProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [5, 3, 5], fov: 32 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          style={{ background: "transparent" }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
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

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Truck model wrapped in Merged instances */}
          <TruckInstances>
            <TruckModel position={[0, -0.8, 0]} scale={0.5} />
          </TruckInstances>

          {/* Ground contact shadow */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={14}
            blur={2.5}
            far={5}
            color="#011936"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
