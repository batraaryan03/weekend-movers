"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { invalidate } from "@react-three/fiber";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";
import { scrollStore } from "@/lib/scroll-store";
import { useMediaQuery } from "@/hooks/use-media-query";

/* ── Lazy 3D viewer ── */
const ModelViewer = dynamic(() => import("@/components/three/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading 3D model…</div>
    </div>
  ),
});

/* ── Service data ── */
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

/* ── Desktop: Card layout positions ── */
const cardPositions = [
  { side: "right" as const, top: 28 },  // 1
  { side: "right" as const, top: 52 },  // 2
  { side: "left" as const, top: 28 },   // 3
  { side: "left" as const, top: 52 },   // 4
  { side: "left" as const, top: 78 },   // 5 — moved to left side
];

/* ── Desktop: Scroll thresholds for card groups ── */
const groupThresholds = [
  { start: 0.25, cards: [0, 1] },      // right cards appear
  { start: 0.52, cards: [2, 3] },      // left cards (first two)
  { start: 0.48, cards: [4] },         // third left card appears only when truck moves right
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/* ════════════════════════════════════════════ DESKTOP LAYOUT ════════════════════ */
function DesktopLayout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftBranchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightBranchRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thirdLeftBranchRef = useRef<HTMLDivElement | null>(null);
  const thirdLeftDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: { revert: () => void } | undefined;
    let killed = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      if (killed) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.6,
          onUpdate: (self) => tick(self.progress),
        });
      });
    })();

    function tick(p: number) {
      /* ── Truck X: center → LEFT (-24%) → RIGHT (+24%) ── */
      let tx: number;
      if (p < 0.05) tx = 0;
      else if (p < 0.48) tx = lerp(0, -24, (p - 0.05) / 0.26);
      else if (p < 0.72) tx = lerp(-24, 24, (p - 0.48) / 0.24);
      else tx = 24;

      let ty: number;
      if (p < 0.05) ty = 0;
      else if (p < 0.48) ty = lerp(0, -10, (p - 0.05) / 0.26);
      else if (p < 0.72) ty = lerp(-10, -10, (p - 0.48) / 0.24);
      else ty = -10;

      // Truck scale — constant, 25% larger
      if (canvasRef.current)
        canvasRef.current.style.transform = `translateX(${tx}%) translateY(${ty}%) scale(1)`;

      /* ── Truck rotation — smooth from initial through to final ── */
      let rotY: number;
      if (p < 0.05) {
        rotY = lerp(Math.PI, Math.PI, p / 0.05);
      } else if (p < 0.48) {
        rotY = lerp(Math.PI, Math.PI * 0.2, (p - 0.05) / 0.26);
      } else if (p < 0.72) {
        rotY = lerp(Math.PI * 0.2, -Math.PI * 0.15, (p - 0.48) / 0.24);
      } else {
        rotY = -Math.PI * 0.15;
      }

      scrollStore.truckRotationY = rotY;
      invalidate();

      /* ── Header ── */
      if (headerRef.current) {
        const ho = p < 0.08 ? 1 - p / 0.08 : 0;
        headerRef.current.style.opacity = String(ho);
        headerRef.current.style.transform = `translateY(${lerp(0, -40, p / 0.1)}px)`;
      }

      /* ── Timeline: opacity tied to truck entering, scale tied to truck position ── */
      if (timelineRef.current) {
        const to = p < 0.18 ? 0 : Math.min(1, (p - 0.18) / 0.06);
        timelineRef.current.style.opacity = String(to);
      }
      if (lineRef.current) {
        const lineProgress = Math.min(1, Math.max(0, (tx + 16) / 40));
        lineRef.current.style.transform = `scaleY(${lineProgress})`;
      }

      /* ── Cards ── */
      const isTruckMovingRight = p >= 0.48;

      for (const group of groupThresholds) {
        for (const ci of group.cards) {
          const el = cardRefs.current[ci];
          if (!el) continue;
          const isRightCard = cardPositions[ci].side === "right";
          const isLeftCard = cardPositions[ci].side === "left";

          if (isRightCard && isTruckMovingRight) {
            const fadeOut = Math.min(1, (p - 0.48) / 0.08);
            el.style.opacity = String(Math.max(0, 1 - fadeOut));
            el.style.transform = `translateY(${fadeOut * 24}px)`;
            continue;
          }

          const cp = p > group.start ? Math.min(1, (p - group.start) / 0.06) : 0;
          // Card 4 (Furniture Assembly) only appears when truck moves right
          const opacity = ci === 4 ? (p >= 0.48 ? Math.min(1, (p - 0.48) / 0.06) : 0) : cp;
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${(1 - opacity) * 24}px)`;
        }
      }

      // ALL dots/branches opacity controlled here
      // Right dots/branches: visible 0.25–0.48, fade out after
      const rightVisible = p >= 0.25 && p < 0.48;
      const rightFadeIn = p >= 0.25 ? Math.min(1, (p - 0.25) / 0.06) : 0;
      const rightFadeOut = p >= 0.48 ? Math.min(1, (p - 0.48) / 0.08) : 0;
      const rightOpacity = rightVisible ? rightFadeIn : (p >= 0.48 ? Math.max(0, 1 - rightFadeOut) : 0);

      for (let j = 0; j < 2; j++) {
        const rb = rightBranchRefs.current[j];
        const rd = rightDotRefs.current[j];
        if (rb) rb.style.opacity = String(rightOpacity);
        if (rd) rd.style.opacity = String(rightOpacity);
      }

      // Left dots/branches (first two): visible when truck moves left (p >= 0.52)
      const leftVisible = p >= 0.52;
      const leftOpacity = leftVisible ? Math.min(1, (p - 0.52) / 0.06) : 0;

      for (let j = 0; j < 2; j++) {
        const lb = leftBranchRefs.current[j];
        const ld = leftDotRefs.current[j];
        if (lb) lb.style.opacity = String(leftOpacity);
        if (ld) ld.style.opacity = String(leftOpacity);
      }

      // Third left dot/branch: visible only when truck moves right
      const thirdLeftOpacity = p >= 0.48 ? Math.min(1, (p - 0.48) / 0.06) : 0;
      if (thirdLeftDotRef.current) thirdLeftDotRef.current.style.opacity = String(thirdLeftOpacity);
      if (thirdLeftBranchRef.current) thirdLeftBranchRef.current.style.opacity = String(thirdLeftOpacity);
    }

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white mx-0 px-0" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div ref={headerRef} className="absolute top-0 left-0 right-0 h-[20%] flex items-center justify-center z-20">
          <div className="text-center px-4">
            <p className="text-golden font-semibold text-xs md:text-sm uppercase tracking-[0.22em] mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-3">Our Moving Services</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive moving solutions tailored to your needs in Melbourne</p>
          </div>
        </div>

        {/* 3D canvas */}
        <div ref={canvasRef} className="absolute left-0 right-0 top-[20%] bottom-0 z-0" style={{ transformOrigin: "center center", willChange: "transform" }}>
          <ModelViewer url="/truck-special-model.glb" width="100%" height="80%" defaultZoom={2.5} enableMouseParallax />
        </div>

        {/* Timeline + cards overlay */}
        <div ref={timelineRef} className="absolute inset-0 pointer-events-none z-10" style={{ opacity: 0 }}>
          {/* Vertical golden line */}
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-golden origin-top" style={{ top: "20%", bottom: "4%", transform: "scaleY(0)" }} />

          {/* Dots — start invisible, opacity controlled by tick() */}
          {cardPositions.map((pos, i) => {
            const right = pos.side === "right";
            const isLeft = pos.side === "left";
            const isRight = pos.side === "right";
            const leftIdx = isLeft ? (i === 2 ? 0 : i === 3 ? 1 : -1) : -1;
            const rightIdx = isRight ? (i === 0 ? 0 : 1) : -1;
            return (
              <div
                key={`d${i}`}
                ref={(el) => {
                  if (isLeft && leftIdx >= 0) leftDotRefs.current[leftIdx] = el;
                  if (isRight && rightIdx >= 0) rightDotRefs.current[rightIdx] = el;
                  if (i === 4) thirdLeftDotRef.current = el;
                }}
                className="absolute w-3.5 h-3.5 bg-golden rounded-[2px] z-10"
                style={{ top: `${pos.top}%`, left: "50%", transform: "translate(-50%, -50%)", opacity: 0 }}
              />
            );
          })}

          {/* Branch lines — start invisible, opacity controlled by tick() */}
          {cardPositions.map((pos, i) => {
            const right = pos.side === "right";
            const isLeft = pos.side === "left";
            const isRight = pos.side === "right";
            const leftIdx = isLeft ? (i === 2 ? 0 : i === 3 ? 1 : -1) : -1;
            const rightIdx = isRight ? (i === 0 ? 0 : 1) : -1;
            return (
              <div
                key={`b${i}`}
                ref={(el) => {
                  if (isLeft && leftIdx >= 0) leftBranchRefs.current[leftIdx] = el;
                  if (isRight && rightIdx >= 0) rightBranchRefs.current[rightIdx] = el;
                  if (i === 4) thirdLeftBranchRef.current = el;
                }}
                className="absolute h-[2px] bg-golden"
                style={{
                  top: `${pos.top}%`,
                  width: "36px",
                  left: right ? "calc(50% + 7px)" : undefined,
                  right: right ? undefined : "calc(50% + 7px)",
                  transform: "translateY(-50%)",
                  opacity: 0,
                }}
              />
            );
          })}

          {/* Service cards */}
          {services.map((s, i) => {
            const pos = cardPositions[i];
            const right = pos.side === "right";
            const posStyle: React.CSSProperties = { top: `${pos.top}%`, width: "clamp(220px, 20vw, 320px)", maxWidth: "320px" };
            if (right) posStyle.left = "calc(50% + 42px)";
            else posStyle.right = "calc(50% + 42px)";
            const Icon = s.icon;
            return (
              <div key={s.title} className="absolute" style={posStyle}>
                <div ref={(el) => { cardRefs.current[i] = el; }} style={{ opacity: 0 }} className="bg-white ml-5 translate-y-[-15px] text-justify tracking-wide">
                  <h3 className="text-lg font-bold text-[#011936] mb-2 flex items-center gap-2"><Icon className="w-5 h-5 text-[#011936]" />{s.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════ MOBILE LAYOUT ════════════════════ */
function MobileLayout({ isMobile, serviceLayout = true, direction = "left" }: { isMobile?: boolean; serviceLayout?: boolean; direction?: "left" | "right" }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const isRight = direction === "right";

  useEffect(() => {
    const handleScroll = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const distFromCenter = (rect.top + rect.height / 1.5 - viewportCenter) / viewportCenter;
        const x = distFromCenter * 60;
        const y = -68;
        if (isRight) {
          canvasRef.current.style.transform = `translateX(${x}%) translateY(${y}%) scale(1)`;
        } else {
          canvasRef.current.style.transform = `translateX(${-x}%) translateY(${y}%) scale(1)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRight]);

  return (
    <section className="relative bg-white mx-0 px-0" style={{ minHeight: serviceLayout ? "100vh" : "auto" }}>
      {serviceLayout && (
        <>
          <div className="pt-10 pb-4 text-center px-4">
            <p className="text-golden font-semibold text-xs uppercase tracking-[0.22em] mb-2">What We Offer</p>
            <h2 className="text-3xl font-bold text-[#011936] mb-2">Our Moving Services</h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">Comprehensive moving solutions tailored to your needs in Melbourne</p>
          </div>
        </>
      )}

      <div ref={canvasRef} className="w-full h-[15vh] mx-0 px-0" style={{ transformOrigin: "center center" }}>
        {!isMobile ? (
          <ModelViewer url="/truck-special-model.glb" width="100%" height="100%" defaultZoom={2.25} enableAutoRotate={false} enableTouchRotate={false} enableMouseParallax={false} fixedRotationY={isRight ? 0 : Math.PI} />
        ) : (
          <ModelViewer url="/truck-special-model.glb" width="100%" height="200%" defaultZoom={1.75} enableAutoRotate={false} enableTouchRotate={false} enableMouseParallax={false} fixedRotationY={isRight ? 0 : Math.PI} />
        )}
      </div>

      {serviceLayout && (
        <div className="px-4 pb-12 space-y-6 mx-0">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white p-6 tracking-wide">
                <h3 className="text-lg font-bold text-[#011936] mb-2 flex items-center gap-2"><Icon className="w-5 h-5 text-[#011936] shrink-0" />{s.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ── Mobile-only canvas with direction="right", no service cards ── */
export function CanvasRightDirectionTruck() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return <MobileLayout isMobile={isMobile} serviceLayout={false} direction="right" />;
}

/* ═══════════════════════════════════════════════ EXPORT ════════════════════════ */
export default function ServicesSection() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return isMobile ? <MobileLayout isMobile={true} /> : <DesktopLayout />;
}