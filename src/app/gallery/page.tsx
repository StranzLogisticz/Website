"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

const categories = [
  { key: "all",    label: "All" },
  { key: "fleet",  label: "Fleet" },
  { key: "ops",    label: "Operations" },
  { key: "safety", label: "Safety" },
];

const images = [
  { src: "/img/gallery/fleet/1.jpeg",  alt: "Fleet Operations",      category: "fleet"  },
  { src: "/img/gallery/fleet/2.jpeg",  alt: "Fleet on Route",         category: "fleet"  },
  { src: "/img/gallery/fleet/3.jpeg",  alt: "Heavy Fleet",            category: "fleet"  },
  { src: "/img/gallery/ops/1.jpeg",    alt: "Load Operations",        category: "ops"    },
  { src: "/img/gallery/ops/2.jpeg",    alt: "Yard Operations",        category: "ops"    },
  { src: "/img/gallery/safety/1.jpeg", alt: "Safety Protocols",       category: "safety" },
];

export default function GalleryPage() {
  const [active, setActive]     = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "all" ? images : images.filter((img) => img.category === active);

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-[#f8fafc]">
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl space-y-5">
            <motion.span variants={fadeUp} className="section-eyebrow">Operations Gallery</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-[#013364] leading-tight">
              Inside Our
              <br />
              <span className="text-gradient-orange">Operations</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[#475569] leading-relaxed max-w-xl">
              On-ground visuals from our fleet, load operations, and safety protocols across South India.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${active === cat.key
                    ? "bg-[#013364] text-white shadow-[0_4px_16px_rgba(1,51,100,0.2)]"
                    : "bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#013364] hover:border-[#013364]/20"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map(({ src, alt }) => (
                <motion.div
                  key={src}
                  whileHover={{ y: -4 }}
                  onClick={() => setLightbox(src)}
                  className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer
                             border border-[#e2e8f0] hover:border-[#FF8C00]/30
                             hover:shadow-[0_4px_24px_rgba(255,140,0,0.1)] transition-all duration-300"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/50 via-transparent
                                  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-4 text-white text-xs font-semibold
                                   uppercase tracking-wider opacity-0 group-hover:opacity-100
                                   transition-opacity duration-300">
                    {alt}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-[#013364]/90 backdrop-blur-sm
                       flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
            >
              <Image
                src={lightbox}
                alt="Gallery image"
                width={1200}
                height={800}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center
                           rounded-full bg-white/10 border border-white/20 text-white
                           hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
