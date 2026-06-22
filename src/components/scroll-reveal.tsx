"use client";

import { useEffect, useRef } from "react";

let gsapPromise: Promise<typeof import("gsap")> | null = null;
let scrollTriggerPromise: Promise<typeof import("gsap/ScrollTrigger")> | null = null;

function loadGsap() {
  if (!gsapPromise) gsapPromise = import("gsap");
  return gsapPromise;
}

function loadScrollTrigger() {
  if (!scrollTriggerPromise) scrollTriggerPromise = import("gsap/ScrollTrigger");
  return scrollTriggerPromise;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let anim: ReturnType<typeof import("gsap").gsap.fromTo> | null = null;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([loadGsap(), loadScrollTrigger()]);
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      anim = gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    })();

    return () => {
      loadScrollTrigger().then((stMod) => {
        stMod.ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === el) t.kill();
        });
      });
      if (anim && "kill" in anim) (anim as { kill: () => void }).kill();
    };
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
