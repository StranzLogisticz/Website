"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { Plus, Trash2, MapPin } from "lucide-react";

export default function SitesPage() {
  const { lang } = useAuth();
  const [sites, setSites] = useState<any[]>([]);
  const [name, setName] = useState(""); const [lat, setLat] = useState(""); const [lng, setLng] = useState(""); const [radius, setRadius] = useState("150"); const [address, setAddress] = useState(""); const [busy, setBusy] = useState(false);

  const load = async () => { const { data } = await supabase.from("work_sites").select("*").order("created_at", { ascending: false }); setSites(data ?? []); };
  useEffect(() => { load(); }, []);

  const useMyLocation = () => { navigator.geolocation.getCurrentPosition((p) => { setLat(p.coords.latitude.toFixed(6)); setLng(p.coords.longitude.toFixed(6)); }, () => toast.error(t("locationError", lang))); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.from("work_sites").insert({ name, latitude: Number(lat), longitude: Number(lng), radius_m: Math.max(20, Number(radius) || 150), address: address || null });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(t("saved", lang));
    setName(""); setLat(""); setLng(""); setRadius("150"); setAddress("");
    load();
  };

  const toggle = async (id: string, isActive: boolean) => { await supabase.from("work_sites").update({ is_active: !isActive }).eq("id", id); load(); };
  const remove = async (id: string) => { await supabase.from("work_sites").delete().eq("id", id); load(); };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card className="p-4">
        <h2 className="mb-3 text-sm font-semibold">{t("addSite", lang)}</h2>
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label>{t("workSite", lang)}</Label><Input required value={name} onChange={e => setName(e.target.value)} /></div>
          <div><Label>{t("latitude", lang)}</Label><Input required type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} /></div>
          <div><Label>{t("longitude", lang)}</Label><Input required type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} /></div>
          <div><Label>{t("radius", lang)}</Label><Input type="number" min="20" value={radius} onChange={e => setRadius(e.target.value)} /></div>
          <div className="flex items-end"><Button type="button" variant="outline" className="w-full" onClick={useMyLocation}><MapPin className="mr-2 h-4 w-4" />{t("useMyLocation", lang)}</Button></div>
          <div className="sm:col-span-2"><Label>{t("address", lang)}</Label><Input value={address} onChange={e => setAddress(e.target.value)} /></div>
          <div className="sm:col-span-2"><Button type="submit" className="w-full" disabled={busy}><Plus className="mr-2 h-4 w-4" />{t("addSite", lang)}</Button></div>
        </form>
      </Card>
      <div className="space-y-2">
        {sites.length === 0 ? <Card className="p-4 text-center text-sm text-muted-foreground">{t("none", lang)}</Card> : sites.map(s => (
          <Card key={s.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">{s.name}</p>
              <p className="text-xs text-muted-foreground">{Number(s.latitude).toFixed(4)}, {Number(s.longitude).toFixed(4)} · {s.radius_m}m</p>
              {s.address && <p className="text-xs text-muted-foreground truncate">{s.address}</p>}
            </div>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="outline" onClick={() => toggle(s.id, s.is_active)}>{s.is_active ? t("active", lang) : t("inactive", lang)}</Button>
              <Button size="icon" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
