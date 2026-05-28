import type { Metadata } from "next";
import IndustriesPageContent from "./IndustriesPageContent";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Stranz serves FMCG, Manufacturing, E-commerce, Retail, and Project Cargo industries with specialized logistics solutions across South India.",
};

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
