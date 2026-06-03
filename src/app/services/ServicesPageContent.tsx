"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, FileText, Truck, Package, Warehouse,
  Navigation, Box, Anchor, Plane, ChevronRight, ChevronLeft, Weight,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

/* ─── Services data ─── */
const services = [
  {
    id: "contract",
    tab: "Contract Logistics",
    title: "Contract Logistics",
    tagline: "End-to-end supply chain management",
    description:
      "Stranz delivers end-to-end supply chain management with optimized solutions, tailored contracts, and reliable execution. From route planning to final delivery confirmation, our contract logistics model ensures every shipment is handled with precision.",
    features: [
      "Dedicated logistics coordinator per contract",
      "Route optimization and load planning",
      "SLA-based performance reporting",
      "Flexible contract structures (monthly, quarterly, annual)",
    ],
    image: "/img/contract-bg.png",
    tag: "Core",
  },
  {
    id: "closed",
    tab: "Fully Closed Trucks",
    title: "Fully Closed Trucks",
    tagline: "Maximum protection for your cargo",
    description:
      "Our closed-body truck fleet provides maximum protection for valuable cargo — shielding products from weather exposure, dust, and physical damage. Ideal for FMCG, electronics, and high-value goods.",
    features: [
      "Fully sealed closed-body containers",
      "Weather-proof and dust-sealed",
      "Tamper-evident load security",
      "Available from 7ft to 32ft body sizes",
    ],
    image: "/img/closed-bg.png",
    tag: "Core",
  },
  {
    id: "ftl",
    tab: "Full Load (FTL)",
    title: "Full Truck Load (FTL)",
    tagline: "Exclusive vehicle for your cargo",
    description:
      "Exclusive truck allocation for large shipments ensures cargo security, faster transit, and dedicated attention. Our FTL service covers the full South India corridor with real-time tracking throughout.",
    features: [
      "Exclusive vehicle allocation per shipment",
      "GPS-tracked from pickup to delivery",
      "Multiple container sizes: 14ft to 32ft",
      "Available for industrial and commercial cargo",
    ],
    image: "/img/ftl-bg.png",
    tag: "Core",
  },
  {
    id: "warehousing",
    tab: "Warehousing",
    title: "Warehousing",
    tagline: "Secure storage and fulfillment",
    description:
      "Stranz warehousing facilities offer compliant storage with structured SOPs, inventory management, and 24/7 support. Designed for FMCG, retail, and industrial clients needing reliable inventory control.",
    features: [
      "SOC and SOP-compliant storage facilities",
      "Inventory management with digital reporting",
      "Inbound and outbound coordination",
      "24/7 facility support",
    ],
    image: "/img/warehouse-bg.png",
    tag: "Facility",
  },
  {
    id: "gps",
    tab: "GPS Tracking",
    title: "GPS Tracking",
    tagline: "Real-time fleet visibility",
    description:
      "Live GPS tracking of every active vehicle and asset gives you complete visibility across the entire route. Predictive monitoring and proactive alerts keep your coordinator informed at all times.",
    features: [
      "Real-time GPS location updates",
      "Driver corridor and speed monitoring",
      "Geofenced checkpoint alerts",
      "Client-accessible tracking dashboard",
    ],
    image: "/img/gps-bg.png",
    tag: "Technology",
  },
  {
    id: "container",
    tab: "Container Cargo",
    title: "Container Cargo",
    tagline: "Local and global container shipping",
    description:
      "Flexible, secure container cargo solutions for domestic and international shipping. Full container load management with documentation, customs coordination, and end-to-end tracking.",
    features: [
      "20ft and 40ft container handling",
      "Port-to-warehouse coordination",
      "Customs documentation support",
      "Real-time container tracking",
    ],
    image: "/img/container-bg.png",
    tag: "Cargo",
  },
  {
    id: "seaway",
    tab: "Seaway Cargo",
    title: "Seaway Container Cargo",
    tagline: "Efficient sea route logistics",
    description:
      "Stranz manages seaway container cargo solutions via Indian and international sea routes. Ensuring safe, timely delivery with structured port coordination and full-route visibility.",
    features: [
      "Domestic and international sea routes",
      "Port coordination and loading supervision",
      "Full cargo insurance options",
      "Document management and compliance",
    ],
    image: "/img/seaway-bg.png",
    tag: "Cargo",
  },
  {
    id: "air",
    tab: "Air Cargo",
    title: "Air Cargo",
    tagline: "Priority shipping for urgent goods",
    description:
      "Fast, reliable air cargo services for urgent or high-value shipments. With global airport connectivity and priority handling, Stranz ensures your time-sensitive cargo arrives as committed.",
    features: [
      "Priority handling for time-sensitive goods",
      "Global airport connectivity",
      "Customs clearance coordination",
      "Real-time flight and status tracking",
    ],
    image: "/img/air-bg.png",
    tag: "Cargo",
  },
];

