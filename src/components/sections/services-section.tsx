"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { invalidate } from "@react-three/fiber";
import { Home, Building2, Briefcase, Package, Wrench } from "lucide-react";
import { scrollStore } from "@/lib/scroll-store";

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

/* ── Card layout positions ── */
const cardPositions = [
  { side: "right" as const, top: 28 },  // 1
  { side: "right" as const, top: 52 },  // 2
  { side: "left" as const, top: 28 },   // 3
  { side: "left" as const, top: 52 },   // 4
  { side: "center" as const, top: 78 }, // 5
];

/* ── Scroll thresholds for card groups ── */
const groupThresholds = [
  { start: 0.25, cards: [0, 1] },  // right cards appear
  { start: 0.52, cards: [2, 3] },  // left cards appear
  { start: 0.76, cards: [4] },     // center card
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/* ════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
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
          scrub: 0.4,
          onUpdate: (self) => tick(self.progress),
        });
      });
    })();

    function tick(p: number) {
      /* ── Header ── */
      if (headerRef.current) {
        const ho = p < 0.08 ? 1 - p / 0.08 : 0;
        headerRef.current.style.opacity = String(ho);
        headerRef.current.style.transform = `translateY(${lerp(0, -40, p / 0.1)}px)`;
      }

      /* ── Truck X: center → LEFT (-16%) → RIGHT (+24%) ── */
      let tx = 0;
      if (p < 0.22) tx = 0;
      else if (p < 0.48) tx = lerp(0, -16, (p - 0.22) / 0.26);
      else if (p < 0.72) tx = lerp(-16, 24, (p - 0.48) / 0.24);
      else tx = 24;

      /* ── Truck scale ── */
      let sc = 1;
      if (p < 0.22) sc = 1;
      else if (p < 0.48) sc = lerp(1, 0.7, (p - 0.22) / 0.26);
      else sc = 0.7;

      if (canvasRef.current)
        canvasRef.current.style.transform = `translateX(${tx}%) scale(${sc})`;

      /* ── Truck rotation ── */
      if (p < 0.22) {
        scrollStore.truckRotationY = Math.PI * 0.3;
      } else if (p < 0.48) {
        scrollStore.truckRotationY = lerp(Math.PI * 0.3, Math.PI * 0.15, (p - 0.22) / 0.26);
      } else if (p < 0.72) {
        scrollStore.truckRotationY = lerp(Math.PI * 0.15, -Math.PI * 0.3, (p - 0.48) / 0.24);
      } else {
        scrollStore.truckRotationY = -Math.PI * 0.3;
      }

      /* ── Timeline ── */
      if (timelineRef.current) {
        const to = p < 0.20 ? 0 : Math.min(1, (p - 0.20) / 0.08);
        timelineRef.current.style.opacity = String(to);
      }
      if (lineRef.current) {
        const lp = Math.min(1, Math.max(0, (p - 0.20) / 0.75));
        lineRef.current.style.transform = `scaleY(${lp})`;
      }

      /* ── Cards ── */
      const isTruckMovingRight = p >= 0.48;

      for (const group of groupThresholds) {
        for (const ci of group.cards) {
          const el = cardRefs.current[ci];
          if (!el) continue;
          const isRightCard = cardPositions[ci].side === "right";

          // RIGHT cards fade out when truck moves right
          if (isRightCard && isTruckMovingRight) {
            const fadeOut = Math.min(1, (p - 0.48) / 0.08);
            el.style.opacity = String(Math.max(0, 1 - fadeOut));
            el.style.transform = `translateY(${fadeOut * 24}px)`;
            continue;
          }

          // LEFT cards and CENTER card: fade in at their threshold
          const cp = p > group.start ? Math.min(1, (p - group.start) / 0.06) : 0;
          el.style.opacity = String(cp);
          el.style.transform = `translateY(${(1 - cp) * 24}px)`;
        }
      }

      invalidate();
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

        {/* ── Full-width 3D canvas ── */}
        <div
          ref={canvasRef}
          className="absolute left-0 right-0 top-[20%] bottom-0 z-0"
          style={{ transformOrigin: "center center" }}
        >
          <ModelViewer
            url="/truck-special-model.glb"
            width="100%"
            height="100%"
            defaultZoom={2.5}
            enableMouseParallax
          />
        </div>

        {/* ── Timeline + cards overlay ── */}
        <div
          ref={timelineRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          {/* Vertical golden line — full height */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-golden origin-top"
            style={{ top: "20%", bottom: "4%", transform: "scaleY(0)" }}
          />

          {/* Dots */}
          {cardPositions.map((pos, i) => (
            <div
              key={`d${i}`}
              className="absolute w-3.5 h-3.5 bg-golden rounded-[2px] z-10"
              style={{
                top: `${pos.top}%`,
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Branch lines */}
          {cardPositions.map((pos, i) => {
            if (pos.side === "center") return null;
            const right = pos.side === "right";
            return (
              <div
                key={`b${i}`}
                className="absolute h-[2px] bg-golden"
                style={{
                  top: `${pos.top}%`,
                  width: "36px",
                  left: right ? "calc(50% + 7px)" : undefined,
                  right: right ? undefined : "calc(50% + 7px)",
                  transform: "translateY(-50%)",
                }}
              />
            );
          })}

          {/* Service cards */}
          {services.map((s, i) => {
            if (i === 4) return null; // rendered separately below
            const pos = cardPositions[i];
            const right = pos.side === "right";

            const posStyle: React.CSSProperties = {
              top: `${pos.top}%`,
              width: "max(280px, 24vw)",
              maxWidth: "360px",
            };
            if (right) {
              posStyle.left = "calc(50% + 50px)";
            } else {
              posStyle.right = "calc(50% + 50px)";
            }

            const Icon = s.icon;

            return (
              <div key={s.title} className="absolute" style={posStyle}>
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  style={{ opacity: 0 }}
                >
                  <h3 className="text-base font-bold text-[#011936] mb-2 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#011936]" />
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Center card 5 — white background */}
          <div
            className="absolute"
            style={{
              top: "78%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "max(280px, 24vw)",
              maxWidth: "360px",
            }}
          >
            <div
              ref={(el) => { cardRefs.current[4] = el; }}
              style={{ opacity: 0 }}
            >                <div className="bg-white px-6 py-5">
                  <h3 className="text-base font-bold text-[#011936] mb-2 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#011936]" />
                    {services[4].title}
                  </h3>
                <p className="text-gray-400 text-sm leading-relaxed ml-[52px]">
                  {services[4].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
