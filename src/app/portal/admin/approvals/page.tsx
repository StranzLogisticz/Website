"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/i18n";
import { notifyExpenseDecision } from "@/lib/notify";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Status = "pending_accounts" | "pending_owner" | "approved" | "rejected" | "forwarded";
interface Claim { id: string; amount: number; category: string; expense_date: string; description: string | null; is_business: boolean; status: Status; employee_id: string; employee_name?: string; }

export default function ApprovalsPage() {
  const { lang, role, user } = useAuth();
  const [verifyList, setVerifyList] = useState<Claim[]>([]);
  const [finalList, setFinalList] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const canVerify = role === "accounts" || role === "owner";
  const canFinalApprove = role === "owner" || role === "ceo";

  const load = async () => {
    setLoading(true);
    const { data: claims } = await supabase.from("expense_claims").select("id, amount, category, expense_date, description, is_business, status, employee_id").in("status", ["pending_accounts", "pending_owner"]).order("created_at", { ascending: false });
    const empIds = Array.from(new Set((claims ?? []).map((c) => c.employee_id)));
    const { data: emps } = empIds.length ? await supabase.from("employees").select("id, full_name").in("id", empIds) : { data: [] };
    const nameMap = new Map((emps ?? []).map((e) => [e.id, e.full_name]));
    const enriched = ((claims ?? []) as Claim[]).map((c) => ({ ...c, employee_name: nameMap.get(c.employee_id) }));
    setVerifyList(enriched.filter((c) => c.status === "pending_accounts"));
    setFinalList(enriched.filter((c) => c.status === "pending_owner"));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const act = async (claim: Claim, decision: "verify" | "approve" | "reject", notes: string) => {
    if (!user || !role) return;
    const isVerifyStep = claim.status === "pending_accounts";
    const newStatus: Status = decision === "reject" ? "rejected" : isVerifyStep ? "pending_owner" : "approved";
    const approverDecision: Status = decision === "reject" ? "rejected" : isVerifyStep ? "forwarded" : "approved";
    const { error: e1 } = await supabase.from("expense_claims").update({ status: newStatus }).eq("id", claim.id);
    if (e1) { toast.error(e1.message); return; }
    const { error: e2 } = await supabase.from("expense_approvals").insert({ expense_claim_id: claim.id, approver_user_id: user.id, approver_role: role, decision: approverDecision, notes: notes || null });
    if (e2) { toast.error(e2.message); return; }
    notifyExpenseDecision({ employeeName: claim.employee_name ?? "Employee", amount: claim.amount, decision: approverDecision, step: approverDecision as "verified" | "forwarded" | "approved" | "rejected", approverRole: role ?? "", notes: notes || null });
    toast.success(t(decision === "reject" ? "reject" : decision === "approve" ? "approve" : "verify", lang));
    load();
  };

  const defaultTab = canFinalApprove && finalList.length > 0 ? "final" : "verify";
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h1 className="text-2xl font-bold">{t("approvals", lang)}</h1>
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="verify">{t("expenseVerifyQueue", lang)} ({verifyList.length})</TabsTrigger>
          <TabsTrigger value="final">{t("expenseFinalQueue", lang)} ({finalList.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="verify" className="space-y-3 pt-4">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : verifyList.length === 0 ? <Card className="p-6 text-center text-sm text-muted-foreground">{t("noPending", lang)}</Card> : verifyList.map((c) => <ClaimCard key={c.id} claim={c} lang={lang} canAct={canVerify} primaryLabel={t("verify", lang)} onPrimary={(n) => act(c, "verify", n)} onReject={(n) => act(c, "reject", n)} />)}
        </TabsContent>
        <TabsContent value="final" className="space-y-3 pt-4">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : finalList.length === 0 ? <Card className="p-6 text-center text-sm text-muted-foreground">{t("noPending", lang)}</Card> : finalList.map((c) => <ClaimCard key={c.id} claim={c} lang={lang} canAct={canFinalApprove} primaryLabel={t("approve", lang)} onPrimary={(n) => act(c, "approve", n)} onReject={(n) => act(c, "reject", n)} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ClaimCard({ claim, lang, canAct, primaryLabel, onPrimary, onReject }: { claim: Claim; lang: Lang; canAct: boolean; primaryLabel: string; onPrimary: (n: string) => void; onReject: (n: string) => void }) {
  const [notes, setNotes] = useState("");
  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start justify-between">
        <div><p className="font-semibold">{claim.employee_name ?? "—"}</p><p className="text-xs text-muted-foreground">{new Date(claim.expense_date).toLocaleDateString()} · {t(`cat_${claim.category}` as never, lang)}</p></div>
        <div className="text-right"><p className="text-lg font-bold">₹{Number(claim.amount).toFixed(2)}</p><Badge variant={claim.is_business ? "default" : "secondary"}>{claim.is_business ? t("isBusiness", lang) : t("cat_personal", lang)}</Badge></div>
      </div>
      {claim.description && <p className="text-sm">{claim.description}</p>}
      {canAct && (<><Textarea placeholder={t("notes", lang)} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} /><div className="flex gap-2"><Button size="sm" className="flex-1" onClick={() => onPrimary(notes)}><Check className="mr-1 h-4 w-4" />{primaryLabel}</Button><Button size="sm" variant="destructive" className="flex-1" onClick={() => onReject(notes)}><X className="mr-1 h-4 w-4" />{t("reject", lang)}</Button></div></>)}
    </Card>
  );
}
