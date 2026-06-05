"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/LanguageToggle";
import { t } from "@/lib/i18n";
import { Eye, EyeOff, AlertCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

const USERNAME_TO_EMAIL: Record<string, string> = {
  admin: "admin@stranz.hr",
  co: "co@stranz.hr",
  staff: "staff@stranz.hr",
  accounts: "accounts@stranz.hr",
  driver: "driver@stranz.hr",
};

const SLIDES = [
  {
    src: "/img/gallery/fleet/1.jpeg",
    headline: "Move South India",
    sub: "Technology-first logistics operations across Tamil Nadu, Karnataka & Pondicherry.",
  },
  {
    src: "/img/gallery/fleet/2.jpeg",
    headline: "GPS-Tracked Fleet",
    sub: "Real-time visibility on every truck, every shipment, every kilometre.",
  },
  {
    src: "/img/gallery/ops/1.jpeg",
    headline: "Operations Built for Scale",
    sub: "FTL · Contract Logistics · Warehousing · Last-Mile delivery.",
  },
  {
    src: "/img/gallery/fleet/3.jpeg",
    headline: "Safety First",
    sub: "Trained drivers, verified routes, and full compliance on every run.",
  },
];

const STATS = [
  { value: "500+", label: "Trips/month" },
  { value: "4", label: "Corridors" },
  { value: "GPS", label: "Live tracking" },
];

export default function LoginPage() {
  const { signIn, user, lang } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (user) router.push("/portal/dashboard");
  }, [user, router]);

  // Auto-advance slides
  useEffect(() => {
    const id = setInterval(() => {
      setFadingOut(true);
      setTimeout(() => {
        setSlide((s) => (s + 1) % SLIDES.length);
        setFadingOut(false);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goToSlide = (i: number) => {
    if (i === slide) return;
    setFadingOut(true);
    setTimeout(() => { setSlide(i); setFadingOut(false); }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const key = username.trim().toLowerCase();
    const email = USERNAME_TO_EMAIL[key];
    if (!email) { setError("Invalid username or password."); return; }
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) setError("Invalid username or password.");
    else router.push("/portal/dashboard");
  };

  return (
    <div className="flex min-h-screen">

      {/* ── Left panel: image + branding ── */}
      <div className="relative hidden lg:flex lg:w-[55%] flex-col overflow-hidden bg-[#013364]">

        {/* Background image */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: fadingOut ? 0 : 1 }}
        >
          <Image
            src={SLIDES[slide].src}
            alt={SLIDES[slide].headline}
            fill
            className="object-cover"
            priority
            sizes="55vw"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#013364]/90 via-[#013364]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative flex flex-1 flex-col justify-between p-10">

          {/* Logo */}
          <div>
            <Image
              src="/img/logo.png"
              alt="Stranz Logistics"
              width={160}
              height={46}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Headline (fades with image) */}
          <div
            className="space-y-3 transition-opacity duration-500"
            style={{ opacity: fadingOut ? 0 : 1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FF8C00]">
              Staff Portal
            </p>
            <h2 className="text-4xl font-bold leading-tight text-white">
              {SLIDES[slide].headline}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              {SLIDES[slide].sub}
            </p>
          </div>

          {/* Bottom: stats + dots */}
          <div className="space-y-6">
            {/* Stats row */}
            <div className="flex gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/50">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Slide dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    width: i === slide ? "24px" : "8px",
                    height: "8px",
                    background: i === slide ? "#FF8C00" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: login form ── */}
      <div className="flex flex-1 flex-col bg-[oklch(0.985_0.005_85)]">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to website</span>
          </Link>
          <LanguageToggle />
        </div>

        {/* Form area — vertically centred */}
        <div className="flex flex-1 items-center justify-center px-8 py-8">
          <div className="w-full max-w-sm space-y-8">

            {/* Color logo + header */}
            <div className="space-y-4">
              <Image
                src="/img/logo.png"
                alt="Stranz Logistics"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
              />
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-[oklch(0.205_0.035_260)]">
                  Welcome back
                </h1>
                <p className="text-sm text-[oklch(0.5_0.025_260)]">
                  Sign in to your Stranz employee account
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username}
                  placeholder="e.g. admin, staff, driver"
                  autoComplete="username"
                  onChange={(e) => { setUsername(e.target.value); setError(null); }}
                  className={`h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  {t("password", lang)}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    className={`h-11 pr-10 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="group h-11 w-full bg-[#013364] text-sm font-semibold hover:bg-[#012050] transition-all"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {t("signIn", lang)}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            {/* Animated loading bar when submitting */}
            {submitting && (
              <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#FF8C00]"
                  style={{
                    animation: "portal-progress 1.5s ease-in-out infinite",
                    width: "40%",
                  }}
                />
                <style>{`
                  @keyframes portal-progress {
                    0% { left: -40%; }
                    100% { left: 100%; }
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-8 py-5 text-center text-xs text-[oklch(0.5_0.025_260)]">
          For Stranz employees only · &copy; {new Date().getFullYear()} Stranz Logistics
        </div>
      </div>
    </div>
  );
}
