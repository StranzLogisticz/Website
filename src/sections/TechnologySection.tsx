"use client";

import { motion } from "framer-motion";
import { Code2, BarChart3, FileCheck, Cpu, Database, Layers } from "lucide-react";
import { fadeUp, fadeLeft, staggerContainer, viewportConfig } from "@/animations/variants";

const techFeatures = [
  { icon: BarChart3, title: "Operations Dashboard",      description: "Real-time visibility into every active shipment, route, and fleet status — all in one unified control panel." },
  { icon: FileCheck, title: "Digital e-POD System",      description: "Automated, tamper-proof proof-of-delivery issuance with GPS-verified timestamps and client acknowledgement." },
  { icon: Database,  title: "Fleet Management Software", description: "Proprietary system for vehicle allocation, maintenance scheduling, driver assignment, and compliance tracking." },
  { icon: Cpu,       title: "Vendor Management Portal",  description: "Centralized vendor onboarding, rate management, performance scoring, and payment tracking in one system." },
  { icon: Layers,    title: "Invoice Automation",        description: "Structured billing pipeline from shipment completion to invoice generation, reducing manual touchpoints." },
  { icon: Code2,     title: "Custom Business Systems",   description: "Stranz builds internal operational software tailored for logistics companies — scalable, efficient, enterprise-ready." },
];

export default function TechnologySection() {
  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      {/* Subtle dot bg */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="space-y-7"
          >
            <motion.span variants={fadeLeft} className="section-eyebrow">Technology</motion.span>

            <motion.h2 variants={fadeLeft} className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#013364] leading-tight">
              We Don&apos;t Just
              <br />
              Move Freight —
              <br />
              <span className="text-gradient-orange">We Engineer It</span>
            </motion.h2>

            <motion.p variants={fadeLeft} className="text-[#475569] leading-relaxed text-lg">
              Beyond physical logistics, Stranz develops proprietary operational
              software that powers our internal systems — from fleet coordination
              to digital invoicing and HR management.
            </motion.p>

            <motion.div variants={fadeLeft} className="space-y-3">
              {[
                "Built for logistics operations from the ground up",
                "Real-time data across all active routes and assets",
                "Automated document generation and compliance tracking",
                "Scalable architecture designed for enterprise deployment",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFF3E0] border border-[#FF8C00]/30
                                  flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                  </div>
                  <p className="text-sm text-[#475569]">{point}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeLeft}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-[#FFF3E0] border border-[#FF8C00]/20 text-[#FF8C00] text-sm font-semibold">
                <Code2 className="w-4 h-4" />
                Proprietary Logistics Tech Stack
              </span>
            </motion.div>
          </motion.div>

          {/* Right — feature grid */}
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {techFeatures.map((feature) => (
              <TechCard key={feature.title} feature={feature} />
            ))}
          </motion.div>
        </div>


      </div>
    </section>
  );
}

function TechCard({ feature }: { feature: typeof techFeatures[0] }) {
  const Icon = feature.icon;
  return (
    <motion.div
      variants={fadeUp} whileHover={{ y: -3 }}
      className="group rounded-xl p-5 bg-white border border-[#e2e8f0]
                 hover:border-[#FF8C00]/30 hover:shadow-[0_4px_16px_rgba(255,140,0,0.1)]
                 transition-all duration-300"
    >
      <div className="w-9 h-9 rounded-lg bg-[#FFF3E0] border border-[#FF8C00]/20
                      flex items-center justify-center mb-4 group-hover:bg-[#FF8C00]/15
                      transition-colors duration-300">
        <Icon className="w-4 h-4 text-[#FF8C00]" />
      </div>
      <h3 className="text-sm font-semibold text-[#013364] mb-2">{feature.title}</h3>
      <p className="text-xs text-[#475569] leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}
