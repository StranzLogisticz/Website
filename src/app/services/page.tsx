import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Stranz offers full-spectrum logistics services — from Contract Logistics and FTL to Warehousing, GPS Tracking, Air & Sea Cargo, and internal business software.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
