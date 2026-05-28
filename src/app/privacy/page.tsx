"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#013364] to-black">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#FF8C00] hover:text-[#FFB347] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/60 text-lg">
              Last updated: May 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-white/80"
        >
          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p>
              Stranz Logistics ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">Personal Information</h3>
                <p>
                  We collect information you provide directly, such as:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                  <li>Name, email address, and phone number</li>
                  <li>Company name and business details</li>
                  <li>Shipping information and cargo details</li>
                  <li>Billing and payment information</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white/90 mb-2">Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referral source and navigation patterns</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Processing and managing your shipping orders</li>
              <li>Providing GPS tracking and logistics services</li>
              <li>Sending service updates and notifications</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Marketing purposes (with your consent)</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Service providers who assist in our operations</li>
              <li>Business partners necessary for service delivery</li>
              <li>Law enforcement when legally required</li>
              <li>Other parties with your explicit consent</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Cookies</h2>
            <p>
              Our website uses cookies to enhance your experience. You can control cookie settings through your browser preferences. Some features may not function properly without cookies.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
            <p>
              For privacy-related inquiries, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-white/[0.05] rounded-lg border border-white/[0.1]">
              <p><span className="text-white">Email:</span> privacy@stranzlogistics.com</p>
              <p><span className="text-white">Phone:</span> +91 95669 52888</p>
              <p><span className="text-white">Address:</span> South India Corridor Operations</p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
