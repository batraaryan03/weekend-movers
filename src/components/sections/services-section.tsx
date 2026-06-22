"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { invalidate } from "@react-three/fiber";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";
import { scrollStore } from "@/lib/scroll-store";

/* ── Lazy-loaded 3D viewer ── */
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

/* ── Layout per card ── */
type Side = "left" | "right" | "center";
const cardLayout: { side: Side; top: number }[] = [
  { side: "right", top: 32 },  // 1 — right group
  { side: "right", top: 52 },  // 2 — right group
  { side: "left", top: 32 },   // 3 — left group
  { side: "left", top: 52 },   // 4 — left group
  { side: "center", top: 76 }, // 5 — center
];

// scroll-progress thresholds — cards appear in groups
// Group 1 (right cards): both appear together at 0.30
// Group 2 (left cards): both appear together at 0.55
// Group 3 (center card): appears at 0.78
const cardAt = [0.30, 0.30, 0.55, 0.55, 0.78];

/* ── Helpers ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/* ════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          scrub: 0.3,
          onUpdate: (self) => tick(self.progress),
        });
      });
    })();

    /* ── called on every scroll tick ── */
    function tick(p: number) {
      /* Truck X: center → slightly left → right */
      let tx = 0;
      if (p < 0.25) tx = 0;
      else if (p < 0.50) tx = lerp(0, -22, (p - 0.25) / 0.25);
      else if (p < 0.75) tx = lerp(-22, 22, (p - 0.50) / 0.25);
      else tx = 22;

      /* Truck scale: 1 → 0.7 */
      let sc = 1;
      if (p < 0.25) sc = 1;
      else if (p < 0.50) sc = lerp(1, 0.7, (p - 0.25) / 0.25);
      else sc = 0.7;

      /* Truck rotation: starts rotating a little during phase 2, finishes in phase 3 */
      if (p < 0.25) scrollStore.truckRotationY = Math.PI * 0.3;
      else if (p < 0.50) scrollStore.truckRotationY = lerp(Math.PI * 0.3, Math.PI * 0.1, (p - 0.25) / 0.25);
      else if (p < 0.75) scrollStore.truckRotationY = lerp(Math.PI * 0.1, -Math.PI * 0.3, (p - 0.50) / 0.25);
      else scrollStore.truckRotationY = -Math.PI * 0.3;

      /* Apply canvas transform */
      if (canvasRef.current)
        canvasRef.current.style.transform = `translateX(${tx}%) scale(${sc})`;

      /* Header fade-out */
      if (headerRef.current) {
        const ho = p < 0.12 ? 1 - p / 0.12 : 0;
        headerRef.current.style.opacity = String(ho);
        headerRef.current.style.transform = `translateY(${lerp(0, -50, p / 0.15)}px)`;
      }

      /* Timeline vertical line growth */
      if (timelineLineRef.current) {
        const tp = Math.min(1, Math.max(0, (p - 0.18) / 0.78));
        timelineLineRef.current.style.transform = `scaleY(${tp})`;
      }

      /* Timeline wrapper opacity */
      if (timelineWrapRef.current) {
        const to = p < 0.18 ? 0 : Math.min(1, (p - 0.18) / 0.1);
        timelineWrapRef.current.style.opacity = String(to);
      }

      /* Service cards */
      for (let i = 0; i < services.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const cp = p > cardAt[i] ? Math.min(1, (p - cardAt[i]) / 0.07) : 0;
        el.style.opacity = String(cp);
        el.style.transform = `translateY(${(1 - cp) * 28}px)`;
      }

      invalidate(); // trigger R3F render
    }

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: "400vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div
          ref={headerRef}
          className="absolute top-0 left-0 right-0 h-[20%] flex items-center justify-center z-20"
        >
          <div className="text-center px-4">
            <p className="text-golden font-semibold text-xs md:text-sm uppercase tracking-[0.22em] mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-3">
              Our Moving Services
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive moving solutions tailored to your needs in Melbourne
            </p>
          </div>
        </div>

        {/* 3D Canvas — full width/height, transforms driven by scroll */}
        <div
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ transformOrigin: "center center" }}
        >
          <ModelViewer
            url="/truck-special-model.glb"
            width="100%"
            height="100%"
            defaultZoom={3}
            enableMouseParallax
          />
        </div>

        {/* ── Timeline + service cards ── */}
        <div
          ref={timelineWrapRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          {/* Vertical golden line */}
          <div
            ref={timelineLineRef}
            className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-golden origin-top"
            style={{ top: "20%", bottom: "8%", transform: "scaleY(0)" }}
          />

          {/* Dots on the line */}
          {cardLayout.map((l, i) => (
            <div
              key={`d${i}`}
              className="absolute w-3 h-3 bg-golden rounded-sm z-10"
              style={{
                top: `${l.top}%`,
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}

          {/* Branch lines (skip center card) */}
          {cardLayout.map((l, i) => {
            if (l.side === "center") return null;
            const right = l.side === "right";
            return (
              <div
                key={`b${i}`}
                className="absolute h-[2px] bg-golden"
                style={{
                  top: `${l.top}%`,
                  width: "36px",
                  left: right ? "calc(50% + 6px)" : undefined,
                  right: right ? undefined : "calc(50% + 6px)",
                  transform: "translateY(-50%)",
                }}
              />
            );
          })}

          {/* Service cards */}
          {services.map((s, i) => {
            const l = cardLayout[i];
            const right = l.side === "right";
            const center = l.side === "center";

            const posStyle: React.CSSProperties = {
              top: `${l.top}%`,
              width: "max(260px,20vw)",
              maxWidth: "360px",
            };
            if (center) {
              posStyle.left = "50%";
              posStyle.transform = "translateX(-50%)";
            } else if (right) {
              posStyle.left = "calc(50% + 48px)";
            } else {
              posStyle.right = "calc(50% + 48px)";
            }

            return (
              <div key={s.title} className="absolute" style={posStyle}>
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-lg">
                    <div className="bg-golden/10 w-11 h-11 flex items-center justify-center mb-3 rounded-lg">
                      <s.icon className="w-5 h-5 text-[#011936]" />
                    </div>
                    <h3 className="text-base font-bold text-[#011936] mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