const tagColors: Record<string, string> = {
  Core:       "text-blue-700 bg-blue-50 border-blue-100",
  Facility:   "text-purple-700 bg-purple-50 border-purple-100",
  Technology: "text-cyan-700 bg-cyan-50 border-cyan-100",
  Cargo:      "text-green-700 bg-green-50 border-green-100",
};

/* ─── Fleet data ─── */
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

/* ─── Hero visual (unchanged) ─── */
const serviceNodes = [
  { id: "contract",    label: "Contract",    icon: FileText,   angle: 0   },
  { id: "closed",      label: "Closed Body", icon: Truck,      angle: 45  },
  { id: "ftl",         label: "FTL",         icon: Package,    angle: 90  },
  { id: "warehousing", label: "Warehouse",   icon: Warehouse,  angle: 135 },
  { id: "gps",         label: "GPS Track",   icon: Navigation, angle: 180 },
  { id: "container",   label: "Container",   icon: Box,        angle: 225 },
  { id: "seaway",      label: "Seaway",      icon: Anchor,     angle: 270 },
  { id: "air",         label: "Air Cargo",   icon: Plane,      angle: 315 },
];

function ServicesHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), { stiffness: 60, damping: 20 });
  const springY = useSpring(useTransform(mouseY, [-1, 1], [-18, 18]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width) * 2 - 1);
      mouseY.set(((e.clientY - top) / height) * 2 - 1);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const radius = 130;

  return (
    <div ref={containerRef} className="relative w-full h-[420px] flex items-center justify-center select-none">
      <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-[#FF8C00]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-[#013364]/8 blur-3xl pointer-events-none" />

      <motion.div style={{ x: springX, y: springY }} className="relative">
        {[1, 0.6].map((opacity, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#013364]/10"
            style={{
              width:  (radius * 2) + (i * 40),
              height: (radius * 2) + (i * 40),
              top:    -(radius) - (i * 20),
              left:   -(radius) - (i * 20),
              opacity,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}

        <svg
          className="absolute pointer-events-none"
          style={{ width: radius * 2 + 100, height: radius * 2 + 100, top: -(radius + 50), left: -(radius + 50) }}
        >
          {serviceNodes.map(({ angle }) => {
            const rad = (angle * Math.PI) / 180;
            const cx = radius + 50;
            const cy = radius + 50;
            const nx = cx + Math.cos(rad) * radius;
            const ny = cy + Math.sin(rad) * radius;
            return (
              <motion.line
                key={angle}
                x1={cx} y1={cy} x2={nx} y2={ny}
                stroke="rgba(1,51,100,0.12)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3 + angle / 720, duration: 0.8 }}
              />
            );
          })}
        </svg>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative z-10 w-24 h-24 rounded-2xl bg-white
                     shadow-[0_8px_32px_rgba(1,51,100,0.3)] flex items-center justify-center p-2"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image src="/img/logo.png" alt="Stranz" fill className="object-contain" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-[#FF8C00]/40"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>

        {serviceNodes.map(({ label, icon: Icon, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          return (
            <motion.div
              key={label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15, zIndex: 20 }}
              className="absolute z-10 flex flex-col items-center gap-1 cursor-default"
              style={{ left: x - 32, top: y - 32 }}
            >
              <div className="w-14 h-14 rounded-xl bg-white border border-[#e2e8f0]
                              shadow-[0_4px_16px_rgba(1,51,100,0.10)] flex items-center justify-center
                              transition-all duration-200">
                <Icon className="w-5 h-5 text-[#013364]" />
              </div>
              <span className="text-[9px] font-semibold text-[#94a3b8] uppercase tracking-wide whitespace-nowrap">
                {label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-6 right-4 bg-white border border-[#e2e8f0] rounded-xl px-4 py-3
                   shadow-[0_4px_20px_rgba(1,51,100,0.08)]"
      >
        <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider font-semibold">Services</p>
        <p className="text-xl font-bold text-[#013364]">8 Solutions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-6 left-4 bg-white border border-[#FF8C00]/20 rounded-xl px-4 py-3
                   shadow-[0_4px_20px_rgba(255,140,0,0.10)]"
      >
        <p className="text-[10px] text-[#FF8C00] uppercase tracking-wider font-semibold">Coverage</p>
        <p className="text-sm font-bold text-[#013364]">South India</p>
      </motion.div>
    </div>
  );
}

/* ─── Vehicle card ─── */
type Vehicle = {
  name: string; payload: string; dimensions: string; bodyType: string;
  ideal: string; desc: string; tags: string[]; image: string;
};

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group rounded-2xl bg-white border border-[#e2e8f0] overflow-hidden
                 hover:border-[#FF8C00]/30 hover:shadow-[0_4px_24px_rgba(255,140,0,0.1)]
                 transition-all duration-300"
    >
      <div className="relative h-44 bg-[#f8fafc] border-b border-[#e2e8f0] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-lg font-bold text-[#013364]">{vehicle.name}</h4>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF3E0] border border-[#FF8C00]/20 flex-shrink-0">
            <Weight className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span className="text-[11px] font-bold text-[#FF8C00]">{vehicle.payload}</span>
          </div>
        </div>
        <p className="text-sm text-[#475569] leading-relaxed">{vehicle.desc}</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Size",     value: vehicle.dimensions },
            { label: "Body",     value: vehicle.bodyType },
            { label: "Best For", value: vehicle.ideal },
          ].map((spec) => (
            <div key={spec.label} className="rounded-lg bg-[#f8fafc] border border-[#e2e8f0] p-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1">{spec.label}</p>
              <p className="text-xs font-semibold text-[#013364] leading-tight">{spec.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {vehicle.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white border border-[#e2e8f0] text-[#94a3b8] tracking-wider uppercase">
              {tag}
            </span>
          ))}
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-[#FF8C00] hover:text-[#E07800] transition-colors font-semibold">
          Request Quote
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Slide variants for both galleries ─── */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -d * 60 }),
};
const slideTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as number[] };

/* ─── Arrow button ─── */
function ArrowBtn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-11 h-11 rounded-xl border border-[#e2e8f0] flex items-center justify-center
                 text-[#475569] hover:bg-[#013364] hover:text-white hover:border-[#013364]
                 transition-all duration-200"
    >
      {children}
    </button>
  );
}

/* ─── Main component ─── */
export default function ServicesPageContent() {
  const [svcIndex, setSvcIndex] = useState(0);
  const [svcDir, setSvcDir] = useState(1);
  const [fleetActive, setFleetActive] = useState<"all" | "small" | "medium" | "heavy">("all");
  const [fleetDir, setFleetDir] = useState(1);

  const current = services[svcIndex];
  const fleetCats = ["small", "medium", "heavy"] as const;
  const currentFleet = fleetActive !== "all" ? fleet.find((f) => f.category === fleetActive)! : null;
  const allVehicles = fleet.flatMap((f) => f.vehicles);

  const goService = (d: number) => {
    setSvcDir(d);
    setSvcIndex((p) => (p + d + services.length) % services.length);
  };

  const goFleet = (d: number) => {
    const idx = fleetActive === "all" ? -1 : fleetCats.indexOf(fleetActive as typeof fleetCats[number]);
    const next = (idx === -1 ? 0 : (idx + d + fleetCats.length) % fleetCats.length);
    setFleetDir(d);
    setFleetActive(fleetCats[next]);
  };

  const fleetFilters = [
    { key: "all",    label: "All Fleet" },
    { key: "small",  label: "Small-Scale (City)" },
    { key: "medium", label: "Medium-Scale (Inter-city)" },
    { key: "heavy",  label: "Heavy-Scale (Industrial)" },
  ] as const;

  return (
    <div className="bg-white min-h-screen pt-24">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#f8fafc]">
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF8C00]/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#013364]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
              <motion.span variants={fadeUp} className="section-eyebrow">Services</motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#013364] leading-tight">
                Our Complete
                <br />
                <span className="text-gradient-orange">Logistics Suite</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
                From FTL freight and closed-body trucks to warehousing, GPS tracking,
                and cargo — one partner for every logistics need.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-[#FF8C00] text-white
                             font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                             hover:shadow-[0_8px_32px_rgba(255,140,0,0.35)] hover:-translate-y-0.5"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#services-gallery"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-[#e2e8f0]
                             text-[#013364] font-semibold rounded-xl hover:border-[#013364]/20
                             hover:shadow-[0_4px_16px_rgba(1,51,100,0.08)] transition-all duration-300"
                >
                  Explore Services
                  <ChevronRight className="w-5 h-5 text-[#94a3b8]" />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
                {["FTL / PTL", "Closed Body", "Warehousing", "GPS Tracking", "Air & Sea"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white border border-[#e2e8f0] text-[#475569]">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <ServicesHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services gallery ── */}
      <section id="services-gallery" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <span className="section-eyebrow">Our Services</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#013364] mt-1">{current.title}</h2>
              <p className="text-[#94a3b8] text-sm mt-1">{svcIndex + 1} / {services.length}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-shrink-0">
              <ArrowBtn onClick={() => goService(-1)} label="Previous service">
                <ChevronLeft className="w-5 h-5" />
              </ArrowBtn>
              <ArrowBtn onClick={() => goService(1)} label="Next service">
                <ChevronRight className="w-5 h-5" />
              </ArrowBtn>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mb-8">
            {services.map((svc, i) => (
              <button
                key={svc.id}
                title={svc.tab}
                onClick={() => { setSvcDir(i > svcIndex ? 1 : -1); setSvcIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === svcIndex ? "bg-[#FF8C00] w-6" : "bg-[#e2e8f0] w-3 hover:bg-[#94a3b8]"
                }`}
              />
            ))}
          </div>

          {/* Animated service panel */}
          <AnimatePresence mode="wait" custom={svcDir}>
            <motion.div
              key={current.id}
              custom={svcDir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="grid lg:grid-cols-2 gap-8 items-start"
            >
              {/* Image */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(1,51,100,0.1)]">
                <Image src={current.image} alt={current.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border tracking-wider uppercase ${tagColors[current.tag]}`}>
                    {current.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#FF8C00] mb-2">
                    {current.tagline}
                  </p>
                  <h2 className="text-3xl font-bold text-[#013364]">{current.title}</h2>
                </div>
                <p className="text-[#475569] leading-relaxed">{current.description}</p>
                <ul className="space-y-3">
                  {current.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FFF3E0] border border-[#FF8C00]/30
                                      flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                      </div>
                      <span className="text-sm text-[#475569]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#013364] text-white
                             font-semibold rounded-xl hover:bg-[#012050] transition-all duration-300
                             hover:shadow-[0_4px_16px_rgba(1,51,100,0.25)] hover:-translate-y-0.5 text-sm"
                >
                  Get a Quote for This Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Fleet gallery ── */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8">
            <span className="section-eyebrow">Fleet Asset Base</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#013364] mt-1">
              Our Fleet — 7ft to 32ft
            </h2>
          </div>

          {/* Filter buttons + arrows */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {fleetFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => {
                    const prev = fleetActive;
                    const prevIdx = fleetCats.indexOf(prev as typeof fleetCats[number]);
                    const nextIdx = fleetCats.indexOf(f.key as typeof fleetCats[number]);
                    setFleetDir(nextIdx >= prevIdx ? 1 : -1);
                    setFleetActive(f.key);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    fleetActive === f.key
                      ? "bg-[#013364] text-white shadow-[0_4px_16px_rgba(1,51,100,0.2)]"
                      : "bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#013364] hover:border-[#013364]/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Arrows — only when a specific category is selected */}
            {fleetActive !== "all" && (
              <div className="flex items-center gap-2">
                <ArrowBtn onClick={() => goFleet(-1)} label="Previous fleet category">
                  <ChevronLeft className="w-5 h-5" />
                </ArrowBtn>
                <ArrowBtn onClick={() => goFleet(1)} label="Next fleet category">
                  <ChevronRight className="w-5 h-5" />
                </ArrowBtn>
              </div>
            )}
          </div>

          {/* Vehicle cards */}
          <AnimatePresence mode="wait" custom={fleetDir}>
            {fleetActive === "all" ? (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={slideTransition}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {allVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.name} vehicle={vehicle} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={fleetActive}
                custom={fleetDir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="grid sm:grid-cols-2 gap-6"
              >
                {currentFleet!.vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.name} vehicle={vehicle} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-14 rounded-2xl p-8 md:p-10 bg-[#013364] text-center space-y-4"
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
