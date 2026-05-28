import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stranz Logistics | Technology-First Logistics Operations",
    template: "%s | Stranz Logistics",
  },
  description:
    "Stranz is a technology-first logistics operations company based in Chennai, Tamil Nadu. Delivering safety, speed, and full visibility across South India.",
  keywords: ["logistics","freight","transport","Chennai","Tamil Nadu","FTL","fleet management","supply chain","Stranz"],
  authors: [{ name: "Stranz Logistics" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://stranz.in",
    siteName: "Stranz Logistics",
    title: "Stranz Logistics | Technology-First Logistics Operations",
    description: "Technology-first logistics operations. Safety, speed, and full visibility across South India.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stranz Logistics",
    description: "Technology-First Logistics Operations in South India.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/img/S TRANZ LOGO JPG FILES-04.jpg",
    shortcut: "/img/S TRANZ LOGO JPG FILES-04.jpg",
    apple: "/img/S TRANZ LOGO JPG FILES-04.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-[#013364] antialiased overflow-x-hidden">
        {/* Initial page-load splash — removed by inline script once window loads */}
        <div
          id="page-loader"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            transition: "opacity 0.4s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            alt="Stranz Logistics"
            style={{ width: "200px", height: "auto", objectFit: "contain" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#FF8C00",
                  display: "inline-block",
                  animation: `stranz-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes stranz-bounce {
              0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
              40% { transform: translateY(-8px); opacity: 1; }
            }
          `}</style>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function hideSplash() {
                  var el = document.getElementById('page-loader');
                  if (!el) return;
                  el.style.opacity = '0';
                  setTimeout(function() { el.style.display = 'none'; }, 400);
                }
                if (document.readyState === 'complete') {
                  hideSplash();
                } else {
                  window.addEventListener('load', hideSplash);
                }
              })();
            `,
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
