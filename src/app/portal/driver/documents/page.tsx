"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { ArrowLeft, Upload } from "lucide-react";

const TYPES = ["aadhaar","pan","driving_licence","vehicle_rc","insurance","address_proof","bank_passbook","other"] as const;

export default function DriverDocs() {
  const { profile, lang } = useAuth();
  const [docs, setDocs] = useState<any[]>([]);
  const [type, setType] = useState<string>("aadhaar"); const [docNumber, setDocNumber] = useState(""); const [expiresOn, setExpiresOn] = useState(""); const [file, setFile] = useState<File | null>(null); const [busy, setBusy] = useState(false);

  const load = async () => { if (!profile) return; const { data } = await supabase.from("employee_documents").select("*").eq("employee_id", profile.id).order("created_at", { ascending: false }); setDocs(data ?? []); };
  useEffect(() => { load(); }, [profile]);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !file) return;
    setBusy(true);
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const path = `${userId}/${type}-${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("employee-documents").upload(path, file);
      if (upErr) throw upErr;
      const { error } = await supabase.from("employee_documents").insert({ employee_id: profile.id, doc_type: type as any, doc_number: docNumber || null, file_url: path, expires_on: expiresOn || null });
      if (error) throw error;
      toast.success(t("uploaded", lang));
      setFile(null); setDocNumber(""); setExpiresOn("");
      await load();
    } catch (e) { toast.error((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button asChild size="icon" variant="ghost"><Link href="/portal/driver"><ArrowLeft className="h-5 w-5" /></Link></Button>
          <h1 className="text-base font-bold">{t("documents", lang)}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-md space-y-3 px-4 pt-4">
        <Card className="p-4">
          <form onSubmit={upload} className="space-y-3">
            <div><Label>{t("category", lang)}</Label><Select value={type} onValueChange={setType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TYPES.map(x => <SelectItem key={x} value={x}>{t(("doc_" + x) as any, lang)}</SelectItem>)}</SelectContent></Select></div>
            <div><Label>{t("docNumber", lang)}</Label><Input value={docNumber} onChange={e => setDocNumber(e.target.value)} /></div>
            <div><Label>{t("expiresOn", lang)}</Label><Input type="date" value={expiresOn} onChange={e => setExpiresOn(e.target.value)} /></div>
            <div><Label>{t("uploadDocument", lang)}</Label><Input type="file" accept="image/*,application/pdf" required onChange={e => setFile(e.target.files?.[0] ?? null)} /></div>
            <Button type="submit" className="w-full" disabled={busy || !file}><Upload className="mr-2 h-4 w-4" />{t("submit", lang)}</Button>
          </form>
        </Card>
        <div className="space-y-2">{docs.map(d => (
          <Card key={d.id} className="p-3">
            <div className="flex items-center justify-between"><p className="text-sm font-semibold">{t(("doc_" + d.doc_type) as any, lang)}</p><span className="rounded bg-muted px-2 py-1 text-xs">{t((d.status === "verified" ? "verified" : d.status === "rejected" ? "rejected" : "pending") as any, lang)}</span></div>
            {d.doc_number && <p className="text-xs text-muted-foreground">{d.doc_number}</p>}
            {d.expires_on && <p className="text-xs text-muted-foreground">{t("expiresOn", lang)}: {d.expires_on}</p>}
          </Card>
        ))}</div>
      </main>
    </div>
  );
}
