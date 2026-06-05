"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";
import { ArrowLeft, Download } from "lucide-react";
import { downloadPayslip } from "@/lib/payslip";

export default function OfficeSummary() {
  const { profile, lang } = useAuth();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear()); const [month, setMonth] = useState(now.getMonth() + 1); const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!profile) return;
      const { data: pm } = await supabase.from("payroll_months").select("id").eq("year", year).eq("month", month).maybeSingle();
      if (!pm) { setItems([]); return; }
      const { data } = await supabase.from("payroll_items").select("*").eq("payroll_month_id", pm.id).eq("employee_id", profile.id);
      setItems(data ?? []);
    };
    load();
  }, [profile, year, month]);

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button asChild size="icon" variant="ghost"><Link href="/portal/office"><ArrowLeft className="h-5 w-5" /></Link></Button>
          <h1 className="text-base font-bold">{t("payslips", lang)}</h1>
        </div>
      </header>
      <main className="space-y-3 px-4 pt-4">
        <div className="flex flex-wrap items-end gap-2">
          <div><Label className="text-xs">{t("month", lang)}</Label><Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}><SelectTrigger className="w-24"><SelectValue /></SelectTrigger><SelectContent>{Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <SelectItem key={m} value={String(m)}>{m}</SelectItem>)}</SelectContent></Select></div>
          <div><Label className="text-xs">Year</Label><Select value={String(year)} onValueChange={(v) => setYear(Number(v))}><SelectTrigger className="w-24"><SelectValue /></SelectTrigger><SelectContent>{[now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1].map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent></Select></div>
        </div>
        {items.length === 0 ? <Card className="p-6 text-center text-sm text-muted-foreground">{t("noPending", lang)}</Card> : items.map((it) => (
          <Card key={it.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
            <div className="min-w-0"><p className="text-sm font-semibold">{t("netPay", lang)}: ₹{Number(it.net_pay).toLocaleString("en-IN")}</p><p className="text-xs text-muted-foreground">{t("baseSalary", lang)}: ₹{Number(it.base_salary).toLocaleString("en-IN")}</p></div>
            <Button size="sm" onClick={() => downloadPayslip({ employeeName: profile?.full_name || "Employee", employeeId: profile?.id, month, year, baseSalary: Number(it.base_salary), incentive: Number(it.incentive), reimbursements: Number(it.reimbursements), deductions: Number(it.deductions), advanceDeduction: Number(it.advance_deduction), unpaidAbsenceDays: Number(it.unpaid_absence_days), netPay: Number(it.net_pay) })}><Download className="mr-1 h-4 w-4" />{t("download", lang)}</Button>
          </Card>
        ))}
      </main>
    </div>
  );
}
