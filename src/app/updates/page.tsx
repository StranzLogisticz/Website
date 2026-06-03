import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllArticles } from "@/lib/updates";
import UpdatesClient from "./UpdatesClient";

export const metadata = {
  title: "Updates | Stranz Logistics",
  description: "Latest news, network expansions, fleet additions, and technology updates from Stranz Logistics.",
};

const tagColors: Record<string, string> = {
  Network:     "text-blue-700 bg-blue-50 border-blue-100",
  Technology:  "text-cyan-700 bg-cyan-50 border-cyan-100",
  Fleet:       "text-orange-700 bg-orange-50 border-orange-100",
  Partnership: "text-purple-700 bg-purple-50 border-purple-100",
  Facility:    "text-green-700 bg-green-50 border-green-100",
  General:     "text-gray-700 bg-gray-50 border-gray-100",
};

export default function UpdatesPage() {
  const articles = getAllArticles();
  const tags = ["All", ...Array.from(new Set(articles.map((a) => a.tag)))];

  return (
    <div className="bg-white min-h-screen pt-24">

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-eyebrow mb-3">News & Updates</p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#013364] leading-tight mb-4">
            Latest from
            <br />
            <span className="text-gradient-orange">Stranz Logistics</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-xl">
            Network expansions, technology upgrades, fleet additions, and operational milestones.
          </p>
        </div>
      </section>

      {/* Articles grid — filter handled client-side */}
      <UpdatesClient articles={articles} tags={tags} tagColors={tagColors} />

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-10 bg-[#013364] text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to partner with Stranz?</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Get in touch with our operations team for a tailored logistics solution across South India.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF8C00] text-white
                         font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                         hover:shadow-[0_4px_20px_rgba(255,140,0,0.4)] hover:-translate-y-0.5 text-sm"
            >
              Contact Our Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
