"use client";

import { FC, Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { useGLTF, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

export interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  defaultZoom?: number;
  enableMouseParallax?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  placeholderSrc?: string;
  onModelLoaded?: () => void;
}

const isTouch =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;

/* ── Loader ── */
const Loader: FC<{ placeholderSrc?: string }> = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      {placeholderSrc ? (
        <img
          src={placeholderSrc}
          width={128}
          height={128}
          className="blur-lg rounded-lg"
        />
      ) : (
        <div className="text-gray-400 text-sm">{Math.round(progress)}%</div>
      )}
    </Html>
  );
};

/* ── Inner model (runs inside R3F context) ── */
interface ModelInnerProps {
  url: string;
  enableMouseParallax: boolean;
  onLoaded?: () => void;
}

const ModelInner: FC<ModelInnerProps> = ({
  url,
  enableMouseParallax,
  onLoaded,
}) => {
  const outerRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const pivotW = useRef(new THREE.Vector3());

  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Centre & scale model, compute pivot
  useEffect(() => {
    if (!scene || !innerRef.current) return;
    const g = innerRef.current;
    g.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(g);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const s = 1 / sphere.radius / 2;
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    g.scale.setScalar(s);
    g.getWorldPosition(pivotW.current);
    onLoaded?.();
  }, [scene, onLoaded]);

  // Mouse parallax (desktop only)
  useEffect(() => {
    if (isTouch) return;
    const mm = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (enableMouseParallax)
        tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
      invalidate();
    };
    window.addEventListener("pointermove", mm);
    return () => window.removeEventListener("pointermove", mm);
  }, [enableMouseParallax]);

  // Per-frame: parallax + scroll-driven rotation
  useFrame(() => {
    const g = outerRef.current;
    if (!g) return;

    // Ease parallax
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;

    // Position at pivot + parallax offset
    const ndc = pivotW.current.clone().project(camera);
    ndc.x += cPar.current.x;
    ndc.y += cPar.current.y;
    g.position.copy(ndc.unproject(camera));

    // Scroll-driven rotation (written by services section)
    g.rotation.y = scrollStore.truckRotationY;

    // Keep rendering while parallax eases
    if (
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4
    )
      invalidate();
  });

  if (!scene) return null;
  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
};

/* ── Public component ── */
const ModelViewer: FC<ViewerProps> = ({
  url,
  width = 400,
  height = 400,
  defaultZoom = 2,
  enableMouseParallax = true,
  ambientIntensity = 0.5,
  keyLightIntensity = 1.2,
  placeholderSrc,
  onModelLoaded,
}) => {
  useGLTF.preload(url);

  return (
    <div style={{ width, height }} className="relative">
      <Canvas
        frameloop="demand"
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
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={keyLightIntensity}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <hemisphereLight args={["#b1e1ff", "#d4a574", 0.3]} />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            enableMouseParallax={enableMouseParallax}
            onLoaded={onModelLoaded}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
