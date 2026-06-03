"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Services",   href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_#e2e8f0,0_4px_24px_rgba(1,51,100,0.08)]"
            : "bg-white/80 backdrop-blur-md border-b border-[#e2e8f0]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/img/logo.png"
                alt="Stranz Logistics"
                width={180}
                height={52}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#475569] hover:text-[#013364]
                             rounded-lg hover:bg-[#f1f5f9] transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919566952888"
                className="flex items-center gap-2 text-sm font-medium text-[#013364]
                           hover:text-[#FF8C00] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 95669 52888
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF8C00] text-white
                           text-sm font-semibold rounded-xl transition-all duration-300
                           hover:bg-[#E07800] hover:shadow-[0_4px_16px_rgba(255,140,0,0.35)]
                           hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#013364] text-white
                           text-sm font-semibold rounded-xl transition-all duration-300
                           hover:bg-[#01254d] hover:shadow-[0_4px_16px_rgba(1,51,100,0.3)]
                           hover:-translate-y-0.5 active:translate-y-0"
              >
                <Lock className="w-3.5 h-3.5" />
                Booking
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl
                         border border-[#e2e8f0] text-[#013364] hover:bg-[#f8fafc] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-[#013364]/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm
                         bg-white border-l border-[#e2e8f0] flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-[#e2e8f0]">
                <Image src="/img/logo.png" alt="Stranz" width={140} height={40} className="h-9 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                             border border-[#e2e8f0] text-[#475569] hover:text-[#013364]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-medium transition-all duration-200",
                        link.href === "/booking"
                          ? "text-[#013364] bg-[#013364]/8 border border-[#013364]/15 hover:bg-[#013364] hover:text-white"
                          : "text-[#475569] hover:text-[#013364] hover:bg-[#f8fafc]"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {link.href === "/booking" && <Lock className="w-3.5 h-3.5" />}
                        {link.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="p-5 border-t border-[#e2e8f0] space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5
                             bg-[#FF8C00] text-white font-semibold rounded-xl
                             hover:bg-[#E07800] transition-colors"
                >
                  Get a Quote
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919566952888"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5
                             bg-[#f8fafc] border border-[#e2e8f0] text-[#013364]
                             font-medium rounded-xl hover:bg-[#f1f5f9] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +91 95669 52888
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
