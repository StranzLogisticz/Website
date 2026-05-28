import type { Metadata } from "next";
import ContactSection from "@/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Stranz Logistics. Request a quote for freight, FTL, warehousing, or custom logistics solutions across South India.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <ContactSection />
    </div>
  );
}
