"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";

const services = [
  {
    image: "/img/contract-bg.png",
    title: "Contract Logistics",
    description: "End-to-end supply chain management with optimized solutions, tailored contracts, and reliable execution across South India.",
    tag: "Core",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    image: "/img/ftl-bg.png",
    title: "Full Truck Load (FTL)",
    description: "Exclusive truck use for large shipments ensuring cargo security, real-time tracking, and dedicated route management.",
    tag: "Core",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    image: "/img/closed-bg.png",
    title: "Closed Truck Services",
    description: "Maximum protection for your valuable cargo — shielded from weather, dust, and damage with sealed, closed-body vehicles.",
    tag: "Core",
    tagColor: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    image: "/img/warehouse-bg.png",
    title: "Warehousing",
    description: "Secure storage facilities with structured SOPs, inventory management, and 24/7 support for organized fulfillment.",
    tag: "Facility",
    tagColor: "bg-purple-50 text-purple-700 border-purple-100",
  },
  {
    image: "/img/gps-bg.png",
    title: "GPS Tracking",
    description: "Real-time visibility of vehicles, assets, and workforce. Predictive tracking with proactive driver-corridor management.",
    tag: "Technology",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-100",
  },
  {
    image: "/img/container-bg.png",
    title: "Container Cargo",
    description: "Flexible, secure, and reliable cargo shipping locally or globally with full container tracking and documentation.",
    tag: "Cargo",
    tagColor: "bg-green-50 text-green-700 border-green-100",
  },
  {
    image: "/img/air-bg.png",
    title: "Air Cargo",
    description: "Fast, reliable shipping for urgent or high-value goods with global airport connectivity and priority handling.",
    tag: "Cargo",
    tagColor: "bg-green-50 text-green-700 border-green-100",
  },
  {
    image: "/img/truck-bg.png",
    title: "Invoice Management",
    description: "Digital e-POD issuance, automated billing, and tamper-proof document management integrated into your workflow.",
    tag: "Software",
    tagColor: "bg-orange-50 text-orange-700 border-orange-100",
  },
  {
    image: "/img/services-bg.png",
    title: "HR & Driver Management",
    description: "Proprietary software for driver coordination, compliance tracking, HR operations, and workforce management at scale.",
    tag: "Software",
    tagColor: "bg-orange-50 text-orange-700 border-orange-100",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-[#f8fafc] section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="text-center mb-16 space-y-4"
        >
          <motion.span variants={fadeUp} className="section-eyebrow">What We Do</motion.span>
          <motion.h2 variants={fadeUp} className="section-title">
            Complete Logistics
            <br />
            <span className="text-gradient-orange">Operations Suite</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mx-auto">
            From heavy freight to operational software — Stranz delivers an
            integrated logistics ecosystem built for modern enterprises.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          className="text-center mt-14"
        >
          <Link href="/services"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#013364] text-white
                       font-semibold rounded-xl hover:bg-[#012050] transition-all duration-300
                       hover:shadow-[0_4px_16px_rgba(1,51,100,0.25)] hover:-translate-y-0.5"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden
                 shadow-[0_1px_3px_rgba(1,51,100,0.04),0_4px_16px_rgba(1,51,100,0.05)]
                 hover:border-[#FF8C00]/30 hover:shadow-[0_4px_24px_rgba(255,140,0,0.12)]
                 transition-all duration-300 cursor-default"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#f1f5f9]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/60 via-transparent to-transparent" />
        {/* Tag on image */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border
                            tracking-wider uppercase ${service.tagColor}`}>
            {service.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-base font-semibold text-[#013364] group-hover:text-[#FF8C00]
                        transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-sm text-[#475569] leading-relaxed">{service.description}</p>
        <div className="flex items-center gap-1 text-[#FF8C00] opacity-0 group-hover:opacity-100
                        transition-all duration-300 text-sm font-semibold">
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}
