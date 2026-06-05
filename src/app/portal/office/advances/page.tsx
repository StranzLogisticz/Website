"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { ArrowLeft, Plus } from "lucide-react";

export default function OfficeAdvances() {
  const { profile, lang } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { if (!profile) return; supabase.from("salary_advances").select("*").eq("employee_id", profile.id).order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? [])); }, [profile]);
  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2"><Button asChild size="icon" variant="ghost"><Link href="/portal/office"><ArrowLeft className="h-5 w-5" /></Link></Button><h1 className="text-base font-bold">{t("advances", lang)}</h1></div>
          <Button asChild size="sm"><Link href="/portal/office/advances/new"><Plus className="mr-1 h-4 w-4" />{t("newAdvance", lang)}</Link></Button>
        </div>
      </header>
      <main className="mx-auto max-w-md space-y-2 px-4 pt-4">
        {rows.length === 0 ? <Card className="p-4 text-center text-sm text-muted-foreground">{t("none", lang)}</Card> : rows.map((r) => (
          <Card key={r.id} className="p-3">
            <div className="flex items-center justify-between gap-2"><div className="min-w-0"><p className="text-sm font-semibold">{t(r.kind === "loan" ? "loan" : "advance", lang)} · ₹{Number(r.principal).toFixed(0)}</p><p className="text-xs text-muted-foreground">{r.repayment_months} × {t("installment", lang)}</p></div><span className="rounded bg-muted px-2 py-1 text-xs whitespace-nowrap">{t((r.status === "approved" ? "approved" : r.status === "rejected" ? "rejected" : r.status === "closed" ? "closed" : "pending") as any, lang)}</span></div>
            {r.reason && <p className="mt-1 text-xs text-muted-foreground">{r.reason}</p>}
          </Card>
        ))}
      </main>
    </div>
  );
}
