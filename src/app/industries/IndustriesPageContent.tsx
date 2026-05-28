"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cog, Package, CalendarCheck, Ship } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

const industries = [
  {
    id: "automotive",
    tab: "Automotive & Casting",
    title: "Automotive & Casting Parts",
    description:
      "We manage high-precision supply chains for Tier-1 suppliers. With a dense route network in Chennai's industrial belts, we ensure zero-latency transit for critical casting and forging components.",
    points: [
      "Engine Components & Gearboxes",
      "Heavy Casting & Forging Parts",
      "JIT (Just-In-Time) Production Support",
    ],
    spec: [
      { label: "Chennai Hub Focus", value: "Sriperumbudur, Oragadam, Ennore Corridor" },
      { label: "Fleet Recommended", value: "19ft to 32ft MX Specialized Containers" },
    ],
    cta: "Audit My Automotive Route",
    images: [
      { src: "/img/auto-1.png", caption: "Fleet Operations" },
      { src: "/img/auto-2.png", caption: "Casting Load-Out" },
    ],
  },
  {
    id: "industrial",
    tab: "Industrial Products",
    title: "Industrial Goods & Footwear",
    description:
      "Specialized logistics for high-value finished products. From leather footwear in Ambur/Chennai to electrical switchgears in Bangalore, we provide weather-proof, secure transit.",
    points: [
      "Electrical Equipment & Components",
      "Export-Quality Footwear & Leather",
      "Consumer Industrial Goods",
    ],
    spec: [
      { label: "Regional Network", value: "Chennai · Pondicherry · Bangalore Hubs" },
      { label: "Safety Protocol", value: "Moisture-Regulated Closed Body Fleet" },
    ],
    cta: "Get Manufacturing Quote",
    images: [
      { src: "/img/manu-1.png", caption: "Secure Cargo" },
      { src: "/img/manu-2.png", caption: "Regional Transit" },
    ],
  },
  {
    id: "contractual",
    tab: "Contractual (Monthly)",
    title: "Contractual Load Shifting",
    description:
      "Dedicated monthly fleet placement for internal logistics. We provide vehicles and trained personnel to manage intra-premises movement within large-scale industrial factory units.",
    points: [
      "Fixed Monthly Billing Cycles",
      "Dedicated Vehicle Placement",
      "24/7 On-Site Operational Control",
    ],
    spec: [
      { label: "Service Model", value: "On-Site Dedicated Fleet Management" },
      { label: "Optimization", value: "Zero-mileage internal logistics" },
    ],
    cta: "Request Monthly Contract",
    images: [
      { src: "/img/contract-1.png", caption: "Intra-Site Fleet" },
      { src: "/img/contract-2.png", caption: "24/7 Dedicated Team" },
    ],
  },
  {
    id: "export",
    tab: "Export & Raw Materials",
    title: "Export Support & Raw Materials",
    description:
      "Critical first-mile and last-mile connectivity. We bridge the gap between major Air/Sea Gateways and Southern Industrial Parks for raw material feeding.",
    points: [
      "Port-to-Factory Feeder Services",
      "Airport Cargo Hub Distribution",
      "Bulk Raw Material Management",
    ],
    spec: [
      { label: "Gateway Focus", value: "Chennai Port · Ennore · BLR Airport Hub" },
      { label: "Network Reach", value: "Regional Connectivity to Coimbatore/Pondy" },
    ],
    cta: "Check Export Logistics Rate",
    images: [
      { src: "/img/export-1.png", caption: "Port Feeder Ops" },
      { src: "/img/export-2.png", caption: "Raw Material Transit" },
    ],
  },
];

const industryCards = [
  {
    id:      "automotive",
    icon:    Cog,
    label:   "Automotive & Casting",
    stat:    "JIT Production Support",
    detail:  "Sriperumbudur · Oragadam · Ennore",
    accent:  "#FF8C00",
    bg:      "#FFF3E0",
    border:  "rgba(255,140,0,0.25)",
  },
  {
    id:      "industrial",
    icon:    Package,
    label:   "Industrial Products",
    stat:    "Weather-Proof Closed Body",
    detail:  "Chennai · Pondicherry · Bangalore",
    accent:  "#013364",
    bg:      "#EFF6FF",
    border:  "rgba(1,51,100,0.2)",
  },
  {
    id:      "contractual",
    icon:    CalendarCheck,
    label:   "Contractual Monthly",
    stat:    "Dedicated Fleet Placement",
    detail:  "On-Site · Fixed Billing · 24/7 Ops",
    accent:  "#059669",
    bg:      "#ECFDF5",
    border:  "rgba(5,150,105,0.2)",
  },
  {
    id:      "export",
    icon:    Ship,
    label:   "Export & Raw Materials",
    stat:    "Port-to-Factory Feeder",
    detail:  "Chennai Port · Ennore · BLR Airport",
    accent:  "#7C3AED",
    bg:      "#F5F3FF",
    border:  "rgba(124,58,237,0.2)",
  },
];

