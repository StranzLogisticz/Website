"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Eye, DollarSign, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportConfig } from "@/animations/variants";

const pillars = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Strict handling protocols, SOPs on every shipment, and compliance across all fleet operations. We never compromise on cargo security.",
    highlight: "Zero-compromise standards",
  },
  {
    icon: Zap,
    title: "Speed Guaranteed",
    description:
      "Optimized routes, pre-positioned assets, and proactive dispatch coordination ensure your freight moves without unnecessary delays.",
    highlight: "On-time delivery commitment",
  },
  {
    icon: Eye,
    title: "Full Visibility",
    description:
      "Real-time GPS tracking, live status updates, and transparent reporting give you complete oversight of every active shipment.",
    highlight: "GPS-verified, end-to-end",
  },
  {
    icon: DollarSign,
    title: "Cost Efficiency",
    description:
      "Competitive pricing, consolidated routes, and bulk vendor agreements translate into maximum value without cutting quality.",
    highlight: "Optimized operational spend",
  },
  {
    icon: Building2,
    title: "Enterprise Ready",
    description:
      "Scalable logistics infrastructure, dedicated coordinators, and structured reporting built for high-volume enterprise requirements.",
    highlight: "Designed for growth",
  },
];

const differentiators = [
  "Dedicated logistics coordinator per shipment",
  "Closed-body vehicles for cargo protection",
  "Tamper-proof digital e-POD issuance",
  "Structured billing and GST compliance",
  "Vetted driver and vendor network",
  "Multi-city South India coverage",
];

export default function WhyStranzSection() {
  return (
    <section className="relative bg-[#f8fafc] section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 md:mb-20"
        >
          <div className="space-y-5">
            <motion.span variants={fadeLeft} className="section-eyebrow">
              Why Stranz
            </motion.span>
            <motion.h2 variants={fadeLeft} className="section-title">
              Operational Excellence
              <br />
              <span className="text-gradient-orange">Is Our Standard</span>
            </motion.h2>
            <motion.p variants={fadeLeft} className="section-subtitle">
              Five core pillars that define how Stranz operates — and why
              enterprises trust us to move their most critical freight.
            </motion.p>
          </div>

          <motion.div
            variants={fadeRight}
            className="rounded-2xl p-6 bg-white border border-[#e2e8f0]
                       shadow-[0_1px_3px_rgba(1,51,100,0.04),0_4px_16px_rgba(1,51,100,0.05)]
                       space-y-3"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#FF8C00] mb-4">
              What Sets Us Apart
            </p>
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FFF3E0] border border-[#FF8C00]/30
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                </div>
                <p className="text-sm text-[#475569]">{item}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl p-7 bg-white border border-[#e2e8f0]
                            hover:border-[#FF8C00]/30 hover:shadow-[0_4px_24px_rgba(255,140,0,0.1)]
                            transition-all duration-300
                            ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFF3E0]
                                to-transparent opacity-0 group-hover:opacity-40 transition-opacity
                                duration-300 pointer-events-none" />

                <div className="relative space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] border border-[#FF8C00]/20
                                    flex items-center justify-center group-hover:bg-[#FF8C00]/15
                                    transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#FF8C00]" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
                      <span className="text-[10px] font-semibold text-green-700 tracking-wide">
                        {pillar.highlight}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#013364]">{pillar.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 rounded-2xl p-8 md:p-10 relative overflow-hidden
                     bg-[#013364] border border-[#013364]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF8C00]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Ready to upgrade your logistics?
              </h3>
              <p className="text-white/60 text-sm">
                Talk to our team and get a custom quote within 24 hours.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF8C00] text-white
                           font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                           hover:shadow-[0_4px_20px_rgba(255,140,0,0.4)] hover:-translate-y-0.5 text-sm"
              >
                Get Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919566952888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10
                           border border-white/20 text-white font-semibold rounded-xl
                           hover:bg-white/15 transition-all duration-300 text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
