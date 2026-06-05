"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/i18n";
import { ArrowLeft, CalendarPlus, Loader2 } from "lucide-react";
import type { LeaveTypeCode } from "@/components/LeaveForm";
import { toast } from "sonner";

interface LeaveRow { id: string; leave_type: LeaveTypeCode; from_date: string; to_date: string; is_half_day: boolean; total_days: number; reason: string | null; status: "pending" | "approved" | "rejected" | "cancelled"; decision_notes: string | null; }

export default function OfficeLeaveList() {
  const { profile, lang } = useAuth();
  const [requests, setRequests] = useState<LeaveRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!profile) return; setLoading(true);
    const { data } = await supabase.from("leave_requests").select("id, leave_type, from_date, to_date, is_half_day, total_days, reason, status, decision_notes").eq("employee_id", profile.id).order("created_at", { ascending: false });
    if (data) setRequests(data as LeaveRow[]); setLoading(false);
  };
  useEffect(() => { load(); }, [profile]);

  const cancel = async (id: string) => {
    const { error } = await supabase.from("leave_requests").update({ status: "cancelled" }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(t("cancelled", lang)); load();
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2"><Button asChild size="icon" variant="ghost"><Link href="/portal/office" aria-label={t("back", lang)}><ArrowLeft className="h-5 w-5" /></Link></Button><h1 className="text-base font-bold">{t("myLeaves", lang)}</h1></div>
          <Button asChild size="sm"><Link href="/portal/office/leave/new"><CalendarPlus className="mr-1 h-4 w-4" />{t("applyLeave", lang)}</Link></Button>
        </div>
      </header>
      <main className="mx-auto max-w-2xl space-y-4 px-4 pt-4">
        <section>
          <h2 className="mb-2 text-sm font-semibold">{t("leaveRequests", lang)}</h2>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : requests.length === 0 ? <Card className="p-4 text-center text-sm text-muted-foreground">{t("noLeaves", lang)}</Card> : (
            <div className="space-y-2">{requests.map((r) => (
              <Card key={r.id} className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div><p className="text-sm font-semibold">{t(`leave_${r.leave_type}` as const, lang)}</p><p className="text-xs text-muted-foreground">{new Date(r.from_date).toLocaleDateString()} → {new Date(r.to_date).toLocaleDateString()}{r.is_half_day && " · ½"}{" · "}{Number(r.total_days)} {t("days", lang)}</p></div>
                  <Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : r.status === "cancelled" ? "outline" : "secondary"}>{t(r.status, lang)}</Badge>
                </div>
                {r.reason && <p className="text-xs">{r.reason}</p>}
                {r.decision_notes && <p className="text-xs italic text-muted-foreground">"{r.decision_notes}"</p>}
                {r.status === "pending" && <Button size="sm" variant="outline" onClick={() => cancel(r.id)}>{t("cancelLeave", lang)}</Button>}
              </Card>
            ))}</div>
          )}
        </section>
      </main>
    </div>
  );
}
