"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PunchPanel } from "@/components/PunchPanel";
import { t, getGreeting } from "@/lib/i18n";
import { LogIn, LogOut, Receipt, BarChart3, MapPin, LogOut as SignOutIcon, CalendarPlus, Wallet, FileText, IndianRupee, House } from "lucide-react";

interface AttendanceLog {
  id: string;
  log_type: "driver_in" | "driver_out" | "office_in" | "office_out";
  logged_at: string;
  latitude: number | null;
}

export function DriverHome() {
  const { profile, lang, signOut } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<AttendanceLog[]>([]);

  const loadLogs = async () => {
    if (!profile) return;
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const { data } = await supabase.from("attendance_logs").select("id, log_type, logged_at, latitude")
      .eq("employee_id", profile.id).gte("logged_at", startOfDay.toISOString()).order("logged_at", { ascending: false });
    if (data) setLogs(data as AttendanceLog[]);
  };

  useEffect(() => {
    loadLogs();
    const i = setInterval(loadLogs, 15000);
    return () => clearInterval(i);
  }, [profile]);

  const handleSignOut = async () => { await signOut(); router.push("/portal/login"); };

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "";

  const tiles = [
    { to: "/portal/driver/expense", icon: Receipt, label: t("addExpense", lang), tone: "bg-amber-100 text-amber-700" },
    { to: "/portal/driver/leave/new", icon: CalendarPlus, label: t("applyLeave", lang), tone: "bg-violet-100 text-violet-700" },
    { to: "/portal/driver/summary", icon: BarChart3, label: t("mySummary", lang), tone: "bg-blue-100 text-blue-700" },
    { to: "/portal/driver/advances", icon: Wallet, label: t("advances", lang), tone: "bg-orange-100 text-orange-700" },
    { to: "/portal/driver/documents", icon: FileText, label: t("documents", lang), tone: "bg-cyan-100 text-cyan-700" },
    { to: "/portal/driver/payslips", icon: IndianRupee, label: t("payslips", lang), tone: "bg-emerald-100 text-emerald-700" },
  ] as const;

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b bg-background/95 px-3 py-2 backdrop-blur">
        <p className="min-w-0 truncate text-xs font-medium text-muted-foreground">{t("welcome", lang)}</p>
        <div className="flex shrink-0 items-center gap-1">
          <Link href="/" title="Back to Stranz website">
            <Button size="icon" variant="ghost" aria-label="Back to website">
              <House className="h-4 w-4" />
            </Button>
          </Link>
          <LanguageToggle />
          <Button size="icon" variant="ghost" onClick={handleSignOut} aria-label="Sign out">
            <SignOutIcon className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="space-y-4 px-3 pt-4">
        <section className="hero-gradient p-4">
          <p className="text-[11px] uppercase tracking-wider opacity-80">
            {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}
          </p>
          <h1 className="mt-1 truncate text-xl font-semibold">
            {getGreeting(lang)}{firstName ? `, ${firstName}` : ""}
          </h1>
          {profile?.vehicle_number && (
            <span className="mt-2 inline-block rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur">
              {profile.vehicle_number}
            </span>
          )}
        </section>

        <PunchPanel inLabel={t("markIn", lang)} outLabel={t("markOut", lang)} inType="driver_in" outType="driver_out" />

        <div>
          <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("quickActions", lang)}</h2>
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((tile) => (
              <Link key={tile.to} href={tile.to} className="tile-premium flex h-20 flex-col items-center justify-center gap-1.5 px-1 text-center">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tile.tone}`}>
                  <tile.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="line-clamp-2 text-[10.5px] font-semibold leading-tight">{tile.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t("todayLogs", lang)}</h2>
          {logs.length === 0 ? (
            <Card className="card-elegant p-4 text-center text-sm text-muted-foreground">{t("noLogsToday", lang)}</Card>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => {
                const isIn = log.log_type === "driver_in" || log.log_type === "office_in";
                return (
                  <Card key={log.id} className="card-elegant flex items-center gap-3 border-l-4 p-3"
                    style={{ borderLeftColor: isIn ? "rgb(34 197 94)" : "rgb(239 68 68)" }}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${isIn ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {isIn ? <LogIn className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{isIn ? t("in", lang) : t("out", lang)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(log.logged_at).toLocaleTimeString()}</p>
                    </div>
                    {log.latitude && (
                      <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />{Number(log.latitude).toFixed(3)}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
