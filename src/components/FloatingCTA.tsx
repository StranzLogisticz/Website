"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Phone, Lock, X, Layers } from "lucide-react";

const actions = [
  {
    icon: <Ticket className="w-5 h-5" />,
    label: "Get Price",
    sub: "Book a route",
    href: "/contact",
    color: "#FF8C00",
    bg: "#FFF3E0",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Call Us",
    sub: "+91 95669 52888",
    href: "tel:+919566952888",
    color: "#013364",
    bg: "#EEF3FB",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    label: "Booking",
    sub: "Internal portal",
    href: "/booking",
    color: "#013364",
    bg: "#EEF3FB",
  },
];

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2"
        >
          {/* Action items — expand upward */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-2 mb-1"
              >
                {[...actions].reverse().map((action, i) => (
                  <motion.div
                    key={action.label}
                    custom={i}
                    variants={{
                      open: (i) => ({
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 0.07, type: "spring", damping: 22, stiffness: 300 },
                      }),
                      closed: (i) => ({
                        opacity: 0,
                        y: 16,
                        transition: { delay: i * 0.04 },
                      }),
                    }}
                  >
                    <Link
                      href={action.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 pl-2 pr-4 py-2.5
                                 bg-white border border-[#e2e8f0] rounded-2xl
                                 shadow-[0_4px_20px_rgba(1,51,100,0.12)]
                                 hover:shadow-[0_6px_28px_rgba(1,51,100,0.2)]
                                 hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: action.bg, color: action.color }}
                      >
                        {action.icon}
                      </span>
                      <span className="flex flex-col leading-none">
                        <span className="text-sm font-semibold text-[#013364] group-hover:text-[#FF8C00] transition-colors">
                          {action.label}
                        </span>
                        <span className="text-[11px] text-[#94a3b8] mt-0.5">{action.sub}</span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="w-14 h-14 rounded-full bg-[#013364] text-white
                       flex items-center justify-center
                       shadow-[0_6px_28px_rgba(1,51,100,0.35)]
                       hover:bg-[#01254d] transition-colors"
            aria-label={open ? "Close menu" : "Open quick actions"}
          >
            <motion.div
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {open ? <X className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
