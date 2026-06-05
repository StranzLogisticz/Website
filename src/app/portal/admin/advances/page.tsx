"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/i18n";
import { notifyAdvanceDecision } from "@/lib/notify";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export default function AdminAdvances() {
  const { lang, role } = useAuth();
  const canDecide = role === "owner" || role === "ceo";
  const [rows, setRows] = useState<any[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const load = async () => {
    const { data } = await supabase.from("salary_advances").select("*, employees!inner(full_name, email)").order("created_at", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const decide = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("salary_advances").update({ status, decision_notes: notes[id] || null, approved_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    const row = rows.find(r => r.id === id);
    if (row) notifyAdvanceDecision({ employeeName: row.employees?.full_name ?? "Employee", principal: Number(row.principal), status, notes: notes[id] || null });
    toast.success(t("saved", lang));
    load();
  };

  const pending = rows.filter(r => r.status === "pending");
  const decided = rows.filter(r => r.status !== "pending");

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <section>
        <h2 className="mb-2 text-sm font-semibold">{t("pendingApprovals", lang)}</h2>
        {pending.length === 0 ? <Card className="p-4 text-center text-sm text-muted-foreground">{t("noPending", lang)}</Card> : (
          <div className="space-y-2">{pending.map(r => (
            <Card key={r.id} className="p-3 space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0"><p className="text-sm font-semibold truncate">{r.employees.full_name}</p><p className="text-xs text-muted-foreground">{t(r.kind === "loan" ? "loan" : "advance", lang)} · ₹{Number(r.principal).toFixed(0)} · {r.repayment_months}m</p>{r.reason && <p className="mt-1 text-xs">{r.reason}</p>}</div>
              </div>
              {canDecide && (<><Textarea rows={2} placeholder={t("notes", lang)} value={notes[r.id] || ""} onChange={e => setNotes({...notes, [r.id]: e.target.value})} /><div className="flex gap-2"><Button size="sm" className="flex-1" onClick={() => decide(r.id, "approved")}><Check className="mr-1 h-4 w-4" />{t("approve", lang)}</Button><Button size="sm" variant="destructive" className="flex-1" onClick={() => decide(r.id, "rejected")}><X className="mr-1 h-4 w-4" />{t("reject", lang)}</Button></div></>)}
            </Card>
          ))}</div>
        )}
      </section>
      <section>
        <h2 className="mb-2 text-sm font-semibold">{t("status", lang)}</h2>
        <div className="space-y-2">{decided.map(r => (
          <Card key={r.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
            <div className="min-w-0"><p className="text-sm font-semibold truncate">{r.employees.full_name}</p><p className="text-xs text-muted-foreground">₹{Number(r.principal).toFixed(0)} · {r.repayment_months}m</p></div>
            <span className="rounded bg-muted px-2 py-1 text-xs whitespace-nowrap">{t((r.status === "approved" ? "approved" : r.status === "rejected" ? "rejected" : r.status === "closed" ? "closed" : "pending") as any, lang)}</span>
          </Card>
        ))}</div>
      </section>
    </div>
  );
}
