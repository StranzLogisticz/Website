"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SelfieCapture } from "@/components/SelfieCapture";
import { captureGPS, nearestSite, type Site } from "@/lib/geo";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { LogIn, LogOut, MapPin, Loader2, X, AlertCircle, Check } from "lucide-react";

interface Props {
  inLabel: string;
  outLabel: string;
  inType: "driver_in" | "office_in";
  outType: "driver_out" | "office_out";
}

type GpsState = { lat: number; lng: number; acc: number };

export function PunchPanel({ inLabel, outLabel, inType, outType }: Props) {
  const { profile, lang } = useAuth();
  const [pendingType, setPendingType] = useState<typeof inType | typeof outType | null>(null);
  const [busy, setBusy] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [gps, setGps] = useState<GpsState | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gettingGps, setGettingGps] = useState(false);

  useEffect(() => {
    supabase.from("work_sites").select("id, name, latitude, longitude, radius_m").eq("is_active", true)
      .then(({ data }) => { if (data) setSites(data as Site[]); });
  }, []);

  const requestGps = async () => {
    setGettingGps(true); setGpsError(null);
    try {
      const pos = await captureGPS();
      setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy });
    } catch (e) {
      setGpsError((e as Error).message || t("enableLocation", lang)); setGps(null);
    } finally { setGettingGps(false); }
  };

  const startPunch = async (type: typeof inType | typeof outType) => {
    setPendingType(type); setGps(null); setGpsError(null);
    await requestGps();
  };

  const cancel = () => { setPendingType(null); setGps(null); setGpsError(null); };

  const handleCapture = async (blob: Blob) => {
    if (!profile || !pendingType || !gps) return;
    setBusy(true);
    try {
      let work_site_id: string | null = null;
      let distance_m: number | null = null;
      let verification: "verified" | "pending_review" = "pending_review";
      if (sites.length > 0) {
        const n = nearestSite(gps.lat, gps.lng, sites);
        work_site_id = n.site?.id ?? null;
        distance_m = n.distance_m;
        if (n.inside) verification = "verified";
      }
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const path = `${userId}/${Date.now()}.jpg`;
      const { error: upErr } = await supabase.storage.from("attendance-selfies").upload(path, blob, { contentType: "image/jpeg" });
      if (upErr) throw upErr;
      const { error } = await supabase.from("attendance_logs").insert({
        employee_id: profile.id, log_type: pendingType, latitude: gps.lat, longitude: gps.lng,
        accuracy_m: gps.acc, selfie_url: path, work_site_id, distance_m, verification_status: verification,
      });
      if (error) throw error;
      toast.success(verification === "verified" ? t("attendanceMarked", lang) : t("submittedForApproval", lang));
      cancel();
    } catch (e) { toast.error((e as Error).message); } finally { setBusy(false); }
  };

  if (pendingType) {
    const label = pendingType === inType ? inLabel : outLabel;
    if (!gps) {
      return (
        <Card className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{label}</p>
            <Button size="icon" variant="ghost" onClick={cancel} disabled={gettingGps}><X className="h-4 w-4" /></Button>
          </div>
          {gettingGps ? (
            <div className="flex flex-col items-center gap-2 py-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{t("capturingLocation", lang)}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{t("locationRequired", lang)}</p>
                  <p className="text-xs text-muted-foreground">{gpsError || t("enableLocation", lang)}</p>
                </div>
              </div>
              <Button className="w-full" onClick={requestGps}><MapPin className="mr-2 h-4 w-4" />{t("retry", lang)}</Button>
            </div>
          )}
        </Card>
      );
    }
    const bbox = `${gps.lng - 0.003},${gps.lat - 0.002},${gps.lng + 0.003},${gps.lat + 0.002}`;
    const mapsUrl = `https://www.google.com/maps?q=${gps.lat},${gps.lng}`;
    const accColor = gps.acc <= 30 ? "text-green-700 bg-green-100" : gps.acc <= 100 ? "text-amber-700 bg-amber-100" : "text-red-700 bg-red-100";
    return (
      <Card className="space-y-3 overflow-hidden p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{label}</p>
          <Button size="icon" variant="ghost" onClick={cancel} disabled={busy}><X className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2">
            <Check className="h-4 w-4 text-green-700" />
            <p className="text-sm font-medium text-green-900">{t("locationCaptured", lang)}</p>
            <span className={`ml-auto rounded px-2 py-0.5 text-xs font-medium ${accColor}`}>±{Math.round(gps.acc)}m</span>
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-md border">
            <iframe title="location-preview" className="pointer-events-none h-32 w-full" loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${gps.lat},${gps.lng}`} />
            <div className="flex items-center justify-center gap-1 bg-muted/50 py-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />{t("tapMapToOpen", lang)}
            </div>
          </a>
        </div>
        <SelfieCapture onCapture={handleCapture} busy={busy} />
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button size="lg" className="h-24 bg-green-600 text-lg hover:bg-green-700" disabled={busy} onClick={() => startPunch(inType)}>
        <LogIn className="mr-2 !h-7 !w-7" /><span className="text-lg font-bold">{inLabel}</span>
      </Button>
      <Button size="lg" variant="destructive" className="h-24 text-lg" disabled={busy} onClick={() => startPunch(outType)}>
        <LogOut className="mr-2 !h-7 !w-7" /><span className="text-lg font-bold">{outLabel}</span>
      </Button>
    </div>
  );
}
