"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { logAudit } from "@/lib/audit";
import { MapPin, Check, X, ExternalLink, ImageIcon, Copy, AlertTriangle } from "lucide-react";

type Filter = "review" | "verified" | "rejected" | "all";
const PENDING = ["pending_review", "outside_geofence", "no_site"];
const VERIFIED = ["verified", "approved_location", "regularised"];

export default function AdminAttendance() {
  const { lang, role } = useAuth();
  const canDecide = role === "owner" || role === "ceo";
  const [rows, setRows] = useState<any[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selfieUrls, setSelfieUrls] = useState<Record<string, string>>({});
  const [day, setDay] = useState(() => new Date().toISOString().slice(0, 10));
  const [filter, setFilter] = useState<Filter>("review");

  const load = async () => {
    const start = new Date(day); start.setHours(0, 0, 0, 0);
    const end = new Date(day); end.setHours(23, 59, 59, 999);
    const { data } = await supabase.from("attendance_logs").select("*, employees!inner(full_name)").gte("logged_at", start.toISOString()).lte("logged_at", end.toISOString()).order("logged_at", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, [day]);

  const counts = useMemo(() => ({
    review: rows.filter(r => PENDING.includes(r.verification_status ?? "pending_review")).length,
    verified: rows.filter(r => VERIFIED.includes(r.verification_status)).length,
    rejected: rows.filter(r => r.verification_status === "outside_geofence" && r.regularised_at).length,
  }), [rows]);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    if (filter === "review") return rows.filter(r => PENDING.includes(r.verification_status ?? "pending_review"));
    if (filter === "verified") return rows.filter(r => VERIFIED.includes(r.verification_status));
    return rows.filter(r => r.verification_status === "outside_geofence" && r.regularised_at);
  }, [rows, filter]);

  const loadSelfie = async (id: string, path: string | null) => {
    if (!path || selfieUrls[id]) return;
    const { data } = await supabase.storage.from("attendance-selfies").createSignedUrl(path, 300);
    if (data?.signedUrl) setSelfieUrls(prev => ({ ...prev, [id]: data.signedUrl }));
  };

  const decide = async (id: string, approve: boolean) => {
    const note = notes[id]?.trim() || null;
    if (!approve && !note) return toast.error(t("notes", lang));
    const { error } = await supabase.from("attendance_logs").update({ verification_status: approve ? "approved_location" : "outside_geofence", regularisation_notes: note, regularised_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    await logAudit(approve ? "attendance.approve_location" : "attendance.reject_location", "attendance_logs", id, { note });
    toast.success(t("saved", lang));
    load();
  };

  const copyCoords = (lat: number, lng: number) => { navigator.clipboard.writeText(`${lat},${lng}`); toast.success(t("copied", lang)); };

  const statusBadge = (s: string | null) => {
    const tone = s === "verified" || s === "approved_location" ? "bg-green-100 text-green-700" : s === "regularised" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700";
    const label = s === "approved_location" ? t("approvedLocation", lang) : s === "pending_review" || s === "no_site" || !s ? t("pendingReview", lang) : s === "outside_geofence" ? t("outsideGeofence", lang) : s === "verified" ? t("verified", lang) : s === "regularised" ? t("regularisation", lang) : s;
    return <span className={`rounded px-2 py-1 text-xs whitespace-nowrap ${tone}`}>{label}</span>;
  };

  const accuracyChip = (acc: number | null) => {
    if (acc == null) return null;
    const tone = acc <= 30 ? "bg-green-100 text-green-700" : acc <= 100 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
    return <span className={`rounded px-2 py-0.5 text-xs font-medium ${tone}`}>±{Math.round(acc)}m</span>;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <Card className="flex flex-wrap items-center gap-2 p-3">
        <label className="text-sm font-medium">{t("date", lang)}</label>
        <input type="date" value={day} onChange={e => setDay(e.target.value)} className="flex-1 min-w-[140px] rounded-md border bg-background px-3 py-1 text-sm" />
      </Card>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="review" className="gap-1">{t("needsReview", lang)}{counts.review > 0 && <span className="rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">{counts.review}</span>}</TabsTrigger>
          <TabsTrigger value="verified">{t("verified", lang)}</TabsTrigger>
          <TabsTrigger value="rejected">{t("rejected", lang)}</TabsTrigger>
          <TabsTrigger value="all">{t("all", lang)}</TabsTrigger>
        </TabsList>
      </Tabs>
      {filtered.length === 0 ? (
        <Card className="p-4 text-center text-sm text-muted-foreground">{t("none", lang)}</Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(r => {
            const status = r.verification_status ?? "pending_review";
            const isPending = PENDING.includes(status);
            const hasGps = r.latitude != null && r.longitude != null;
            const mapsUrl = hasGps ? `https://www.google.com/maps?q=${r.latitude},${r.longitude}` : null;
            return (
              <Card key={r.id} className="space-y-3 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{r.employees.full_name}</p>
                    <p className="text-xs text-muted-foreground">{r.log_type} · {new Date(r.logged_at).toLocaleTimeString()}{r.distance_m != null && ` · ${Math.round(r.distance_m)}m from site`}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">{accuracyChip(r.accuracy_m)}{statusBadge(status)}</div>
                </div>
                {hasGps ? (
                  <>
                    <a href={mapsUrl!} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md border shadow-sm transition hover:shadow-md">
                      <iframe title={`map-${r.id}`} className="pointer-events-none h-44 w-full" loading="lazy"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(r.longitude)-0.003},${Number(r.latitude)-0.002},${Number(r.longitude)+0.003},${Number(r.latitude)+0.002}&layer=mapnik&marker=${r.latitude},${r.longitude}`} />
                      <div className="flex items-center justify-center gap-1 bg-muted/40 py-1.5 text-xs font-medium text-muted-foreground"><MapPin className="h-3 w-3" /> {t("tapMapToOpen", lang)}</div>
                    </a>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild className="flex-1 bg-green-600 hover:bg-green-700"><a href={mapsUrl!} target="_blank" rel="noopener noreferrer"><MapPin className="mr-1 h-4 w-4" />{t("openInMaps", lang)}<ExternalLink className="ml-1 h-3 w-3" /></a></Button>
                      <Button size="icon" variant="outline" onClick={() => copyCoords(r.latitude, r.longitude)} title={t("copyCoords", lang)}><Copy className="h-4 w-4" /></Button>
                      {r.selfie_url && <Button size="icon" variant="outline" onClick={() => loadSelfie(r.id, r.selfie_url)} title={t("selfie", lang)}><ImageIcon className="h-4 w-4" /></Button>}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"><AlertTriangle className="h-4 w-4" />{t("noLocationCaptured", lang)}</div>
                )}
                {selfieUrls[r.id] && <img src={selfieUrls[r.id]} alt="selfie" className="max-h-48 w-full rounded-md object-cover" />}
                {canDecide && isPending && (
                  <div className="space-y-2">
                    <Textarea rows={2} placeholder={t("notes", lang)} value={notes[r.id] || ""} onChange={e => setNotes({...notes, [r.id]: e.target.value})} />
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => decide(r.id, true)}><Check className="mr-1 h-4 w-4" />{t("approveLocation", lang)}</Button>
                      <Button size="sm" variant="destructive" className="flex-1" onClick={() => decide(r.id, false)}><X className="mr-1 h-4 w-4" />{t("reject", lang)}</Button>
                    </div>
                  </div>
                )}
                {r.regularisation_notes && <p className="border-l-2 border-muted pl-2 text-xs text-muted-foreground">{r.regularisation_notes}</p>}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
