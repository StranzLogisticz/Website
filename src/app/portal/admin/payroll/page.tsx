"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { Download, Loader2, Save } from "lucide-react";
import { downloadPayslip } from "@/lib/payslip";

interface Row { id: string; employee_id: string; base_salary: number; incentive: number; reimbursements: number; deductions: number; advance_deduction: number; unpaid_absence_days: number; net_pay: number; employee?: { full_name: string | null; email: string | null }; }

export default function PayrollPage() {
  const { lang, role } = useAuth();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const canEdit = role === "owner" || role === "ceo" || role === "accounts";

  const load = async () => {
    setLoading(true);
    const { data: pm } = await supabase.from("payroll_months").select("id").eq("year", year).eq("month", month).maybeSingle();
    if (!pm) { setRows([]); setLoading(false); return; }
    const { data } = await supabase.from("payroll_items").select("*, employee:employees!payroll_items_employee_id_fkey(full_name,email)").eq("payroll_month_id", pm.id);
    setRows((data as any) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [year, month]);

  const ensureMonth = async () => {
    const { data: existing } = await supabase.from("payroll_months").select("id").eq("year", year).eq("month", month).maybeSingle();
    if (existing) return existing.id;
    const { data, error } = await supabase.from("payroll_months").insert({ year, month }).select("id").single();
    if (error) { toast.error(error.message); return null; }
    return data.id;
  };

  const generate = async () => {
    setLoading(true);
    const pmId = await ensureMonth();
    if (!pmId) { setLoading(false); return; }
    const { data: emps } = await supabase.from("employees").select("id,monthly_salary").eq("is_active", true);
    if (emps?.length) {
      const inserts = emps.map((e: any) => ({ payroll_month_id: pmId, employee_id: e.id, base_salary: e.monthly_salary ?? 0, net_pay: e.monthly_salary ?? 0 }));
      await supabase.from("payroll_items").upsert(inserts as any, { onConflict: "payroll_month_id,employee_id", ignoreDuplicates: true } as any);
    }
    await load();
  };

  const update = (id: string, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => { if (r.id !== id) return r; const m = { ...r, ...patch }; m.net_pay = (m.base_salary || 0) + (m.incentive || 0) + (m.reimbursements || 0) - (m.deductions || 0) - (m.advance_deduction || 0); return m; }));
  };

  const save = async (row: Row) => {
    setBusy(row.id);
    const { error } = await supabase.from("payroll_items").update({ base_salary: row.base_salary, incentive: row.incentive, reimbursements: row.reimbursements, deductions: row.deductions, advance_deduction: row.advance_deduction, unpaid_absence_days: row.unpaid_absence_days, net_pay: row.net_pay }).eq("id", row.id);
    setBusy(null);
    if (error) toast.error(error.message); else toast.success(t("saved", lang));
  };

  const years = useMemo(() => { const cy = now.getFullYear(); return [cy - 1, cy, cy + 1]; }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <div><Label className="text-xs">{t("month", lang)}</Label><Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent>{Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <SelectItem key={m} value={String(m)}>{m}</SelectItem>)}</SelectContent></Select></div>
        <div><Label className="text-xs">Year</Label><Select value={String(year)} onValueChange={(v) => setYear(Number(v))}><SelectTrigger className="w-28"><SelectValue /></SelectTrigger><SelectContent>{years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent></Select></div>
        {canEdit && <Button onClick={generate} variant="outline" disabled={loading}>Generate / Refresh</Button>}
      </div>
      {loading ? <div className="flex items-center justify-center p-12"><Loader2 className="h-6 w-6 animate-spin" /></div> : rows.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">No payroll items for {month}/{year}. {canEdit && "Click Generate to create them."}</Card>
      ) : (
        <div className="space-y-3">{rows.map((r) => (
          <Card key={r.id} className="p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0"><div className="truncate font-semibold">{r.employee?.full_name || r.employee?.email || r.employee_id.slice(0, 8)}</div><div className="text-xs text-muted-foreground">{t("netPay", lang)}: ₹{r.net_pay.toLocaleString("en-IN")}</div></div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => downloadPayslip({ employeeName: r.employee?.full_name || r.employee?.email || "Employee", employeeId: r.employee_id, month, year, baseSalary: r.base_salary, incentive: r.incentive, reimbursements: r.reimbursements, deductions: r.deductions, advanceDeduction: r.advance_deduction, unpaidAbsenceDays: r.unpaid_absence_days, netPay: r.net_pay })}><Download className="mr-1 h-4 w-4" /> {t("payslips", lang)}</Button>
                {canEdit && <Button size="sm" onClick={() => save(r)} disabled={busy === r.id}><Save className="mr-1 h-4 w-4" /> {t("save", lang)}</Button>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: t("baseSalary", lang), key: "base_salary" as const }, { label: t("incentive", lang), key: "incentive" as const },
                { label: t("reimbursements", lang), key: "reimbursements" as const }, { label: t("deductions", lang), key: "deductions" as const },
                { label: t("advanceDeduction", lang), key: "advance_deduction" as const }, { label: "LOP days", key: "unpaid_absence_days" as const },
              ].map(f => (
                <div key={f.key} className="min-w-0"><Label className="text-xs">{f.label}</Label><Input type="number" step="0.01" value={(r as any)[f.key]} onChange={(e) => update(r.id, { [f.key]: Number(e.target.value) || 0 } as any)} disabled={!canEdit} className="h-9" /></div>
              ))}
            </div>
          </Card>
        ))}</div>
      )}
    </div>
  );
}
