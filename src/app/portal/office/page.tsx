"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { t, getGreeting } from "@/lib/i18n";
import { toast } from "sonner";
import { CalendarPlus, ListChecks, LogIn, LogOut, Loader2, Wallet, FileText, IndianRupee, House } from "lucide-react";

export default function OfficeHome() {
  const { profile, lang, signOut } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const punch = async (type: "office_in" | "office_out") => {
    if (!profile) return;
    setBusy(type);
    try {
      const { error } = await supabase.from("attendance_logs").insert({ employee_id: profile.id, log_type: type });
      if (error) throw error;
      toast.success(t("attendanceMarked", lang));
    } catch (e) { toast.error((e as Error).message); } finally { setBusy(null); }
  };

  const handleSignOut = async () => { await signOut(); router.push("/portal/login"); };
  const firstName = (profile?.full_name ?? "").split(" ")[0] || "";

  const tiles = [
    { to: "/portal/office/leave/new", icon: CalendarPlus, label: t("applyLeave", lang), tone: "bg-violet-100 text-violet-700" },
    { to: "/portal/office/leave", icon: ListChecks, label: t("myLeaves", lang), tone: "bg-blue-100 text-blue-700" },
    { to: "/portal/office/advances", icon: Wallet, label: t("advances", lang), tone: "bg-orange-100 text-orange-700" },
    { to: "/portal/office/documents", icon: FileText, label: t("documents", lang), tone: "bg-cyan-100 text-cyan-700" },
    { to: "/portal/office/summary", icon: IndianRupee, label: t("payslips", lang), tone: "bg-emerald-100 text-emerald-700" },
  ] as const;

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b bg-background/95 px-3 py-2 backdrop-blur">
        <p className="min-w-0 truncate text-xs font-medium text-muted-foreground">{t("welcome", lang)}</p>
        <div className="flex shrink-0 items-center gap-1">
          <Link href="/" title="Back to Stranz website"><Button size="icon" variant="ghost" aria-label="Back to website"><House className="h-4 w-4" /></Button></Link>
          <LanguageToggle />
          <Button size="icon" variant="ghost" onClick={handleSignOut} aria-label="Sign out"><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>
      <main className="mx-auto max-w-2xl space-y-4 px-3 pt-4">
        <section className="hero-gradient p-4">
          <p className="text-[11px] uppercase tracking-wider opacity-80">{new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}</p>
          <h1 className="mt-1 truncate text-xl font-semibold sm:text-2xl">{getGreeting(lang)}{firstName ? `, ${firstName}` : ""}</h1>
          <p className="mt-1 text-sm opacity-90">{t("office", lang)}</p>
        </section>
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" className="h-20 bg-green-600 text-base hover:bg-green-700" disabled={busy !== null} onClick={() => punch("office_in")}>{busy === "office_in" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 !h-5 !w-5" />}<span className="font-bold">{t("punchIn", lang)}</span></Button>
          <Button size="lg" variant="destructive" className="h-20 text-base" disabled={busy !== null} onClick={() => punch("office_out")}>{busy === "office_out" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogOut className="mr-2 !h-5 !w-5" />}<span className="font-bold">{t("punchOut", lang)}</span></Button>
        </div>
        <div>
          <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("quickActions", lang)}</h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {tiles.map((tile) => (
              <Link key={tile.to} href={tile.to} className="tile-premium flex h-20 flex-col items-center justify-center gap-1.5 px-1 text-center">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tile.tone}`}><tile.icon className="h-[18px] w-[18px]" /></span>
                <span className="line-clamp-2 text-[10.5px] font-semibold leading-tight">{tile.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
