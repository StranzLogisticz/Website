"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, Shield, Zap, Eye, MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

const trustBadges = [
  { icon: Shield,  label: "Safety First" },
  { icon: Zap,     label: "Speed Guaranteed" },
  { icon: Eye,     label: "Full Visibility" },
  { icon: MapPin,  label: "South India Coverage" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      {/* Hero video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay muted loop playsInline preload="auto"
          poster="/img/hero-bg.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/img/hero-bg.webm" type="video/webm" />
          <source src="/img/hero-bg.mp4"  type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30" />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 z-[1] bg-dot-pattern opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-8"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <span className="section-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
              Tamil Nadu&apos;s Trusted Logistics Partner
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#013364] leading-[1.05] tracking-tight">
              Logistics
              <br />
              <span className="text-gradient-orange">Engineered</span>
              <br />
              for Scale
            </h1>
          </motion.div>

          {/* Sub */}
          <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
            Stranz is a technology-first logistics operations company
            delivering structured, reliable freight solutions across South India
            — with real-time visibility and disciplined execution.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary text-base px-7 py-4">
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[#e2e8f0]
                         text-[#013364] font-semibold rounded-xl text-base transition-all duration-300
                         hover:border-[#013364]/30 hover:shadow-[0_4px_16px_rgba(1,51,100,0.1)]
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              View Services
              <ChevronRight className="w-5 h-5 text-[#94a3b8]" />
            </Link>
            <a
              href="/Stranz_Company_Profile.pdf"
              download
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#013364] border border-[#013364]
                         text-white font-semibold rounded-xl text-base transition-all duration-300
                         hover:bg-[#012050] hover:shadow-[0_4px_16px_rgba(1,51,100,0.25)]
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              Company Profile
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label}
                className="flex items-center gap-2 text-sm text-[#475569] bg-white
                           border border-[#e2e8f0] rounded-full px-3 py-1.5 shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-[#FF8C00]" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="mt-20 pt-10 border-t border-[#e2e8f0] grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+",      label: "Shipments / Month" },
            { value: "12,000 km", label: "Covered Weekly" },
            { value: "50+",       label: "Vendor Partners" },
            { value: "120+",      label: "Clients Served" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-[#013364]">{stat.value}</p>
              <p className="text-sm text-[#94a3b8]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
