"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { ArrowLeft, Calendar, Clock, IndianRupee, Award } from "lucide-react";

interface Summary { daysWorked: number; pending: number; approved: number; incentive: number; }

export default function SummaryPage() {
  const { profile, lang } = useAuth();
  const [s, setS] = useState<Summary>({ daysWorked: 0, pending: 0, approved: 0, incentive: 0 });

  useEffect(() => {
    const load = async () => {
      if (!profile) return;
      const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0);
      const [att, claims, inc] = await Promise.all([
        supabase.from("attendance_logs").select("logged_at, log_type").eq("employee_id", profile.id).in("log_type", ["driver_in", "office_in"]).gte("logged_at", start.toISOString()),
        supabase.from("expense_claims").select("amount, status").eq("employee_id", profile.id).gte("expense_date", start.toISOString().slice(0, 10)),
        supabase.from("incentive_entries").select("amount").eq("employee_id", profile.id).gte("created_at", start.toISOString()),
      ]);
      const days = new Set((att.data ?? []).map((r) => new Date(r.logged_at).toISOString().slice(0, 10))).size;
      let pending = 0, approved = 0;
      for (const c of claims.data ?? []) { if (c.status === "approved") approved += Number(c.amount); else if (c.status === "pending_accounts" || c.status === "pending_owner") pending += Number(c.amount); }
      const incentive = (inc.data ?? []).reduce((a, b) => a + Number(b.amount), 0);
      setS({ daysWorked: days, pending, approved, incentive });
    };
    load();
  }, [profile]);

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button asChild size="icon" variant="ghost"><Link href="/portal/driver" aria-label={t("back", lang)}><ArrowLeft className="h-5 w-5" /></Link></Button>
          <h1 className="text-base font-bold">{t("mySummary", lang)}</h1>
        </div>
      </header>
      <main className="space-y-3 px-4 pt-4">
        <p className="text-sm text-muted-foreground">{t("thisMonth", lang)}</p>
        {[
          { icon: <Calendar className="h-5 w-5" />, label: t("daysWorked", lang), value: String(s.daysWorked), tone: "bg-blue-100 text-blue-700" },
          { icon: <Clock className="h-5 w-5" />, label: t("pendingExpenses", lang), value: `₹${s.pending.toFixed(2)}`, tone: "bg-amber-100 text-amber-700" },
          { icon: <IndianRupee className="h-5 w-5" />, label: t("approvedExpenses", lang), value: `₹${s.approved.toFixed(2)}`, tone: "bg-green-100 text-green-700" },
          { icon: <Award className="h-5 w-5" />, label: t("incentive", lang), value: `₹${s.incentive.toFixed(2)}`, tone: "bg-purple-100 text-purple-700" },
        ].map((c, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-md ${c.tone}`}>{c.icon}</div>
            <div className="flex-1"><p className="text-xs text-muted-foreground">{c.label}</p><p className="text-xl font-bold">{c.value}</p></div>
          </Card>
        ))}
      </main>
    </div>
  );
}