function IndustryShowcase() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % industryCards.length), 3000);
    return () => clearInterval(t);
  }, []);

  const card = industryCards[current];
  const Icon = card.icon;

  return (
    <div className="relative select-none">
      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-4 -right-4 z-20 bg-white border border-[#e2e8f0]
                   rounded-xl px-4 py-2.5 shadow-[0_4px_16px_rgba(1,51,100,0.10)]"
      >
        <p className="text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider">Verticals</p>
        <p className="text-sm font-bold text-[#013364]">4 Industries</p>
      </motion.div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0]
                      shadow-[0_8px_40px_rgba(1,51,100,0.10)] overflow-hidden">
        {/* Progress tabs */}
        <div className="flex border-b border-[#e2e8f0]">
          {industryCards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setCurrent(i)}
              className="flex-1 h-1 relative bg-[#f1f5f9] transition-colors"
            >
              {i === current && (
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: card.accent }}
                  layoutId="industryBar"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Card body */}
        <div className="p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: card.bg, border: `1.5px solid ${card.border}` }}
              >
                <Icon className="w-6 h-6" style={{ color: card.accent }} />
              </div>

              {/* Label + stat */}
              <div className="space-y-1">
                <p className="text-[11px] font-semibold tracking-widest uppercase"
                   style={{ color: card.accent }}>
                  {card.stat}
                </p>
                <h3 className="text-xl font-bold text-[#013364]">{card.label}</h3>
                <p className="text-sm text-[#94a3b8]">{card.detail}</p>
              </div>

              {/* Mini feature chips */}
              <div className="flex flex-wrap gap-2">
                {industries.find((ind) => ind.id === card.id)?.points.map((pt) => (
                  <span
                    key={pt}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                    style={{ color: card.accent, backgroundColor: card.bg, borderColor: card.border }}
                  >
                    {pt}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav dots */}
        <div className="px-7 pb-5 flex items-center justify-between">
          <div className="flex gap-2">
            {industryCards.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}>
                <motion.div
                  className="rounded-full transition-all duration-300"
                  animate={{
                    width: i === current ? 20 : 6,
                    backgroundColor: i === current ? card.accent : "#e2e8f0",
                  }}
                  style={{ height: 6 }}
                />
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#94a3b8] font-semibold">
            {current + 1} / {industryCards.length}
          </span>
        </div>
      </div>

      {/* Side mini cards */}
      <div className="absolute -left-5 top-1/4 space-y-2 hidden xl:block">
        {industryCards.filter((_, i) => i !== current).slice(0, 2).map((c, i) => {
          const MiniIcon = c.icon;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              onClick={() => setCurrent(industryCards.indexOf(c))}
              className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center
                         justify-center cursor-pointer hover:border-[#FF8C00]/30
                         shadow-[0_2px_8px_rgba(1,51,100,0.08)] transition-all"
              style={{ backgroundColor: c.bg }}
            >
              <MiniIcon className="w-4 h-4" style={{ color: c.accent }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function IndustriesPageContent() {
  const [active, setActive] = useState("automotive");
  const current = industries.find((i) => i.id === active)!;

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
              <motion.span variants={fadeUp} className="section-eyebrow">Enterprise Logistics Architecture</motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-[#013364] leading-tight">
                Specialized
                <br />
                <span className="text-gradient-orange">Industry Solutions</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
                Engineering-led movement across the Southern Industrial Corridor —
                Chennai · Bangalore · Coimbatore · Pondicherry.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <IndustryShowcase />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab Nav */}
          <div className="flex flex-wrap gap-2 mb-12">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActive(ind.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${active === ind.id
                    ? "bg-[#FF8C00] text-white shadow-[0_4px_16px_rgba(255,140,0,0.3)]"
                    : "bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#013364] hover:border-[#013364]/20"
                  }`}
              >
                {ind.tab}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Content + Spec card row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 rounded-2xl bg-white border border-[#e2e8f0]
                                shadow-[0_1px_3px_rgba(1,51,100,0.04)] p-8 space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#013364]">{current.title}</h2>
                  <p className="text-[#475569] leading-relaxed">{current.description}</p>
                  <ul className="space-y-3">
                    {current.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#FFF3E0] border border-[#FF8C00]/30
                                        flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                        </div>
                        <span className="text-[#475569] text-sm">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8C00] text-white
                               font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                               hover:shadow-[0_4px_16px_rgba(255,140,0,0.35)] hover:-translate-y-0.5 text-sm"
                  >
                    {current.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Spec card */}
                <div className="rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] p-6 space-y-5 h-fit">
                  {current.spec.map((s) => (
                    <div key={s.label}>
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#FF8C00] mb-1">
                        {s.label}
                      </p>
                      <p className="text-sm font-medium text-[#013364]">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image gallery */}
              <div className="grid grid-cols-2 gap-4">
                {current.images.map(({ src, caption }) => (
                  <div key={caption} className="relative h-52 md:h-72 rounded-2xl overflow-hidden group">
                    <Image
                      src={src}
                      alt={caption}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-white text-xs font-semibold uppercase tracking-wider">
                      {caption}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
