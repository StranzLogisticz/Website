"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";

const collage = [
  { src: "/img/gallery/fleet/1.jpeg",  alt: "Fleet Operations",   className: "col-span-2 row-span-2" },
  { src: "/img/gallery/ops/1.jpeg",    alt: "Load Operations",    className: "col-span-1 row-span-1" },
  { src: "/img/gallery/safety/1.jpeg", alt: "Safety Protocols",   className: "col-span-1 row-span-1" },
  { src: "/img/gallery/fleet/2.jpeg",  alt: "Fleet on Route",     className: "col-span-1 row-span-1" },
  { src: "/img/gallery/ops/2.jpeg",    alt: "Yard Operations",    className: "col-span-1 row-span-1" },
  { src: "/img/gallery/fleet/3.jpeg",  alt: "Heavy Fleet",        className: "col-span-2 row-span-1" },
];

export default function GallerySection() {
  return (
    <section className="relative bg-[#f8fafc] section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div className="space-y-3">
            <motion.span variants={fadeUp} className="section-eyebrow">
              <Images className="w-3.5 h-3.5" />
              Operations Gallery
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title">
              Inside{" "}
              <span className="text-gradient-orange">Stranz Operations</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#475569] max-w-md text-sm leading-relaxed">
              A look at our fleet, load operations, and on-ground execution across South India.
            </motion.p>
          </div>

          <motion.div variants={fadeUp}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#013364] text-white
                         font-semibold rounded-xl text-sm hover:bg-[#012050] transition-all duration-300
                         hover:shadow-[0_4px_16px_rgba(1,51,100,0.25)] hover:-translate-y-0.5"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Collage grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-4 grid-rows-3 gap-3 h-[420px] md:h-[520px]"
        >
          {collage.map(({ src, alt, className }, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${className}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/50 via-transparent
                              to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-white text-[10px] font-semibold
                               uppercase tracking-wider opacity-0 group-hover:opacity-100
                               transition-opacity duration-300">
                {alt}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#013364] text-white
                       font-semibold rounded-xl text-sm hover:bg-[#012050] transition-colors"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
