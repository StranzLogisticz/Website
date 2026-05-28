"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Weight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

const fleet = [
  {
    category: "small",
    label: "Small-Scale (City)",
    vehicles: [
      {
        name: "Tata Ace (7ft)",
        payload: "1.5 Tons",
        dimensions: "7ft body length",
        bodyType: "Open / Closed",
        ideal: "City deliveries, last-mile",
        desc: "Ideal for city deliveries, last-mile logistics, and small-volume consignments within metro areas.",
        tags: ["City", "Last-Mile"],
        image: "/img/tata-ace.png",
      },
      {
        name: "14ft Labh Container",
        payload: "3.5T / 4T / 5T",
        dimensions: "14ft body length",
        bodyType: "Closed Body",
        ideal: "Inter-district movement",
        desc: "Versatile small container for inter-district movement and compact commercial loads.",
        tags: ["City", "Inter-District"],
        image: "/img/truck-14ft.png",
      },
    ],
  },
  {
    category: "medium",
    label: "Medium-Scale (Inter-city)",
    vehicles: [
      {
        name: "17ft Closed Body",
        payload: "5T / 7T / 9T",
        dimensions: "17ft body length",
        bodyType: "Closed Body",
        ideal: "FMCG, electronics",
        desc: "High-volume inter-city transport with fully closed body for weather and tamper protection.",
        tags: ["Inter-city", "Closed Body"],
        image: "/img/truck-17ft.png",
      },
      {
        name: "19ft / 20ft Truck",
        payload: "Up to 9 Tons",
        dimensions: "19–20ft body length",
        bodyType: "Open / Closed",
        ideal: "Manufacturing, retail",
        desc: "Standard inter-city workhorse for FMCG, retail, and manufacturing freight.",
        tags: ["Inter-city", "FMCG"],
        image: "/img/truck-19ft.png",
      },
    ],
  },
  {
    category: "heavy",
    label: "Heavy-Scale (Industrial)",
    vehicles: [
      {
        name: "22ft / 24ft SXL/MXL",
        payload: "7T – 15 Tons",
        dimensions: "22–24ft body length",
        bodyType: "SXL / MXL",
        ideal: "Industrial, project cargo",
        desc: "Heavy industrial transport with extended containers for large-volume manufacturing and project cargo.",
        tags: ["Industrial", "SXL/MXL"],
        image: "/img/truck-24ft.png",
      },
      {
        name: "32ft MXL / SXL",
        payload: "7T – 18 Tons",
        dimensions: "32ft body length",
        bodyType: "MXL / SXL",
        ideal: "Long-haul, heavy freight",
        desc: "Full-capacity long-haul freight. Largest closed-body option in our fleet for maximum tonnage.",
        tags: ["Long-Haul", "Heavy"],
        image: "/img/truck-32ft.png",
      },
    ],
  },
];

const filterOptions = [
  { key: "all", label: "All Fleet" },
  { key: "small", label: "Small-Scale (City)" },
  { key: "medium", label: "Medium-Scale (Inter-city)" },
  { key: "heavy", label: "Heavy-Scale (Industrial)" },
];

const fleetEntries = [
  { size: "7ft – Ace",      payload: "1.5T",  pct: 15,  category: "City"       },
  { size: "14ft Container", payload: "5T",    pct: 30,  category: "City"       },
  { size: "17ft Closed",    payload: "9T",    pct: 45,  category: "Inter-city" },
  { size: "19ft / 20ft",    payload: "9T",    pct: 55,  category: "Inter-city" },
  { size: "22ft / 24ft",    payload: "15T",   pct: 75,  category: "Industrial" },
  { size: "32ft MXL/SXL",   payload: "18T",   pct: 100, category: "Long-Haul"  },
];

