"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Map, Users, Building2 } from "lucide-react";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";

const metrics = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "+",
    label: "Shipments / Month",
    description: "Consistent monthly throughput across all active routes",
  },
  {
    icon: Map,
    value: 12000,
    suffix: " km",
    label: "Covered Weekly",
    description: "Total distance managed across South India corridors",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Vendor Partners",
    description: "Vetted logistics vendors integrated into our network",
  },
  {
    icon: Building2,
    value: 120,
    suffix: "+",
    label: "Clients Served",
    description: "Enterprise and SME clients trusting Stranz operations",
  },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  shouldStart,
}: {
  target: number;
  suffix: string;
  duration?: number;
  shouldStart: boolean;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [shouldStart, target, duration]);

  const display = target >= 1000 ? count.toLocaleString("en-IN") : count;
  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16 space-y-4"
        >
          <motion.span variants={fadeUp} className="section-eyebrow">
            Operational Scale
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title">
            Numbers That
            <br />
            <span className="text-gradient-orange">Define Our Network</span>
          </motion.h2>
        </motion.div>

        {/* Metrics grid */}
        <div ref={ref}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl p-7 bg-[#f8fafc] border border-[#e2e8f0]
                             hover:border-[#FF8C00]/30 hover:shadow-[0_4px_24px_rgba(255,140,0,0.1)]
                             transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFF3E0]
                                  to-transparent opacity-0 group-hover:opacity-60 transition-opacity
                                  duration-300 pointer-events-none" />

                  <div className="relative space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FFF3E0] border border-[#FF8C00]/20
                                    flex items-center justify-center group-hover:bg-[#FF8C00]/15
                                    transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#FF8C00]" />
                    </div>

                    <div className="text-4xl md:text-5xl font-bold text-[#013364] tabular-nums">
                      <AnimatedCounter
                        target={metric.value}
                        suffix={metric.suffix}
                        shouldStart={inView}
                        duration={2200}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-[#013364]">{metric.label}</p>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{metric.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Coverage cities */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 p-6 md:p-8 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#FF8C00] mb-2">
                Active Coverage
              </p>
              <h3 className="text-xl font-bold text-[#013364]">South India Logistics Corridor</h3>
              <p className="text-sm text-[#94a3b8] mt-1">
                Primary HQ in Chennai with active operations across 4 major cities
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { city: "Chennai", tag: "HQ" },
                { city: "Bengaluru", tag: "Active" },
                { city: "Coimbatore", tag: "Active" },
                { city: "Pondicherry", tag: "Active" },
              ].map(({ city, tag }) => (
                <div
                  key={city}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white
                             border border-[#e2e8f0] text-sm shadow-sm"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${tag === "HQ" ? "bg-[#FF8C00]" : "bg-green-500"}`} />
                  <span className="text-[#013364] font-medium">{city}</span>
                  {tag === "HQ" && (
                    <span className="text-[10px] text-[#FF8C00] font-semibold tracking-wider uppercase">HQ</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
