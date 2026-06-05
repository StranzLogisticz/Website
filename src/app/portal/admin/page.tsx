"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { t, getGreeting } from "@/lib/i18n";
import { Users, FileCheck, Clock, CalendarDays, HandCoins, FileText, IndianRupee, Activity, MapPin, CalendarPlus, ListChecks } from "lucide-react";

interface Stats {
  employees: number; pendingClaims: number; todayAttendance: number;
  pendingLeaves: number; pendingAdvances: number; pendingDocs: number;
  outsideGeofence: number; monthNet: number;
}

export default function AdminIndexPage() {
  const { lang, role, profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    employees: 0, pendingClaims: 0, todayAttendance: 0,
    pendingLeaves: 0, pendingAdvances: 0, pendingDocs: 0, outsideGeofence: 0, monthNet: 0,
  });
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
      const now = new Date();
      const [emp, claims, att, leaves, advances, docs, outside, payroll] = await Promise.all([
        supabase.from("employees").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("expense_claims").select("id", { count: "exact", head: true }).in("status", ["pending_accounts", "pending_owner"]),
        supabase.from("attendance_logs").select("id", { count: "exact", head: true }).gte("logged_at", startOfDay.toISOString()),
        supabase.from("leave_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("salary_advances").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("employee_documents").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("attendance_logs").select("id", { count: "exact", head: true }).in("verification_status", ["pending_review", "outside_geofence", "no_site"]).gte("logged_at", startOfDay.toISOString()),
        supabase.from("payroll_months").select("id").eq("year", now.getFullYear()).eq("month", now.getMonth() + 1).maybeSingle(),
      ]);
      let monthNet = 0;
      if (payroll.data?.id) {
        const { data: items } = await supabase.from("payroll_items").select("net_pay").eq("payroll_month_id", payroll.data.id);
        monthNet = (items ?? []).reduce((a, b) => a + Number(b.net_pay || 0), 0);
      }
      setStats({
        employees: emp.count ?? 0, pendingClaims: claims.count ?? 0, todayAttendance: att.count ?? 0,
        pendingLeaves: leaves.count ?? 0, pendingAdvances: advances.count ?? 0, pendingDocs: docs.count ?? 0,
        outsideGeofence: outside.count ?? 0, monthNet,
      });
      if (role === "owner") {
        const { data: aud } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(10);
        setActivity(aud ?? []);
      }
    };
    load();
  }, [role]);

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  const roleLabel = role ? t(role as "owner" | "accounts" | "ceo" | "office", lang) : "";

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <section className="hero-gradient p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider opacity-80">{today}</p>
            <h1 className="mt-1 truncate text-2xl font-semibold sm:text-3xl">
              {getGreeting(lang)}{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-1 text-sm opacity-90">{t("todaysOverview", lang)}</p>
          </div>
          {roleLabel && (
            <span className="shrink-0 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">{roleLabel}</span>
          )}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
          <Link href="/portal/admin/approvals" className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur transition-colors hover:bg-white/20">
            <p className="text-[11px] uppercase tracking-wider opacity-80">{t("pendingApprovals", lang)}</p>
            <p className="mt-1 text-2xl font-bold">{stats.pendingClaims}</p>
          </Link>
          <Link href="/portal/admin/attendance" className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur transition-colors hover:bg-white/20">
            <p className="text-[11px] uppercase tracking-wider opacity-80">{t("awaitingApproval", lang)}</p>
            <p className="mt-1 text-2xl font-bold">{stats.outsideGeofence}</p>
          </Link>
        </div>
      </section>

      <div>
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("quickStats", lang)}</h2>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-5 w-5" />} label={t("totalEmployees", lang)} value={stats.employees} tone="bg-blue-100 text-blue-700" href="/portal/admin/employees" />
          <StatCard icon={<Clock className="h-5 w-5" />} label={t("todayAttendance", lang)} value={stats.todayAttendance} tone="bg-green-100 text-green-700" href="/portal/admin/attendance" />
          <StatCard icon={<FileCheck className="h-5 w-5" />} label={t("pendingApprovals", lang)} value={stats.pendingClaims} tone="bg-amber-100 text-amber-700" href="/portal/admin/approvals" />
          <StatCard icon={<CalendarDays className="h-5 w-5" />} label={t("leaveRequests", lang)} value={stats.pendingLeaves} tone="bg-violet-100 text-violet-700" href="/portal/admin/leave-requests" />
          <StatCard icon={<HandCoins className="h-5 w-5" />} label={t("advances", lang)} value={stats.pendingAdvances} tone="bg-orange-100 text-orange-700" href="/portal/admin/advances" />
          <StatCard icon={<FileText className="h-5 w-5" />} label={t("documents", lang)} value={stats.pendingDocs} tone="bg-cyan-100 text-cyan-700" href="/portal/admin/approvals" />
          <StatCard icon={<MapPin className="h-5 w-5" />} label={t("awaitingApproval", lang)} value={stats.outsideGeofence} tone="bg-red-100 text-red-700" href="/portal/admin/attendance" />
          <StatCard icon={<IndianRupee className="h-5 w-5" />} label={t("netPay", lang)} value={`₹${stats.monthNet.toLocaleString("en-IN")}`} tone="bg-emerald-100 text-emerald-700" href="/portal/admin/payroll" />
        </div>
      </div>

      {role === "accounts" && (
        <div>
          <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("myLeaves", lang)}</h2>
          <div className="flex gap-3">
            <Link href="/portal/admin/leave/new" className="tile-premium flex h-20 flex-1 flex-col items-center justify-center gap-1.5 px-1 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700"><CalendarPlus className="h-[18px] w-[18px]" /></span>
              <span className="text-[10.5px] font-semibold leading-tight">{t("applyLeave", lang)}</span>
            </Link>
            <Link href="/portal/admin/leave" className="tile-premium flex h-20 flex-1 flex-col items-center justify-center gap-1.5 px-1 text-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700"><ListChecks className="h-[18px] w-[18px]" /></span>
              <span className="text-[10.5px] font-semibold leading-tight">{t("myLeaves", lang)}</span>
            </Link>
          </div>
        </div>
      )}

      {role === "owner" && activity.length > 0 && (
        <Card className="kpi-glass border-0">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Activity className="h-4 w-4" /> {t("recentActivity", lang)}</div>
            <ul className="space-y-2">
              {activity.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-2 border-b pb-2 last:border-0 text-xs">
                  <span className="min-w-0 truncate"><span className="font-mono">{a.action}</span> · {a.entity_type}</span>
                  <span className="shrink-0 text-muted-foreground">{new Date(a.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, tone, href }: { icon: React.ReactNode; label: string; value: number | string; tone: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3 p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>{icon}</div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-xl font-bold sm:text-2xl">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="kpi-glass block transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_oklch(0.32_0.09_265_/_0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {inner}
      </Link>
    );
  }
  return <div className="kpi-glass">{inner}</div>;
}
