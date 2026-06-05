"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n";
import { notifyLeaveDecision } from "@/lib/notify";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import type { LeaveTypeCode } from "@/components/LeaveForm";
import type { Lang } from "@/lib/i18n";

interface LeaveReq { id: string; employee_id: string; leave_type: LeaveTypeCode; from_date: string; to_date: string; is_half_day: boolean; total_days: number; reason: string | null; status: "pending" | "approved" | "rejected" | "cancelled"; decision_notes: string | null; employee_name?: string; }

export default function LeaveRequestsPage() {
  const { lang, role, user } = useAuth();
  const [pending, setPending] = useState<LeaveReq[]>([]);
  const [history, setHistory] = useState<LeaveReq[]>([]);
  const [loading, setLoading] = useState(true);
  const canDecide = role === "owner" || role === "ceo";

  const load = async () => {
    setLoading(true);
    const { data: leaves } = await supabase.from("leave_requests").select("id, employee_id, leave_type, from_date, to_date, is_half_day, total_days, reason, status, decision_notes").order("created_at", { ascending: false });
    const empIds = Array.from(new Set((leaves ?? []).map((l) => l.employee_id)));
    const { data: emps } = empIds.length ? await supabase.from("employees").select("id, full_name").in("id", empIds) : { data: [] };
    const nameMap = new Map((emps ?? []).map((e) => [e.id, e.full_name]));
    const enriched = ((leaves ?? []) as LeaveReq[]).map((l) => ({ ...l, employee_name: nameMap.get(l.employee_id) }));
    setPending(enriched.filter((l) => l.status === "pending"));
    setHistory(enriched.filter((l) => l.status !== "pending"));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const decide = async (req: LeaveReq, decision: "approved" | "rejected", notes: string) => {
    if (!user) return;
    const { error } = await supabase.from("leave_requests").update({ status: decision, decided_by: user.id, decided_at: new Date().toISOString(), decision_notes: notes || null }).eq("id", req.id);
    if (error) { toast.error(error.message); return; }
    notifyLeaveDecision({ employeeName: req.employee_name ?? "Employee", leaveType: req.leave_type.replace(/_/g, " "), fromDate: req.from_date, toDate: req.to_date, totalDays: req.total_days, decision, notes: notes || null });
    toast.success(t(decision, lang));
    load();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h1 className="text-2xl font-bold">{t("leaveApprovalQueue", lang)}</h1>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">{t("pending", lang)} ({pending.length})</TabsTrigger>
          <TabsTrigger value="history">{t("status", lang)}</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-3 pt-4">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : pending.length === 0 ? <Card className="p-6 text-center text-sm text-muted-foreground">{t("noPending", lang)}</Card> : pending.map((r) => <LeaveCard key={r.id} req={r} lang={lang} canDecide={canDecide} onApprove={(n) => decide(r, "approved", n)} onReject={(n) => decide(r, "rejected", n)} />)}
        </TabsContent>
        <TabsContent value="history" className="space-y-3 pt-4">
          {history.length === 0 ? <Card className="p-6 text-center text-sm text-muted-foreground">{t("noLeaves", lang)}</Card> : history.map((r) => <LeaveCard key={r.id} req={r} lang={lang} canDecide={false} onApprove={() => {}} onReject={() => {}} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LeaveCard({ req, lang, canDecide, onApprove, onReject }: { req: LeaveReq; lang: Lang; canDecide: boolean; onApprove: (n: string) => void; onReject: (n: string) => void }) {
  const [notes, setNotes] = useState("");
  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start justify-between">
        <div><p className="font-semibold">{req.employee_name ?? "—"}</p><p className="text-xs text-muted-foreground">{t(`leave_${req.leave_type}` as const, lang)} · {new Date(req.from_date).toLocaleDateString()} → {new Date(req.to_date).toLocaleDateString()}{req.is_half_day && " · ½"}</p></div>
        <div className="text-right"><p className="text-lg font-bold">{Number(req.total_days)} {t("days", lang)}</p><Badge variant={req.status === "approved" ? "default" : req.status === "rejected" ? "destructive" : req.status === "cancelled" ? "outline" : "secondary"}>{t(req.status, lang)}</Badge></div>
      </div>
      {req.reason && <p className="text-sm">{req.reason}</p>}
      {req.decision_notes && <p className="text-xs italic text-muted-foreground">{'"'}{req.decision_notes}{'"'}</p>}
      {canDecide && (<><Textarea placeholder={t("notes", lang)} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} /><div className="flex gap-2"><Button size="sm" className="flex-1" onClick={() => onApprove(notes)}><Check className="mr-1 h-4 w-4" />{t("approve", lang)}</Button><Button size="sm" variant="destructive" className="flex-1" onClick={() => onReject(notes)}><X className="mr-1 h-4 w-4" />{t("reject", lang)}</Button></div></>)}
    </Card>
  );
}
