"use client";

const suburbs = [
  "Brunswick", "Richmond", "Southbank", "Carlton", "St Kilda", "Docklands",
  "Footscray", "Dandenong", "Werribee", "Point Cook", "Craigieburn", "Preston",
  "Sunshine", "Essendon", "Hawthorn", "Northcote", "Fitzroy", "Toorak",
  "Glen Waverley", "Box Hill",
];

export default function ServiceAreas() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#011936] mb-6">Areas We Service Across Melbourne</h2>
          <div className="max-w-4xl mx-auto text-gray-700 space-y-4 text-base md:text-lg leading-relaxed">
            <p>
              Finding reliable <strong>Melbourne removalists</strong> doesn&apos;t have to be a stressful experience. At Weekend Movers, we pride ourselves on being the go-to team for <strong>house removals Melbourne</strong> wide, bringing years of local expertise to every single job.
            </p>
            <p>
              We also specialize in seamless <strong>office relocation Melbourne</strong> services. We understand that business downtime equals lost revenue, so our skilled crew works efficiently to get your workspace packed, moved, and set up in record time.
            </p>
            <p>
              When you need a <strong>reliable moving company in Melbourne</strong>, look no further. We navigate the busy CBD streets, the narrow laneways, and the sprawling outer suburbs with equal ease.
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {suburbs.map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-center py-3 px-4 bg-gray-50 text-[#011936] font-medium hover:bg-[#011936] hover:text-white transition-colors border border-gray-100"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="text-center text-xl font-semibold text-[#011936]">
            No matter where you&apos;re located in Melbourne, Weekend Movers is ready to deliver safe, efficient and professional moving services.
          </p>
        </div>
      </div>
    </section>
  );
}
