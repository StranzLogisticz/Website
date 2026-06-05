import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Portal (HR) shadcn tokens — oklch with opacity modifier support */
        background: "oklch(var(--background-vals) / <alpha-value>)",
        foreground: "oklch(var(--foreground-vals) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card-vals) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground-vals) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover-vals) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground-vals) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary-vals) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground-vals) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary-vals) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground-vals) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted-vals) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground-vals) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent-vals) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground-vals) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive-vals) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground-vals) / <alpha-value>)",
        },
        border: "oklch(var(--border-vals) / <alpha-value>)",
        input: "oklch(var(--input-vals) / <alpha-value>)",
        ring: "oklch(var(--ring-vals) / <alpha-value>)",
        sidebar: {
          DEFAULT: "oklch(var(--sidebar-vals) / <alpha-value>)",
          foreground: "oklch(var(--sidebar-foreground-vals) / <alpha-value>)",
          primary: "oklch(var(--sidebar-primary-vals) / <alpha-value>)",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground-vals) / <alpha-value>)",
          accent: "oklch(var(--sidebar-accent-vals) / <alpha-value>)",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground-vals) / <alpha-value>)",
          border: "oklch(var(--sidebar-border-vals) / <alpha-value>)",
          ring: "oklch(var(--sidebar-ring-vals) / <alpha-value>)",
        },
        navy: {
          DEFAULT: "#013364",
          50:  "#f0f5fb",
          100: "#d6e3f5",
          200: "#adc7eb",
          300: "#7aa5db",
          400: "#4e82c8",
          500: "#2e64b3",
          600: "#1e4d91",
          700: "#163b70",
          800: "#0d2a50",
          900: "#013364",
          950: "#010d24",
        },
        orange: {
          DEFAULT: "#FF8C00",
          50:  "#fff8f0",
          100: "#ffecd4",
          200: "#ffd4a0",
          300: "#ffb562",
          400: "#FFA333",
          500: "#FF8C00",
          600: "#E07800",
          700: "#b86200",
          800: "#964f00",
          900: "#753d00",
        },
        stranz: {
          navy:           "#013364",
          "navy-dark":    "#012050",
          orange:         "#FF8C00",
          "orange-dark":  "#E07800",
          "orange-light": "#FFA333",
          "orange-pale":  "#FFF3E0",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
        "8xl": ["6rem",   { lineHeight: "1" }],
        "9xl": ["8rem",   { lineHeight: "1" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        lg: "calc(var(--portal-radius))",
        md: "calc(var(--portal-radius) - 2px)",
        sm: "calc(var(--portal-radius) - 4px)",
        xl: "calc(var(--portal-radius) + 4px)",
        "2xl": "calc(var(--portal-radius) + 8px)",
      },
      boxShadow: {
        "card":         "0 1px 3px rgba(1,51,100,0.04), 0 8px 24px rgba(1,51,100,0.06)",
        "card-hover":   "0 4px 16px rgba(255,140,0,0.12), 0 1px 3px rgba(1,51,100,0.06)",
        "orange-glow":  "0 8px 28px rgba(255,140,0,0.35)",
        "navy-glow":    "0 8px 28px rgba(1,51,100,0.25)",
        "premium":      "0 0 0 1px rgba(226,232,240,1), 0 4px 24px rgba(1,51,100,0.08)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.6s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow":  "spin 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #FF8C00 0%, #FFA333 100%)",
        "navy-gradient":   "linear-gradient(135deg, #013364 0%, #1e4d8c 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
