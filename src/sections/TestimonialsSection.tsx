"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";

const trustStats = [
  { label: "98.2%",  sub: "On-Time Delivery Rate" },
  { label: "500+",   sub: "Shipments / Month"      },
  { label: "120+",   sub: "Enterprise Clients"     },
  { label: "50+",    sub: "Vendor Partners"        },
  { label: "0",      sub: "Cargo Loss Incidents"   },
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14 space-y-4"
        >
          <motion.span variants={fadeUp} className="section-eyebrow">
            Track Record
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title">
            Numbers That
            <br />
            <span className="text-gradient-orange">Speak for Themselves</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mx-auto">
            Built on consistent execution, real partnerships, and disciplined operations
            across South India&apos;s industrial corridors.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {trustStats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] p-6 text-center
                         hover:border-[#FF8C00]/30 hover:shadow-[0_4px_20px_rgba(255,140,0,0.08)]
                         transition-all duration-300"
            >
              <p className="text-3xl font-bold text-[#013364]">{s.label}</p>
              <p className="text-xs text-[#94a3b8] mt-2 leading-snug">{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
