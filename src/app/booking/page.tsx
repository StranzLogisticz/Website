"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2, ExternalLink, Wifi } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-[#e2e8f0]">

        {/* LEFT — Industrial visual */}
        <div
          className="relative hidden lg:flex flex-col justify-end p-10"
          style={{
            background: "linear-gradient(145deg, #013364 0%, #01254d 60%, #011b38 100%)",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Accent blob */}
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#FF8C00]/10 blur-3xl" />

          <div className="relative z-10 space-y-5">
            <span className="text-[#FF8C00] text-xs font-semibold tracking-widest uppercase">
              Enterprise Management
            </span>
            <h2 className="text-3xl font-bold text-white leading-snug">
              Precision-Engineered<br />Logistics Management.
            </h2>
            <div className="w-12 h-[3px] bg-[#FF8C00] rounded-full" />
            <p className="text-[#94a3b8] text-sm leading-relaxed max-w-xs">
              Secure infrastructure for regional transit optimization and fleet synchronization.
            </p>

            <ul className="space-y-3 pt-2">
              {["Real-time Booking", "Automated Invoicing", "Fleet Tracking"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — Gateway login area */}
        <div className="bg-white flex flex-col justify-center p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Security badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-xs font-medium text-[#475569]">
              <Lock className="w-3.5 h-3.5 text-[#013364]" />
              Authorized Access Only
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#013364]">System Login</h1>
              <p className="mt-2 text-sm text-[#64748b] leading-relaxed">
                Access the Stranz internal ecosystem to manage active routes and assets.
              </p>
            </div>

            {/* Features — mobile only (left panel is hidden on mobile) */}
            <ul className="lg:hidden space-y-2.5">
              {["Real-time Booking", "Automated Invoicing", "Fleet Tracking"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Primary CTA button */}
            <motion.a
              href="https://transports.stranz.in/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full px-6 py-4
                         bg-[#013364] text-white font-semibold rounded-xl text-sm
                         shadow-[0_4px_20px_rgba(1,51,100,0.25)]
                         hover:bg-[#01254d] hover:shadow-[0_6px_28px_rgba(1,51,100,0.35)]
                         transition-all duration-300"
            >
              <Lock className="w-4 h-4" />
              Login to Dashboard
              <ExternalLink className="w-4 h-4 opacity-70" />
            </motion.a>

            {/* Status bar */}
            <div className="flex items-center gap-2 text-xs text-[#64748b]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <Wifi className="w-3.5 h-3.5 text-green-500" />
              System Status: <strong className="text-[#013364] ml-0.5">Online</strong>
            </div>

            {/* Security note */}
            <p className="text-[11px] text-[#94a3b8] leading-relaxed border-t border-[#f1f5f9] pt-4">
              Unauthorized access attempts are logged. This system is for Stranz Logistics
              Authorized Personnel only.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
