"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, Zap, Shield, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const featureCards = [
  {
    image: "/img/auto-1.png",
    title: "Swift Response",
    desc:  "We respond on the same business day for all inquiries — our ops team is always on standby.",
    icon:  Zap,
  },
  {
    image: "/img/contract-1.png",
    title: "Reliable & Secure",
    desc:  "Safety-first execution and full transparency across every shipment we handle.",
    icon:  Shield,
  },
  {
    image: "/img/gallery/fleet/1.jpeg",
    title: "Regional Coverage",
    desc:  "Strong networks across Tamil Nadu — Chennai, Coimbatore, Bangalore, and Pondicherry.",
    icon:  MapPin,
  },
];

// Animated particle component
function AnimatedParticle({ delay, duration }: { delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      initial={{
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1,
      }}
      animate={{
        opacity: [0, 1, 0],
        x: (Math.random() - 0.5) * 400,
        y: -300 - Math.random() * 200,
        scale: [0, 1, 0],
      }}
      transition={{
        delay,
        duration,
        ease: "easeOut",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: "50%",
      }}
    />
  );
}

// Success pulse rings
function SuccessPulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border border-white/20 rounded-full"
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{
            width: [0, 200, 400],
            height: [0, 200, 400],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            delay: ring * 0.2,
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-200px",
            marginTop: "-200px",
          }}
        />
      ))}
    </div>
  );
}

// Floating icons animation
function FloatingIcons() {
  const icons = [
    { emoji: "📦", delay: 0 },
    { emoji: "✓", delay: 0.2 },
    { emoji: "🚚", delay: 0.4 },
    { emoji: "⏱️", delay: 0.6 },
    { emoji: "🛡️", delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-10"
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.sin(i) * 50, 0],
            rotate: [0, 360],
          }}
          transition={{
            delay: item.delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: "20%",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default function ThankYouPage() {
  const waNumber = "919566952888";
  const waMessage = encodeURIComponent(
    "Hi Stranz, I just submitted an inquiry on your website and would like to discuss it further."
  );

  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    // Generate particles for confetti effect
    const particleCount = 15;
    setParticles(Array.from({ length: particleCount }, (_, i) => i));
  }, []);

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Orange hero banner with interactive motion */}
      <section className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 py-24 text-center relative overflow-hidden">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-green-700/20 via-transparent to-green-400/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated background elements */}
        <SuccessPulseRings />
        <FloatingIcons />

        {/* Dot pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />

        {/* Animated particles - confetti effect */}
        <div className="absolute inset-0">
          {particles.map((i) => (
            <AnimatedParticle
              key={i}
              delay={i * 0.05}
              duration={2 + Math.random() * 0.5}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto px-4 z-10"
        >
          {/* Animated checkmark with glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative w-16 h-16 rounded-full bg-white/20 border border-white/30
                       flex items-center justify-center mx-auto mb-6"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/10 blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Checkmark */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <CheckCircle2 className="w-8 h-8 text-white relative z-10" />
            </motion.div>
          </motion.div>

          {/* Heading with letter animation */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {"Inquiry Received!".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + i * 0.03,
                  duration: 0.4,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description with fade and slide */}
          <motion.p
            className="text-white/90 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            We have successfully received your message. Our operations team is reviewing
            it now — we&apos;ll reach back to you soon.
          </motion.p>

          {/* Progress indicator */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className="flex items-center"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    delay: 1 + step * 0.2,
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                />
                {step < 3 && (
                  <motion.div
                    className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-white/10 ml-2"
                    animate={{
                      scaleX: [0, 1],
                    }}
                    transition={{
                      delay: 1 + step * 0.2,
                      duration: 0.8,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Floating success card */}
      <section className="relative max-w-3xl mx-auto px-4 -mt-10 mb-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border border-[#e2e8f0]
                     shadow-[0_20px_60px_rgba(1,51,100,0.14)] p-8 md:p-10 text-center"
        >
          <p className="text-[#475569] text-base leading-relaxed mb-8 pb-8 border-b border-[#e2e8f0]">
            Stranz Logistics operates with{" "}
            <span className="text-green-500 font-semibold">Disciplined Execution</span> and{" "}
            <span className="text-green-500 font-semibold">Proactive Coordination</span>.
            A member of our team will contact you within{" "}
            <span className="font-semibold text-[#013364]">24 hours</span> with full details.
          </p>

          <h3 className="text-base font-semibold text-[#013364] mb-5">
            Need to discuss this load urgently?
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${waNumber}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                         bg-green-500 text-white font-semibold rounded-xl
                         hover:bg-green-600 hover:shadow-[0_8px_20px_rgba(37,211,102,0.35)]
                         hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Share Inquiry on WhatsApp
            </a>
            <a
              href="tel:+919566952888"
              className="inline-flex items-center justify-center gap-2 px-7 py-4
                         bg-[#013364] text-white font-semibold rounded-xl
                         hover:bg-[#012050] hover:shadow-[0_4px_16px_rgba(1,51,100,0.25)]
                         hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#94a3b8]
                       hover:text-[#013364] transition-colors mt-6"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            Return to Home
          </Link>
        </motion.div>
      </section>

      {/* Three feature cards */}
      <section className="bg-[#f8fafc] border-t border-[#e2e8f0] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {featureCards.map(({ image, title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden
                           shadow-[0_2px_12px_rgba(1,51,100,0.05)] text-center"
              >
                <div className="relative h-48">
                  <Image src={image} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/40 to-transparent" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 border border-green-300/30
                                  flex items-center justify-center mx-auto">
                    <Icon className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-base font-bold text-[#013364]">{title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social ribbon */}
      <section className="bg-white border-t border-[#e2e8f0] py-12 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-lg font-bold text-[#013364] mb-6">Follow Stranz Logistics</h2>
          <div className="flex items-center justify-center flex-wrap gap-4">
            {[
              { label: "LinkedIn",  href: "https://www.linkedin.com/company/stranz" },
              { label: "Facebook",  href: "https://www.facebook.com/stranz" },
              { label: "Instagram", href: "https://www.instagram.com/stranz" },
              { label: "X",        href: "https://twitter.com/stranz" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-semibold
                           text-[#475569] hover:text-[#013364] hover:border-[#013364]/20
                           hover:bg-[#f8fafc] transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
