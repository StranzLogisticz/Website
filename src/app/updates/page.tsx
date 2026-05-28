"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

const updates = [
  {
    slug:     "south-india-corridor-expansion",
    date:     "May 2025",
    tag:      "Network",
    title:    "Expanded Coverage: Coimbatore–Hosur Industrial Corridor",
    excerpt:  "Stranz has added dedicated routes covering the Coimbatore to Hosur belt — serving the growing auto-component and electronics manufacturing clusters along this corridor.",
  },
  {
    slug:     "epod-digital-invoicing-launch",
    date:     "April 2025",
    tag:      "Technology",
    title:    "e-POD & Digital Invoicing Now Live",
    excerpt:  "Our digital Proof of Delivery system is now active across all routes. Clients receive auto-generated e-PODs immediately on delivery confirmation, eliminating paper-based reconciliation.",
  },
  {
    slug:     "new-32ft-mxl-fleet-addition",
    date:     "March 2025",
    tag:      "Fleet",
    title:    "New 32ft MXL Units Added to Heavy Fleet",
    excerpt:  "We've expanded our heavy-duty fleet with additional 32ft MXL containers, increasing capacity for long-haul industrial freight between Chennai, Bangalore, and Coimbatore.",
  },
  {
    slug:     "jit-automotive-partnership",
    date:     "February 2025",
    tag:      "Partnership",
    title:    "JIT Logistics Agreement with Tier-1 Auto Supplier",
    excerpt:  "Stranz has signed a Just-In-Time logistics contract with a major Tier-1 automotive supplier operating in the Oragadam industrial cluster, ensuring zero-buffer transit for engine components.",
  },
  {
    slug:     "gps-live-tracking-rollout",
    date:     "January 2025",
    tag:      "Technology",
    title:    "Live GPS Tracking Rolled Out Across All Fleet",
    excerpt:  "All active vehicles in the Stranz network are now GPS-tracked in real time. Clients can monitor their shipments end-to-end through our coordinator dashboard.",
  },
  {
    slug:     "warehousing-facility-chennai",
    date:     "December 2024",
    tag:      "Facility",
    title:    "New Warehousing Facility — Chennai",
    excerpt:  "Stranz has commissioned a new SOC-compliant warehousing facility in North Chennai, adding 15,000 sq ft of structured storage capacity for FMCG and industrial clients.",
  },
];

const tagColors: Record<string, string> = {
  Network:     "text-blue-700 bg-blue-50 border-blue-100",
  Technology:  "text-cyan-700 bg-cyan-50 border-cyan-100",
  Fleet:       "text-orange-700 bg-orange-50 border-orange-100",
  Partnership: "text-purple-700 bg-purple-50 border-purple-100",
  Facility:    "text-green-700 bg-green-50 border-green-100",
};

const feedDotColors: Record<string, string> = {
  Network:     "bg-blue-400",
  Technology:  "bg-cyan-400",
  Fleet:       "bg-orange-400",
  Partnership: "bg-purple-400",
  Facility:    "bg-green-400",
};

const feedItems = [
  { tag: "Network",     title: "Coimbatore–Hosur Corridor",   date: "May 2025"  },
  { tag: "Technology",  title: "e-POD System Now Live",        date: "Apr 2025"  },
  { tag: "Fleet",       title: "32ft MXL Fleet Expanded",      date: "Mar 2025"  },
  { tag: "Partnership", title: "JIT Auto Supplier Agreement",  date: "Feb 2025"  },
  { tag: "Technology",  title: "GPS Tracking on All Vehicles", date: "Jan 2025"  },
];

function ActivityFeedVisual() {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] shadow-[0_4px_24px_rgba(1,51,100,0.08)] bg-white p-5 space-y-4 max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="animate-pulse w-2 h-2 rounded-full bg-[#FF8C00] inline-block" />
          <span className="text-xs font-semibold text-[#013364]">Live Updates</span>
        </div>
        <span className="text-xs text-[#94a3b8]">6 posts</span>
      </div>
      <div className="space-y-3">
        {feedItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${feedDotColors[item.tag] ?? "bg-gray-400"}`} />
            <div>
              <p className="text-xs font-semibold text-[#013364] leading-tight">{item.title}</p>
              <p className="text-[10px] text-[#94a3b8]">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-[#94a3b8]">Updated regularly</p>
    </div>
  );
}

export default function UpdatesPage() {
  const [activeTag, setActiveTag] = useState("All");
  const filterOptions = ["All", "Network", "Technology", "Fleet", "Partnership", "Facility"];
  const filtered = activeTag === "All" ? updates : updates.filter(u => u.tag === activeTag);

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-[#f8fafc]">
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-5">
              <motion.span variants={fadeUp} className="section-eyebrow">News & Updates</motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-[#013364] leading-tight">
                Latest from
                <br />
                <span className="text-gradient-orange">Stranz Logistics</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
                Network expansions, technology upgrades, fleet additions, and operational milestones.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <ActivityFeedVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Updates grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {filterOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-[#013364] text-white shadow-[0_4px_16px_rgba(1,51,100,0.2)]"
                    : "bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#013364] hover:border-[#013364]/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.slug}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-2xl bg-white border border-[#e2e8f0] p-6 space-y-4
                             hover:border-[#FF8C00]/30 hover:shadow-[0_4px_24px_rgba(255,140,0,0.08)]
                             transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border
                                      tracking-wider uppercase ${tagColors[post.tag] ?? "text-gray-600 bg-gray-50 border-gray-100"}`}>
                      <Tag className="w-2.5 h-2.5 inline mr-1" />
                      {post.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-base font-bold text-[#013364] leading-snug
                                   group-hover:text-[#FF8C00] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{post.excerpt}</p>
                  </div>

                  <div className="pt-2 border-t border-[#e2e8f0]">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                                     text-[#FF8C00] group-hover:gap-2.5 transition-all duration-200">
                      Read Update
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 rounded-2xl p-8 md:p-10 bg-[#013364] text-center space-y-4"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
