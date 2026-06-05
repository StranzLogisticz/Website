"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { LEAVE_TYPES, type LeaveTypeCode } from "@/components/LeaveForm";

interface Employee { id: string; full_name: string; }
interface Balance { id?: string; employee_id: string; leave_type: LeaveTypeCode; entitled: number; used: number; }

export default function LeaveBalancesPage() {
  const { lang, role } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const year = new Date().getFullYear();
  const canEdit = role === "owner";

  const load = async () => {
    setLoading(true);
    const [e, b] = await Promise.all([
      supabase.from("employees").select("id, full_name").eq("is_active", true).order("full_name"),
      supabase.from("leave_balances").select("id, employee_id, leave_type, entitled, used").eq("year", year),
    ]);
    if (e.data) setEmployees(e.data as Employee[]);
    if (b.data) setBalances(b.data as Balance[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const balanceFor = (empId: string, lt: LeaveTypeCode) => balances.find((x) => x.employee_id === empId && x.leave_type === lt);

  const saveEntitled = async (empId: string, lt: LeaveTypeCode) => {
    const key = `${empId}_${lt}`;
    const v = Number(editing[key]);
    if (Number.isNaN(v) || v < 0) { toast.error("Invalid value"); return; }
    const existing = balanceFor(empId, lt);
    if (existing?.id) {
      const { error } = await supabase.from("leave_balances").update({ entitled: v }).eq("id", existing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("leave_balances").insert({ employee_id: empId, year, leave_type: lt, entitled: v, used: 0 });
      if (error) { toast.error(error.message); return; }
    }
    toast.success(t("save", lang));
    setEditing((prev) => { const n = { ...prev }; delete n[key]; return n; });
    load();
  };

  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <h1 className="text-2xl font-bold">{t("leaveBalances", lang)} ({year})</h1>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="sticky left-0 bg-muted/50 px-3 py-2 text-left">Employee</th>
              {LEAVE_TYPES.filter((lt) => lt !== "loss_of_pay").map((lt) => (
                <th key={lt} className="px-3 py-2 text-left text-xs">{t(`leave_${lt}` as const, lang)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="sticky left-0 bg-background px-3 py-2 font-medium">{emp.full_name}</td>
                {LEAVE_TYPES.filter((lt) => lt !== "loss_of_pay").map((lt) => {
                  const b = balanceFor(emp.id, lt);
                  const key = `${emp.id}_${lt}`;
                  const entitled = Number(b?.entitled ?? 0);
                  const used = Number(b?.used ?? 0);
                  return (
                    <td key={lt} className="px-3 py-2">
                      {canEdit ? (
                        <div className="flex items-center gap-1">
                          <Input type="number" step="0.5" min="0" className="h-8 w-20" value={editing[key] ?? entitled} onChange={(e) => setEditing((p) => ({ ...p, [key]: e.target.value }))} />
                          {editing[key] !== undefined && <Button size="sm" className="h-8 px-2" onClick={() => saveEntitled(emp.id, lt)}>✓</Button>}
                          <span className="text-[10px] text-muted-foreground">/{used}</span>
                        </div>
                      ) : (
                        <span>{entitled - used} <span className="text-[10px] text-muted-foreground">({used}/{entitled})</span></span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-muted-foreground">{t("entitled", lang)} / {t("used", lang)}</p>
    </div>
  );
}
