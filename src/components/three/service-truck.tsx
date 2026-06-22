"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { TruckInstances, TruckModel } from "./truck-model";

interface ServiceTruckProps {
  /** Y-axis rotation in radians */
  rotationY?: number;
  className?: string;
}

function TruckScene({ rotationY }: { rotationY: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, 5, -3]} intensity={0.5} color="#FFB624" />
      <Environment preset="city" />
      <TruckInstances>
        <group rotation={[0, rotationY, 0]} position={[0, -0.6, 0]} scale={0.35}>
          <TruckModel />
        </group>
      </TruckInstances>
    </>
  );
}

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#FFB624] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ServiceTruck({ rotationY = 0, className = "" }: ServiceTruckProps) {
  return (
    <div className={`w-full h-[200px] ${className}`}>
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 32 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          style={{ background: "transparent" }}
        >
          <TruckScene rotationY={rotationY} />
        </Canvas>
      </Suspense>
    </div>
  );
}
