"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/animations/variants";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
              Terms of Service
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
            <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legal agreement between you and Stranz Logistics. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Services Provided</h2>
            <p>
              Stranz Logistics provides technology-first logistics operations services in South India, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Contract Logistics Solutions</li>
              <li>Full Truck Load (FTL) Services</li>
              <li>Warehousing and Distribution</li>
              <li>GPS Tracking and Real-time Monitoring</li>
              <li>Air and Sea Cargo Services</li>
              <li>Fleet Management Services</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. User Responsibilities</h2>
            <p>
              You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use services for illegal purposes</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of unauthorized access</li>
              <li>Not interfere with or disrupt our services</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Cargo and Shipping Restrictions</h2>
            <p>
              We do not accept shipments containing:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Hazardous or dangerous materials without proper documentation</li>
              <li>Illegal substances or counterfeit items</li>
              <li>Weapons or explosives</li>
              <li>Perishable goods without appropriate handling arrangements</li>
              <li>Any items prohibited by applicable law</li>
            </ul>
            <p className="mt-4">
              Customers must provide accurate declarations for all shipments.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Payment Terms</h2>
            <div className="space-y-3">
              <p>
                Payment for services must be made according to the agreed billing terms. By default:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Invoices are issued upon completion of services</li>
                <li>Payment is due within 30 days of invoice date</li>
                <li>Late payments may incur additional charges</li>
                <li>We accept various payment methods as specified in our invoices</li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Stranz Logistics shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits or data</li>
              <li>Service interruptions beyond our reasonable control</li>
              <li>Delays caused by force majeure events</li>
              <li>Damages exceeding the amount paid for services</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Intellectual Property</h2>
            <p>
              All content on our website, including logos, text, graphics, and images, is the property of Stranz Logistics or its content suppliers and is protected by copyright laws. You may not reproduce or distribute this content without explicit permission.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Stranz Logistics from any claims, damages, or losses arising from your use of our services or violation of these Terms.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services at any time for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Violation of these Terms</li>
              <li>Non-payment of invoices</li>
              <li>Illegal activity or fraud</li>
              <li>Inappropriate use of services</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or our services shall be governed by the laws of Tamil Nadu, India. Both parties agree to attempt resolution through negotiation before pursuing legal action.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of our services following modifications constitutes acceptance of the updated Terms.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Contact Information</h2>
            <p>
              For questions or concerns regarding these Terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-white/[0.05] rounded-lg border border-white/[0.1]">
              <p><span className="text-white">Email:</span> support@stranzlogistics.com</p>
              <p><span className="text-white">Phone:</span> +91 95669 52888</p>
              <p><span className="text-white">Address:</span> South India Corridor Operations</p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
