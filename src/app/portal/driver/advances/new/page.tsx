"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { notifyAdvanceSubmitted } from "@/lib/notify";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function NewAdvance() {
  const { profile, lang } = useAuth();
  const router = useRouter();
  const [kind, setKind] = useState<"advance" | "loan">("advance"); const [principal, setPrincipal] = useState(""); const [months, setMonths] = useState("1"); const [reason, setReason] = useState(""); const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setBusy(true);
    const { error } = await supabase.from("salary_advances").insert({ employee_id: profile.id, kind, principal: Number(principal), repayment_months: Math.max(1, Number(months)), reason: reason || null });
    setBusy(false);
    if (error) return toast.error(error.message);
    notifyAdvanceSubmitted({ employeeName: profile.full_name, kind, principal: Number(principal), repaymentMonths: Math.max(1, Number(months)), reason });
    toast.success(t("advanceSubmitted", lang));
    router.push("/portal/driver/advances");
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button asChild size="icon" variant="ghost"><Link href="/portal/driver/advances"><ArrowLeft className="h-5 w-5" /></Link></Button>
          <h1 className="text-base font-bold">{t("newAdvance", lang)}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 pt-4">
        <Card className="p-4">
          <form onSubmit={submit} className="space-y-3">
            <div><Label>{t("category", lang)}</Label><Select value={kind} onValueChange={(v) => setKind(v as any)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="advance">{t("advance", lang)}</SelectItem><SelectItem value="loan">{t("loan", lang)}</SelectItem></SelectContent></Select></div>
            <div><Label>{t("principal", lang)}</Label><Input type="number" min="1" step="1" required value={principal} onChange={(e) => setPrincipal(e.target.value)} /></div>
            <div><Label>{t("repaymentMonths", lang)}</Label><Input type="number" min="1" max="12" required value={months} onChange={(e) => setMonths(e.target.value)} /></div>
            <div><Label>{t("reason", lang)}</Label><Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} /></div>
            <Button type="submit" className="w-full" disabled={busy}>{t("submit", lang)}</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
