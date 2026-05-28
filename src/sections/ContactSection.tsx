"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportConfig } from "@/animations/variants";

const contactInfo = [
  { icon: Phone, label: "Direct Line", value: "+91 95669 52888", href: "tel:+919566952888" },
  { icon: Mail, label: "Business Email", value: "info@stranz.in", href: "mailto:info@stranz.in" },
  { icon: MapPin, label: "Corporate HQ", value: "Chennai, Tamil Nadu, India", href: null },
  { icon: Clock, label: "Operations Hours", value: "Mon–Sat · 09:00–19:00 IST", href: null },
];

const industries = [
  "FMCG", "Manufacturing", "Import & Export",
  "E-commerce", "Project Cargo", "Industrial Materials",
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#f8fafc] section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e2e8f0]" />
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />

      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FF8C00]/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#013364]/5 blur-3xl pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M200,380 L580,200"
          stroke="#013364" strokeWidth={1.5} strokeDasharray="8 4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
        />
        <motion.path
          d="M200,380 L120,200"
          stroke="#013364" strokeWidth={1.5} strokeDasharray="8 4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />
        <motion.path
          d="M200,380 L300,430"
          stroke="#013364" strokeWidth={1.5} strokeDasharray="8 4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
        />
        <motion.path
          d="M580,200 L120,200"
          stroke="#013364" strokeWidth={1.5} strokeDasharray="8 4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.1, ease: "easeOut" }}
        />
        <motion.path
          d="M200,380 L380,300"
          stroke="#013364" strokeWidth={1.5} strokeDasharray="8 4" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.4, ease: "easeOut" }}
        />

        {[
          { cx: 200, cy: 380 },
          { cx: 580, cy: 200 },
          { cx: 120, cy: 200 },
          { cx: 300, cy: 430 },
          { cx: 380, cy: 300 },
        ].map(({ cx, cy }, i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={6}
            fill="#FF8C00"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.15, type: "spring" }}
          />
        ))}

        <motion.circle
          r={3}
          fill="#FF8C00"
          animate={{ cx: [200, 580], cy: [380, 200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        />
        <motion.circle
          r={3}
          fill="#FF8C00"
          animate={{ cx: [200, 120], cy: [380, 200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14 space-y-4"
        >
          <motion.span variants={fadeUp} className="section-eyebrow">
            Get In Touch
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-title">
            Let&apos;s Move Your
            <br />
            <span className="text-gradient-orange">Business Forward</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mx-auto">
            Tell us about your freight requirements and get a tailored
            logistics solution within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left sidebar — contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                variants={fadeLeft}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#e2e8f0]
                           hover:border-[#FF8C00]/25 hover:shadow-[0_2px_12px_rgba(255,140,0,0.08)]
                           transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFF3E0] border border-[#FF8C00]/20
                                flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#FF8C00]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="text-sm text-[#013364] hover:text-[#FF8C00] transition-colors font-medium">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-[#013364] font-medium">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.div variants={fadeLeft}>
              <a
                href="https://wa.me/919566952888"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl
                           bg-green-50 border border-green-200 text-green-700
                           hover:bg-green-100 hover:border-green-300 transition-all duration-300
                           font-semibold text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us Directly
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white border border-[#e2e8f0]
                            shadow-[0_1px_3px_rgba(1,51,100,0.04),0_8px_32px_rgba(1,51,100,0.06)]
                            p-7 md:p-9">
              <form
                action="https://api.staticforms.xyz/submit"
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="accessKey" value="sf_21df8be116a569a507f55266" />
                <input type="hidden" name="redirectTo" value="https://www.stranz.in/thankyou" />

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#013364]">Request a Quote</h3>
                  <p className="text-sm text-[#94a3b8] mt-1">
                    Fill out the form and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Full Name *" name="name" type="text" placeholder="Your name" required />
                  <FormField label="Phone Number *" name="phone" type="tel" placeholder="+91XXXXXXXXXX" required />
                  <FormField label="Pickup Location *" name="pick_up" type="text" placeholder="Pickup city" required />
                  <FormField label="Drop Location *" name="drop_to" type="text" placeholder="Destination city" required />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#94a3b8]">
                    Industry Segment *
                  </label>
                  <select
                    name="industry"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl
                               text-sm text-[#013364]
                               focus:outline-none focus:border-[#FF8C00]/50 focus:ring-1
                               focus:ring-[#FF8C00]/20 transition-all duration-200 appearance-none"
                  >
                    <option value="" disabled>Select your industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#94a3b8]">
                      Vehicle Size *
                    </label>
                    <select name="fleet_size" required className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#013364] focus:outline-none focus:border-[#FF8C00]/50 focus:ring-1 focus:ring-[#FF8C00]/20 transition-all duration-200 appearance-none">
                      <option value="" disabled>Select size</option>
                      <option value="7ft (Bada Dost)">7ft – Bada Dost</option>
                      <option value="14ft Container">14ft Container</option>
                      <option value="17ft High-Volume">17ft High-Volume</option>
                      <option value="19ft Specialized">19ft Specialized</option>
                      <option value="20ft-32ft MXL">20–32ft MXL / SXL</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#94a3b8]">
                      Body Type *
                    </label>
                    <select name="fleet_body" required className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#013364] focus:outline-none focus:border-[#FF8C00]/50 focus:ring-1 focus:ring-[#FF8C00]/20 transition-all duration-200 appearance-none">
                      <option value="" disabled>Select body type</option>
                      <option value="Closed Body">Closed Body</option>
                      <option value="Open Body">Open Body</option>
                      <option value="Side-Open">Side-Open</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#94a3b8]">
                    Message / Load Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your shipment requirements..."
                    className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl
                               text-sm text-[#013364] placeholder-[#cbd5e1] resize-none
                               focus:outline-none focus:border-[#FF8C00]/50 focus:ring-1
                               focus:ring-[#FF8C00]/20 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#FF8C00]
                             text-white font-semibold rounded-xl hover:bg-[#E07800] transition-all
                             duration-300 hover:shadow-[0_4px_24px_rgba(255,140,0,0.35)]
                             hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                  Submit Request
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, name, type, placeholder, required,
}: {
  label: string; name: string; type: string; placeholder: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold tracking-widest uppercase text-[#94a3b8]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl
                   text-sm text-[#013364] placeholder-[#cbd5e1]
                   focus:outline-none focus:border-[#FF8C00]/50 focus:ring-1
                   focus:ring-[#FF8C00]/20 transition-all duration-200"
      />
    </div>
  );
}
