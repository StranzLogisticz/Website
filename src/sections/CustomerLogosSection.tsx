"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const logos = [
  { src: "/img/Customer%20logos/DP-World-logo-1.webp",           alt: "DP World" },
  { src: "/img/Customer%20logos/Dolphin%20logistics.jpg",        alt: "Dolphin Logistics" },
  { src: "/img/Customer%20logos/JAS%20Logo.png",                 alt: "JAS Logistics" },
  { src: "/img/Customer%20logos/GLOTTIS.png",                    alt: "Glottis" },
  { src: "/img/Customer%20logos/Lords%20by%20Mahindra.jpeg",     alt: "Lords by Mahindra" },
  { src: "/img/Customer%20logos/Sea%20Sky.png",                  alt: "Sea Sky" },
  { src: "/img/Customer%20logos/WWL-logo.png",                   alt: "WWL" },
  { src: "/img/Customer%20logos/aberco%20freight.png",           alt: "Aberco Freight" },
];

const GROUPS = Math.ceil(logos.length / 3); // 3
const INTERVAL_MS = 3500;

export default function CustomerLogosSection() {
  const [group, setGroup] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setGroup((g) => (g + 1) % GROUPS), INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  const visible = logos.slice(group * 3, group * 3 + 3);

  return (
    <section className="py-14 bg-white border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#FF8C00] mb-2">
            Trusted Partners
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#013364]">
            Brands We Move Freight For
          </h2>
        </div>

        {/* Logo carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-6 md:gap-10"
            >
              {visible.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex items-center justify-center rounded-2xl border border-[#e2e8f0]
                             bg-[#f8fafc] px-6 py-6 h-24 hover:border-[#013364]/20
                             hover:shadow-[0_4px_16px_rgba(1,51,100,0.07)]
                             transition-all duration-300 group"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain transition-all duration-300"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: GROUPS }).map((_, i) => (
            <button
              key={i}
              onClick={() => setGroup(i)}
              aria-label={`Show logos group ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === group ? "bg-[#FF8C00] w-6" : "bg-[#e2e8f0] w-3 hover:bg-[#94a3b8]"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
