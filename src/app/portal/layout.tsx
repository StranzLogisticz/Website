import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Stranz HR Portal",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflowY: "auto",
        background: "oklch(0.985 0.005 85)",
        color: "oklch(0.205 0.035 260)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </div>
  );
}
