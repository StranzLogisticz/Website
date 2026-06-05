"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, LogIn } from "lucide-react";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";

const footerLinks = {
  Company: [
    { label: "About Stranz",  href: "/about"    },
    { label: "Our Fleet",     href: "/fleet"    },
    { label: "Industries",    href: "/industries" },
    { label: "Gallery",       href: "/gallery"  },
    { label: "Updates",       href: "/updates"  },
  ],
  Services: [
    { label: "Contract Logistics", href: "/services#contract" },
    { label: "Full Truck Load (FTL)", href: "/services#ftl" },
    { label: "Warehousing", href: "/services#warehousing" },
    { label: "GPS Tracking", href: "/services#gps" },
    { label: "Air & Sea Cargo", href: "/services#cargo" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};


export default function Footer() {
  return (
    <footer className="bg-[#013364] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA band */}
        <div className="py-12 border-b border-white/[0.08]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#FF8C00] mb-2">
                South India Corridor
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Ready to move your cargo?
              </h3>
              <p className="text-white/50 mt-1 text-sm">
                Chennai · Bengaluru · Coimbatore · Pondicherry
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8C00] text-white
                           font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                           hover:shadow-[0_4px_20px_rgba(255,140,0,0.4)] hover:-translate-y-0.5 text-sm"
              >
                Get Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919566952888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.08]
                           border border-white/[0.15] text-white font-semibold rounded-xl
                           hover:bg-white/[0.12] transition-all duration-300 text-sm"
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Main footer grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex-shrink-0 block">
              <Image
                src="/img/logo.png"
                alt="Stranz Logistics"
                width={160}
                height={46}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Tamil Nadu&apos;s technology-first logistics operations company.
              Safety, speed, and full visibility across South India.
            </p>

            <div className="space-y-3">
              <a href="tel:+919566952888" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                <span>+91 95669 52888</span>
              </a>
              <a href="mailto:info@stranz.in" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                <span>info@stranz.in</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Staff Portal column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">
              Staff Portal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-[#FF8C00] transition-colors duration-200"
                >
                  <LogIn className="w-3.5 h-3.5 flex-shrink-0" />
                  HR Portal
                </Link>
              </li>
            </ul>
            <p className="text-xs text-white/25 leading-relaxed">
              For Stranz employees only.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Stranz Logistics. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Chennai, Tamil Nadu · Mon–Sat 9AM–7PM IST
          </p>
        </div>
      </div>
    </footer>
  );
}
