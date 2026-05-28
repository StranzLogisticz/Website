import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Stranz is a professionally managed logistics company delivering structured, reliable, and execution-driven freight solutions across South India.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
