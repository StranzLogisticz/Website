import type { Metadata } from "next";
import FleetPageContent from "./FleetPageContent";

export const metadata: Metadata = {
  title: "Fleet",
  description:
    "Stranz operates a full range of fleet vehicles from 7ft Tata Ace to 32ft MXL/SXL closed containers for city, inter-city, and heavy industrial logistics.",
};

export default function FleetPage() {
  return <FleetPageContent />;
}
