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

/* ── Helpers ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

/* ════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
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
          scrub: 0.4,
          onUpdate: (self) => tick(self.progress),
        });
      });
    })();

    /* ── Every scroll tick ── */
    function tick(p: number) {
      /* Truck rotation via scrollStore (read by R3F useFrame) */
      if (p < 0.25) {
        scrollStore.truckRotationY = Math.PI * 0.3;
      } else if (p < 0.65) {
        scrollStore.truckRotationY = lerp(
          Math.PI * 0.3,
          -Math.PI * 0.3,
          (p - 0.25) / 0.4,
        );
      } else {
        scrollStore.truckRotationY = -Math.PI * 0.3;
      }

      /* Truck scale inside sticky container */
      let sc = 1;
      if (p < 0.2) sc = 1;
      else if (p < 0.5) sc = lerp(1, 0.7, (p - 0.2) / 0.3);
      else sc = 0.7;
      if (canvasRef.current)
        canvasRef.current.style.transform = `scale(${sc})`;

      /* Header fade-out */
      if (headerRef.current) {
        const ho = p < 0.08 ? 1 - p / 0.08 : 0;
        headerRef.current.style.opacity = String(ho);
      }

      /* Timeline line height (grows with scroll) */
      if (timelineLineRef.current) {
        const lp = Math.min(1, Math.max(0, (p - 0.05) / 0.9));
        timelineLineRef.current.style.transform = `scaleY(${lp})`;
      }

      /* Card group fade-in (each card in its group fades together) */
      const thresholds = [0.12, 0.12, 0.42, 0.42, 0.72];
      for (let i = 0; i < services.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const at = thresholds[i];
        const cp = p > at ? Math.min(1, (p - at) / 0.06) : 0;
        el.style.opacity = String(cp);
        el.style.transform = `translateY(${(1 - cp) * 30}px)`;
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
      style={{ height: "500vh" }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header — fades out on scroll */}
        <div
          ref={headerRef}
          className="shrink-0 h-[20%] flex items-center justify-center"
        >
          <div className="text-center px-4">
            <p className="text-golden font-semibold text-xs md:text-sm uppercase tracking-[0.22em] mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#011936] mb-3">
              Our Moving Services
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Comprehensive moving solutions tailored to your needs in
              Melbourne
            </p>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="flex-1 flex min-h-0">
          {/* Left: sticky 3D truck */}
          <div className="w-[45%] relative flex items-center justify-center">
            <div
              ref={canvasRef}
              className="w-full h-full"
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
          </div>

          {/* Right: scrollable timeline + cards */}
          <div className="w-[55%] relative overflow-hidden">
            {/* Timeline vertical golden line */}
            <div
              ref={timelineLineRef}
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-golden origin-top"
              style={{ transform: "scaleY(0)" }}
            />

            {/* Timeline content — tall to allow scrolling */}
            <div className="h-full flex flex-col justify-between py-[8vh] px-10 md:px-14">
              {/* Group 1: services 1-2 (right side) */}
              <div className="flex flex-col gap-10">
                {services.slice(0, 2).map((s, i) => (
                  <div
                    key={s.title}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="pl-8 relative"
                    style={{ opacity: 0 }}
                  >
                    {/* dot */}
                    <div className="absolute left-[-5px] top-[10px] w-[13px] h-[13px] bg-golden rounded-[2px]" />
                    {/* branch */}
                    <div className="absolute left-[8px] top-[15px] w-5 h-[2px] bg-golden" />

                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-9 h-9 bg-golden/10 flex items-center justify-center">
                        <s.icon className="w-[18px] h-[18px] text-golden" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#011936]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-[13px] leading-relaxed ml-[48px]">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Group 2: services 3-4 (left side) */}
              <div className="flex flex-col gap-10">
                {services.slice(2, 4).map((s, i) => {
                  const idx = i + 2;
                  return (
                    <div
                      key={s.title}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      className="pl-8 relative"
                      style={{ opacity: 0 }}
                    >
                      <div className="absolute left-[-5px] top-[10px] w-[13px] h-[13px] bg-golden rounded-[2px]" />
                      <div className="absolute left-[8px] top-[15px] w-5 h-[2px] bg-golden" />

                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-9 h-9 bg-golden/10 flex items-center justify-center">
                          <s.icon className="w-[18px] h-[18px] text-golden" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-[#011936]">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-[13px] leading-relaxed ml-[48px]">
                        {s.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Group 3: service 5 (center/end) */}
              {(() => {
                const s5 = services[4];
                const S5Icon = s5.icon;
                return (
                  <div
                    ref={(el) => {
                      cardRefs.current[4] = el;
                    }}
                    className="pl-8 relative"
                    style={{ opacity: 0 }}
                  >
                    <div className="absolute left-[-5px] top-[10px] w-[13px] h-[13px] bg-golden rounded-[2px]" />
                    <div className="absolute left-[8px] top-[15px] w-5 h-[2px] bg-golden" />

                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-9 h-9 bg-golden/10 flex items-center justify-center">
                        <S5Icon className="w-[18px] h-[18px] text-golden" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#011936]">
                        {s5.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-[13px] leading-relaxed ml-[48px]">
                      {s5.desc}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
