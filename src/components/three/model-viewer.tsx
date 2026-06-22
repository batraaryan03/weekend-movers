"use client";

import { FC, Suspense, useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useProgress, Html } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  modelXOffset?: number;
  modelYOffset?: number;
  defaultRotationX?: number;
  defaultRotationY?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  enableManualZoom?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  fillLightIntensity?: number;
  rimLightIntensity?: number;
  environmentPreset?: "city" | "sunset" | "night" | "dawn" | "studio" | "apartment" | "forest" | "park" | "none";
  autoFrame?: boolean;
  placeholderSrc?: string;
  showScreenshotButton?: boolean;
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded?: () => void;
}

const Loader: FC<{ placeholderSrc?: string }> = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      {placeholderSrc ? (
        <img src={placeholderSrc} width={128} height={128} className="blur-lg rounded-lg" />
      ) : (
        <div className="text-gray-500 text-sm">{Math.round(progress)}%</div>
      )}
    </Html>
  );
};

interface ModelInnerProps {
  url: string;
  autoRotate: boolean;
  autoRotateSpeed: number;
  onLoaded?: () => void;
}

const ModelInner: FC<ModelInnerProps> = ({
  url,
  autoRotate,
  autoRotateSpeed,
  onLoaded,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      onLoaded?.();
    }
  }, [scene, onLoaded]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += autoRotateSpeed * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} />
    </group>
  );
};

const ModelViewer: FC<ViewerProps> = ({
  url,
  width = 400,
  height = 400,
  defaultRotationX = -45,
  defaultRotationY = 20,
  defaultZoom = 2,
  minZoomDistance = 1,
  maxZoomDistance = 10,
  enableManualRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.5,
  keyLightIntensity = 1.2,
  placeholderSrc,
  showScreenshotButton = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  onModelLoaded,
}) => {
  useEffect(() => {
    useGLTF.preload(url);
  }, [url]);

  return (
    <div
      style={{ width, height }}
      className="relative"
    >
      {showScreenshotButton && (
        <button className="absolute top-4 right-4 z-10 px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white/80 hover:bg-white transition-colors">
          Screenshot
        </button>
      )}

      <Canvas
        camera={{
          fov: 50,
          position: [0, 0.5, defaultZoom],
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <color attach="background" args={["#f8fafc"]} />

        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={keyLightIntensity}
          castShadow={false}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <hemisphereLight
          skyColor="#b1e1ff"
          groundColor="#d4a574"
          intensity={0.3}
        />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            onLoaded={onModelLoaded}
          />
        </Suspense>

        {enableManualRotation && (
          <OrbitControls
            enableZoom={enableManualZoom}
            enablePan={false}
            minDistance={minZoomDistance}
            maxDistance={maxZoomDistance}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  );
};

export default ModelViewer;
