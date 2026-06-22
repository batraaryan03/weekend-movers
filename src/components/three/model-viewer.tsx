"use client";

import { FC, Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { useGLTF, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";

export interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  defaultZoom?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  ambientIntensity?: number;
  keyLightIntensity?: number;
  placeholderSrc?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded?: () => void;
}

const isTouch =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const ROTATE_SPEED = 0.005;
const INERTIA = 0.925;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = (6 * Math.PI) / 180; // 6 degrees
const HOVER_EASE = 0.15;

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
        <div className="text-gray-500 text-sm">{Math.round(progress)}%</div>
      )}
    </Html>
  );
};

interface ModelInnerProps {
  url: string;
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableMouseParallax: boolean;
  enableHoverRotation: boolean;
  enableManualRotation: boolean;
  onLoaded?: () => void;
}

const ModelInner: FC<ModelInnerProps> = ({
  url,
  autoRotate,
  autoRotateSpeed,
  enableMouseParallax,
  enableHoverRotation,
  enableManualRotation,
  onLoaded,
}) => {
  const outerRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Group>(null!);
  const { camera, gl } = useThree();

  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });
  const pivotW = useRef(new THREE.Vector3());

  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Center and scale the model, compute pivot
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

  // Mouse parallax + hover rotation (desktop only)
  useEffect(() => {
    if (isTouch) return;
    const mm = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (enableMouseParallax)
        tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
      if (enableHoverRotation)
        tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
      invalidate();
    };
    window.addEventListener("pointermove", mm);
    return () => window.removeEventListener("pointermove", mm);
  }, [enableMouseParallax, enableHoverRotation]);

  // Manual drag rotation (desktop mouse)
  useEffect(() => {
    if (!enableManualRotation || isTouch) return;
    const el = gl.domElement;
    let drag = false;
    let lx = 0,
      ly = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      window.addEventListener("pointerup", up);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - lx;
      const dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      outerRef.current.rotation.y += dx * ROTATE_SPEED;
      outerRef.current.rotation.x += dy * ROTATE_SPEED;
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };
    const up = () => (drag = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl, enableManualRotation]);

  // Touch drag rotation
  useEffect(() => {
    if (!isTouch || !enableManualRotation) return;
    const el = gl.domElement;
    const pts = new Map<number, { x: number; y: number }>();
    let dragging = false;
    let lx = 0,
      ly = 0;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) {
        dragging = true;
        lx = e.clientX;
        ly = e.clientY;
      }
      invalidate();
    };

    const move = (e: PointerEvent) => {
      const p = pts.get(e.pointerId);
      if (!p) return;
      p.x = e.clientX;
      p.y = e.clientY;

      if (dragging && pts.size === 1) {
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;
        lx = e.clientX;
        ly = e.clientY;
        outerRef.current.rotation.y += dx * ROTATE_SPEED;
        outerRef.current.rotation.x += dy * ROTATE_SPEED;
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
        invalidate();
      }
    };

    const up = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      if (pts.size === 0) dragging = false;
    };

    el.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl, enableManualRotation]);

  // Per-frame: parallax, hover, auto-rotate, inertia
  useFrame((_, dt) => {
    const g = outerRef.current;
    if (!g) return;
    let need = false;

    // Ease parallax
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;

    // Ease hover rotation
    const phx = cHov.current.x;
    const phy = cHov.current.y;
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;

    // Position at pivot + parallax offset
    const ndc = pivotW.current.clone().project(camera);
    ndc.x += cPar.current.x;
    ndc.y += cPar.current.y;
    g.position.copy(ndc.unproject(camera));

    // Apply hover rotation delta
    g.rotation.x += cHov.current.x - phx;
    g.rotation.y += cHov.current.y - phy;

    // Auto-rotate
    if (autoRotate) {
      g.rotation.y += autoRotateSpeed * dt;
      need = true;
    }

    // Inertia from drag
    g.rotation.y += vel.current.x;
    g.rotation.x += vel.current.y;
    vel.current.x *= INERTIA;
    vel.current.y *= INERTIA;
    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4)
      need = true;

    // Still easing?
    if (
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4
    )
      need = true;

    if (need) invalidate();
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

const ModelViewer: FC<ViewerProps> = ({
  url,
  width = 400,
  height = 400,
  defaultZoom = 2,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  ambientIntensity = 0.5,
  keyLightIntensity = 1.2,
  placeholderSrc,
  autoRotate = false,
  autoRotateSpeed = 0.35,
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
      >
        <color attach="background" args={["#f8fafc"]} />

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
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            enableMouseParallax={enableMouseParallax}
            enableHoverRotation={enableHoverRotation}
            enableManualRotation={enableManualRotation}
            onLoaded={onModelLoaded}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
