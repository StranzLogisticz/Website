"use client";

import { motion } from "framer-motion";
import { ClipboardList, Truck, Radio, PackageCheck, FileText } from "lucide-react";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";

const steps = [
  {
    id: "01", icon: ClipboardList, title: "Requirement Synthesis", subtitle: "Request",
    description: "Collaborative assessment of load profiles, volumetric data, and route auditing to finalize the optimal vehicle class for your shipment.",
    color: "bg-blue-50 border-blue-100 text-blue-600",
  },
  {
    id: "02", icon: Truck, title: "Strategic Dispatch", subtitle: "Assign",
    description: "Dynamic load balancing and precise asset-to-route allocation. The right vehicle, the right driver, the right time — zero-latency placement.",
    color: "bg-orange-50 border-orange-100 text-[#FF8C00]",
  },
  {
    id: "03", icon: Radio, title: "Telemetry Monitoring", subtitle: "Track",
    description: "Real-time transit monitoring using predictive tracking and proactive driver-corridor management with GPS-verified checkpoints.",
    color: "bg-cyan-50 border-cyan-100 text-cyan-600",
  },
  {
    id: "04", icon: PackageCheck, title: "Diagnostic Offloading", subtitle: "Deliver",
    description: "Cargo integrity verification at the delivery point with automated, tamper-proof digital e-POD issuance and client signature capture.",
    color: "bg-green-50 border-green-100 text-green-600",
  },
  {
    id: "05", icon: FileText, title: "Automated Invoicing", subtitle: "Invoice",
    description: "Immediate invoice generation post-delivery confirmation with structured billing, GST compliance, and digital dispatch to clients.",
    color: "bg-purple-50 border-purple-100 text-purple-600",
  },
];

export default function WorkflowSection() {
  return (
    <section className="relative bg-[#f8fafc] section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="text-center mb-16 md:mb-20 space-y-4"
        >
          <motion.span variants={fadeUp} className="section-eyebrow">Operational Engineering</motion.span>
          <motion.h2 variants={fadeUp} className="section-title">
            How We Execute
            <br />
            <span className="text-gradient-orange">Every Shipment</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mx-auto">
            A precision-engineered 5-step process that takes your freight
            from request to confirmed delivery — with full transparency.
          </motion.p>
        </motion.div>

        {/* Desktop horizontal */}
        <div className="hidden lg:block">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="relative"
          >
            {/* Connector */}
            <div className="absolute top-11 left-[10%] right-[10%] h-0.5
                            bg-gradient-to-r from-transparent via-[#FF8C00]/30 to-transparent" />

            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <DesktopStep key={step.id} step={step} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
            className="relative"
          >
            <div className="absolute left-6 top-8 bottom-8 w-0.5
                            bg-gradient-to-b from-transparent via-[#FF8C00]/30 to-transparent" />
            {steps.map((step, index) => (
              <MobileStep key={step.id} step={step} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DesktopStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative mb-8">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className={`w-[52px] h-[52px] rounded-2xl border-2 flex items-center justify-center
                      transition-all duration-300 group-hover:scale-105 shadow-sm ${step.color}`}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        {/* Step number badge */}
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#013364]
                        flex items-center justify-center shadow-sm">
          <span className="text-[9px] font-bold text-white">{step.id}</span>
        </div>
      </div>

      <div className="space-y-2 px-1">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-[#e2e8f0]
                         text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8]">
          {step.subtitle}
        </span>
        <h3 className="text-sm font-semibold text-[#013364] leading-snug">{step.title}</h3>
        <p className="text-xs text-[#475569] leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

function MobileStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: index * 0.1 }}
      className="flex gap-5 pb-10"
    >
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center
                         relative shadow-sm ${step.color}`}>
          <Icon className="w-5 h-5" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#013364]
                          flex items-center justify-center shadow-sm">
            <span className="text-[9px] font-bold text-white">{step.id}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 pt-1.5 space-y-2">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#FF8C00]">
          {step.subtitle}
        </span>
        <h3 className="text-base font-semibold text-[#013364]">{step.title}</h3>
        <p className="text-sm text-[#475569] leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}
