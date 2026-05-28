"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Target, RotateCcw, ArrowRight, Download } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportConfig } from "@/animations/variants";

const offerings = [
  { title: "Full Truck Load (FTL)", desc: "Dedicated vehicle for faster transit and cargo safety." },
  { title: "Closed Truck Services", desc: "Protection from weather and external exposure for sensitive goods." },
  { title: "Cargo Transportation", desc: "Industrial, consumer, and special consignments with safe handling." },
  { title: "Custom Logistics", desc: "Tailored solutions based on cargo type and delivery timelines." },
];

const industries = [
  "FMCG & Consumer Goods",
  "Manufacturing & Industrial",
  "Retail & Distribution",
  "E-commerce & Warehousing",
  "Project & Specialized Cargo",
];

const fleet = [
  { type: "Open Trucks", desc: "Flexible loading for industrial cargo" },
  { type: "Closed Trucks", desc: "Secure transport for high-value goods" },
  { type: "Side Open Trucks", desc: "Efficient quick loading/unloading" },
  { type: "Range", desc: "7ft (Ace) to 32ft MXL/SXL containers" },
];

const milestones = [
  { year: "2018", event: "Founded in Chennai" },
  { year: "2021", event: "Expanded to South India Corridor" },
  { year: "2024", event: "Technology-First Operations" },
];

const stats = [
  { value: "500+", label: "Monthly Shipments" },
  { value: "120+", label: "Clients Served" },
  { value: "50+",  label: "Vendor Partners" },
  { value: "4",    label: "Cities Covered" },
];

