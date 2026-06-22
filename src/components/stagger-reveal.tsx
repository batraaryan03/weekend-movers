"use client";

import { useEffect, useRef } from "react";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  duration?: number;
}

export default function StaggerReveal({
  children,
  className = "",
  stagger = 0.12,
  y = 25,
  duration = 0.6,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = el.querySelectorAll(":scope > *");
    if (cards.length === 0) return;

    let killed = false;
    let triggers: any[] = [];

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.gsap;
      gsap.registerPlugin(stMod.ScrollTrigger);

      if (killed) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      triggers = stMod.ScrollTrigger.getAll().filter(
        (t: any) => t.trigger === el
      );
    })();

    return () => {
      killed = true;
      triggers.forEach((t) => t.kill());
    };
  }, [stagger, y, duration]);

  // Container is visible by default — GSAP animates children from opacity 0
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
