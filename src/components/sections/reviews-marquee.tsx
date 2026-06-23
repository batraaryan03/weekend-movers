"use client";

import { Star } from "lucide-react";

const reviews = [
  { name: "Sarah M.", location: "Brunswick", text: "Absolutely fantastic service! The team was professional, careful with our belongings, and finished ahead of schedule. Highly recommend!" },
  { name: "James K.", location: "Richmond", text: "Best moving experience we've ever had. Transparent pricing, no hidden fees, and the movers were incredibly friendly and efficient." },
  { name: "Emily R.", location: "Southbank", text: "Moved our entire 3-bedroom house in just 3 hours. The team was organized, hardworking, and made what could have been stressful into a smooth experience." },
  { name: "Michael T.", location: "Carlton", text: "Used Weekend Movers for our office relocation. They handled everything with minimal downtime. Professional from start to finish." },
  { name: "Lisa W.", location: "St Kilda", text: "Great value for money. The quote was accurate, the team arrived on time, and they took great care with fragile items. Will use again!" },
  { name: "David C.", location: "Footscray", text: "Couldn't be happier with the service. They moved us on a Saturday which was so convenient. The crew was efficient and careful." },
  { name: "Anna P.", location: "Hawthorn", text: "From the initial quote to the final box being unpacked, everything was seamless. Weekend Movers made our move completely stress-free." },
  { name: "Tom H.", location: "Preston", text: "Professional, punctual, and priced fairly. They even helped us with some last-minute furniture assembly. Highly recommended!" },
];

export default function ReviewsMarquee() {
  return (
    <section
      id="reviews"
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Background image — happy customers ── */}
        <img
          src="/special/happy-customers.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-black/25">
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#011936] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">Real reviews from Melbourne locals</p>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex gap-6 animate-reviews-scroll"
            style={{ width: "max-content" }}
          >
            {[...reviews, ...reviews].map((r, i) => (
              <div
                key={i}
                className="w-80 shrink-0 bg-gray-50 border border-gray-100 p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-golden text-golden"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="text-sm">
                  <span className="font-bold text-[#011936]">{r.name}</span>
                  <span className="text-gray-400 mx-1">•</span>
                  <span className="text-gray-500">{r.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
