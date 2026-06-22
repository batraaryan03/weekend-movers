"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const tips = [
  {
    q: "1. Start Planning Early",
    a: "Begin your preparations at least 4-6 weeks in advance. Create a moving checklist, sort through your belongings, and declutter. The earlier you start, the smoother the entire process will be.",
  },
  {
    q: "2. Label Your Boxes Clearly",
    a: "Use a clear labeling system for all your boxes. Mark each box with its contents and the room it belongs in. Use color-coded labels for different rooms to make unpacking much easier.",
  },
  {
    q: "3. Protect Fragile Items Properly",
    a: "Wrap fragile items individually in packing paper or bubble wrap. Use sturdy boxes and fill any gaps with packing material. Clearly mark fragile boxes so movers handle them with extra care.",
  },
  {
    q: "4. Prepare Your Home for Moving Day",
    a: "Clear hallways and doorways of any obstacles. Protect floors with cardboard or moving blankets. Make sure there is clear access for the moving truck and that parking is arranged.",
  },
  {
    q: "5. Pack an Essentials Bag",
    a: "Pack a bag with items you'll need immediately: toiletries, phone charger, important documents, medications, snacks, and a change of clothes. Keep this bag with you during the move.",
  },
  {
    q: "6. Understand What Affects Moving Costs",
    a: "Moving costs depend on distance, volume of items, access difficulties (stairs, narrow hallways), and time of year. Get a detailed quote upfront so there are no surprises on moving day.",
  },
];

export default function MovingTips() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 bg-gray-50 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left — description */}
          <div className="md:sticky md:top-24">
            <div className="inline-flex items-center justify-center p-3 bg-white mb-6">
              <Lightbulb className="w-6 h-6 text-[#FFB624]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#011936] mb-6">Moving Tips &amp; Advice</h2>
            <div className="text-gray-700 space-y-4 text-base md:text-lg leading-relaxed">
              <p>
                Looking for the best <strong>moving tips Melbourne</strong> has to offer? Preparation is the key to a successful and efficient move. Whether you&apos;re upgrading to a bigger house or downsizing, knowing <strong>how to prepare for moving day</strong> can save you hours of time and significantly reduce anxiety.
              </p>
              <p>
                We&apos;ve compiled expert <strong>packing advice</strong> straight from our seasoned professionals. By following these simple yet effective guidelines, you&apos;ll ensure your belongings remain safe, your boxes are organized, and your moving day goes off without a hitch.
              </p>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="flex items-center justify-between w-full p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base md:text-lg font-bold text-[#011936] pr-4">{tip.q}</span>
                  <div
                    className={cn(
                      "shrink-0 w-8 h-8 flex items-center justify-center transition-colors",
                      openIndex === i ? "bg-[#FFB624] text-[#011936]" : "bg-gray-100 text-gray-500"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        openIndex === i && "rotate-180"
                      )}
                    />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openIndex === i ? "200px" : "0" }}
                >
                  <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2 text-sm md:text-base">
                    {tip.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