function FleetSpectrumVisual() {
  return (
    <div className="relative">
      <div className="absolute -top-3 -right-3 z-10 bg-white border border-[#e2e8f0] rounded-xl px-3 py-2 shadow-sm">
        <span className="text-[10px] font-bold text-[#013364]">500+ Trips/Month</span>
      </div>
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_4px_24px_rgba(1,51,100,0.08)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF8C00]" />
          <span className="text-xs font-semibold text-[#013364]">Fleet Capacity Spectrum</span>
        </div>

        <div className="space-y-3">
          {fleetEntries.map((entry, i) => (
            <motion.div
              key={entry.size}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <span className="text-sm font-semibold text-[#013364] w-36 flex-shrink-0">{entry.size}</span>
              <div className="flex-1 bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#013364] to-[#FF8C00] rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${entry.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] font-bold text-[#FF8C00] bg-[#FFF3E0] px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                {entry.payload}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {["6 Vehicle Types", "1.5T – 18T Range", "City to Long-Haul"].map((pill) => (
            <span
              key={pill}
              className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] text-[#475569]"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FleetPageContent() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? fleet : fleet.filter((f) => f.category === active);

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
              <motion.span variants={fadeUp} className="section-eyebrow">Fleet Asset Base</motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-[#013364] leading-tight">
                Our Fleet —
                <br />
                <span className="text-gradient-orange">7ft to 32ft</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
                From city-level last-mile delivery to long-haul heavy freight — our fleet
                covers every scale of logistics requirement with dedicated vehicle types.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <FleetSpectrumVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter + Fleet Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActive(opt.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${active === opt.key
                    ? "bg-[#013364] text-white shadow-[0_4px_16px_rgba(1,51,100,0.2)]"
                    : "bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#013364] hover:border-[#013364]/20"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Fleet categories */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {filtered.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-[#e2e8f0]" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#94a3b8] px-3">
                      {category.label}
                    </span>
                    <div className="h-px flex-1 bg-[#e2e8f0]" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {category.vehicles.map((vehicle) => (
                      <motion.div
                        key={vehicle.name}
                        whileHover={{ y: -4 }}
                        className="group rounded-2xl bg-white border border-[#e2e8f0] overflow-hidden
                                   hover:border-[#FF8C00]/30 hover:shadow-[0_4px_24px_rgba(255,140,0,0.1)]
                                   transition-all duration-300"
                      >
                        {/* Truck image */}
                        <div className="relative h-48 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-center overflow-hidden px-6 py-4">
                          <Image
                            src={vehicle.image}
                            alt={vehicle.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          {/* Name + payload badge */}
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-lg font-bold text-[#013364]">{vehicle.name}</h4>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                            bg-[#FFF3E0] border border-[#FF8C00]/20 flex-shrink-0">
                              <Weight className="w-3.5 h-3.5 text-[#FF8C00]" />
                              <span className="text-[11px] font-bold text-[#FF8C00]">{vehicle.payload}</span>
                            </div>
                          </div>

                          <p className="text-sm text-[#475569] leading-relaxed">{vehicle.desc}</p>

                          {/* Spec grid */}
                          <div className="grid grid-cols-3 gap-3 pt-1">
                            {[
                              { label: "Size", value: vehicle.dimensions },
                              { label: "Body", value: vehicle.bodyType },
                              { label: "Best For", value: vehicle.ideal },
                            ].map((spec) => (
                              <div key={spec.label} className="rounded-lg bg-[#f8fafc] border border-[#e2e8f0] p-2.5">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1">
                                  {spec.label}
                                </p>
                                <p className="text-xs font-semibold text-[#013364] leading-tight">{spec.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {vehicle.tags.map((tag) => (
                              <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full
                                                          bg-white border border-[#e2e8f0] text-[#94a3b8]
                                                          tracking-wider uppercase">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-sm text-[#FF8C00]
                                       hover:text-[#E07800] transition-colors font-semibold"
                          >
                            Request Quote
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
            <h3 className="text-2xl md:text-3xl font-bold text-white">Need a specific vehicle?</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              We have the right fleet for every load. Tell us your requirements
              and our team will recommend the optimal vehicle.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF8C00] text-white
                         font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                         hover:shadow-[0_4px_20px_rgba(255,140,0,0.4)] hover:-translate-y-0.5 text-sm"
            >
              Get Fleet Recommendation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