function AboutStatsVisual() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
      <div className="rounded-2xl bg-[#013364] p-6 text-white">
        <p className="text-sm font-semibold text-white/60 mb-3">Our Journey</p>
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] font-bold bg-[#FF8C00] text-white px-2 py-0.5 rounded-md flex-shrink-0">
                {m.year}
              </span>
              <span className="text-sm text-white/80">{m.event}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="rounded-xl bg-white border border-[#e2e8f0] p-4 text-center"
          >
            <p className="text-2xl font-bold text-[#013364]">{s.value}</p>
            <p className="text-[10px] text-[#94a3b8] mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl bg-[#f8fafc] border border-[#e2e8f0] p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#013364]">Trusted Operations</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-cyan-200 text-cyan-700 bg-cyan-50">
              GPS Tracked
            </span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-green-200 text-green-700 bg-green-50">
              e-POD
            </span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-orange-200 text-orange-700 bg-orange-50">
              24/7 Ops
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPageContent() {
  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#f8fafc]">
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-[#FF8C00]/6 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
              <motion.span variants={fadeUp} className="section-eyebrow">About Stranz</motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-[#013364] leading-tight">
                Driving Logistics
                <br />
                <span className="text-gradient-orange">Excellence Across India</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
                A professionally managed logistics company delivering structured, reliable,
                and execution-driven freight solutions across South India since inception.
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-3">
                <a
                  href="/Stranz_Company_Profile.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF8C00] text-white
                             font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                             hover:shadow-[0_4px_20px_rgba(255,140,0,0.35)] hover:-translate-y-0.5 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Company Profile
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white
                             border border-[#e2e8f0] text-[#013364] font-semibold rounded-xl
                             hover:border-[#013364]/30 hover:shadow-[0_4px_16px_rgba(1,51,100,0.1)]
                             transition-all duration-300 text-sm"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <AboutStatsVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company overview + Vision + Mission */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Who we are */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeLeft} className="space-y-5">
              <span className="section-eyebrow">Company Overview</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#013364]">Who We Are</h2>
              <p className="text-[#475569] leading-relaxed">
                Stranz is a professionally managed logistics company delivering structured, reliable,
                and execution-driven freight solutions across India. We specialize in full truckload
                and cargo transportation with disciplined coordination and transparent service.
              </p>
              <p className="text-[#475569] leading-relaxed">
                Our model is built around three principles: dedicated coordination per shipment,
                technology-enabled visibility, and disciplined operational execution — ensuring
                every client receives predictable, high-quality logistics performance.
              </p>
            </motion.div>

            <motion.div variants={fadeRight} className="grid grid-cols-2 gap-4">
              {[
                { label: "500+", sub: "Monthly Shipments" },
                { label: "120+", sub: "Enterprise Clients" },
                { label: "12k km", sub: "Covered Weekly" },
                { label: "4 Cities", sub: "Active Network" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-6 bg-[#f8fafc] border border-[#e2e8f0] text-center">
                  <p className="text-3xl font-bold text-[#013364]">{s.label}</p>
                  <p className="text-xs text-[#94a3b8] mt-1">{s.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Vision + Mission */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                content: "To become a trusted logistics partner by setting high standards in transportation reliability, operational control, and long-term customer relationships.",
              },
              {
                icon: Target,
                title: "Our Mission",
                content: "Deliveries you can trust — fast, affordable, and reliable logistics ensuring every shipment arrives safely and on time. Building long-term partnerships through seamless, hassle-free experiences tailored to client needs.",
              },
            ].map(({ icon: Icon, title, content }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="rounded-2xl p-7 bg-white border border-[#e2e8f0]
                           shadow-[0_1px_3px_rgba(1,51,100,0.04)] space-y-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E0] border border-[#FF8C00]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#FF8C00]" />
                </div>
                <h3 className="text-lg font-semibold text-[#013364]">{title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{content}</p>
              </motion.div>
            ))}
          </div>

          {/* How we operate */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="rounded-2xl p-7 md:p-10 bg-[#f8fafc] border border-[#e2e8f0]"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#FFF3E0] border border-[#FF8C00]/20 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-[#FF8C00]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#013364]">End-to-End Coordination</h3>
                <p className="text-sm text-[#94a3b8] mt-1">How we operate every shipment</p>
              </div>
            </div>
            <p className="text-[#475569] leading-relaxed">
              Each shipment is assigned a dedicated logistics coordinator who manages vehicle placement,
              route planning, transit monitoring, and delivery confirmation. From the moment a booking
              is confirmed to the final e-POD issuance, every step is tracked and documented in our
              proprietary operations system.
            </p>
          </motion.div>

          {/* Offerings + Industries */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="rounded-2xl p-7 bg-white border border-[#e2e8f0] space-y-5"
            >
              <h3 className="text-lg font-semibold text-[#013364] border-l-2 border-[#FF8C00] pl-4">
                What We Offer
              </h3>
              <div className="space-y-3">
                {offerings.map((o) => (
                  <div key={o.title} className="rounded-xl p-4 bg-[#f8fafc] border border-[#e2e8f0]">
                    <p className="text-sm font-semibold text-[#FF8C00]">{o.title}</p>
                    <p className="text-xs text-[#94a3b8] mt-1">{o.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="rounded-2xl p-7 bg-white border border-[#e2e8f0] space-y-4"
              >
                <h3 className="text-lg font-semibold text-[#013364] border-l-2 border-[#FF8C00] pl-4">
                  Industries We Serve
                </h3>
                <div className="space-y-2">
                  {industries.map((ind) => (
                    <div key={ind} className="flex items-center gap-3 py-2 border-b border-[#e2e8f0] last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] flex-shrink-0" />
                      <span className="text-sm text-[#475569]">{ind}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Fleet */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="rounded-2xl p-7 md:p-10 bg-[#f8fafc] border border-[#e2e8f0]"
          >
            <h3 className="text-lg font-semibold text-[#013364] border-l-2 border-[#FF8C00] pl-4 mb-7">
              Fleet & Vehicle Types
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fleet.map((f) => (
                <div key={f.type} className="rounded-xl p-4 bg-white border border-[#e2e8f0]">
                  <p className="text-sm font-semibold text-[#013364] mb-1">{f.type}</p>
                  <p className="text-xs text-[#94a3b8]">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
