"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { Copy, ExternalLink, Plus } from "lucide-react";
import { logAudit } from "@/lib/audit";

export default function InvitesPage() {
  const { lang } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [email, setEmail] = useState(""); const [phone, setPhone] = useState(""); const [role, setRole] = useState<"driver" | "office">("driver"); const [busy, setBusy] = useState(false); const [tab, setTab] = useState<"pending" | "completed" | "all">("pending");

  const load = async () => { const { data } = await supabase.from("onboarding_invites").select("*").order("created_at", { ascending: false }); setRows(data ?? []); };
  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const token = crypto.randomUUID().replace(/-/g, "");
    const { data, error } = await supabase.from("onboarding_invites").insert({ email: email || null, phone: phone || null, role: role as any, token }).select("id").single();
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(t("saved", lang));
    if (data?.id) logAudit("invite.created", "onboarding_invites", data.id, { role, email, phone });
    setEmail(""); setPhone("");
    load();
  };

  const copy = (token: string) => { const url = `${window.location.origin}/portal/onboard/${token}`; navigator.clipboard.writeText(url); toast.success(t("copied", lang)); };

  const filtered = useMemo(() => { if (tab === "all") return rows; return rows.filter((r) => (tab === "pending" ? r.status === "pending" : r.status === "completed")); }, [rows, tab]);

  const badgeFor = (r: any) => {
    const expired = new Date(r.expires_at).getTime() < Date.now();
    if (r.status === "completed") return <Badge className="bg-green-600">{t("approved", lang)}</Badge>;
    if (expired) return <Badge variant="destructive">{t("expires", lang)}</Badge>;
    return <Badge variant="secondary">{t("pending", lang)}</Badge>;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card className="p-4">
        <h2 className="mb-3 text-sm font-semibold">{t("inviteEmployee", lang)}</h2>
        <form onSubmit={create} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div><Label>{t("email", lang)}</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label>{t("phone", lang)}</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="sm:col-span-2"><Label>{t("role", lang)}</Label><Select value={role} onValueChange={(v) => setRole(v as any)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="driver">{t("driver", lang)}</SelectItem><SelectItem value="office">{t("office", lang)}</SelectItem></SelectContent></Select></div>
          <div className="sm:col-span-2"><Button type="submit" className="w-full" disabled={busy}><Plus className="mr-2 h-4 w-4" />{t("inviteEmployee", lang)}</Button></div>
        </form>
      </Card>
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="w-full"><TabsTrigger value="pending" className="flex-1">{t("pending", lang)}</TabsTrigger><TabsTrigger value="completed" className="flex-1">{t("approved", lang)}</TabsTrigger><TabsTrigger value="all" className="flex-1">All</TabsTrigger></TabsList>
      </Tabs>
      <div className="space-y-2">
        {filtered.length === 0 && <Card className="p-6 text-center text-sm text-muted-foreground">{t("noPending", lang)}</Card>}
        {filtered.map((r) => (
          <Card key={r.id} className="space-y-2 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{r.email || r.phone || "—"} · {t(r.role as any, lang)}</p><p className="text-xs text-muted-foreground">{t("expires", lang)}: {new Date(r.expires_at).toLocaleDateString()}</p></div>
              {badgeFor(r)}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => copy(r.token)} className="flex-1 sm:flex-none"><Copy className="mr-1 h-4 w-4" />{t("copyLink", lang)}</Button>
              <Button size="sm" variant="ghost" asChild className="flex-1 sm:flex-none"><a href={`/portal/onboard/${r.token}`} target="_blank" rel="noreferrer"><ExternalLink className="mr-1 h-4 w-4" />{t("view", lang)}</a></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
