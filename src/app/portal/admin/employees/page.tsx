"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { t } from "@/lib/i18n";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import type { AppRole } from "@/contexts/AuthContext";

interface EmployeeRow {
  id: string; user_id: string; full_name: string; email: string | null;
  phone: string | null; vehicle_number: string | null; monthly_salary: number;
  is_active: boolean; role?: AppRole;
}

export default function EmployeesPage() {
  const { lang, role } = useAuth();
  const [rows, setRows] = useState<EmployeeRow[]>([]);
  const [editing, setEditing] = useState<EmployeeRow | null>(null);
  const isOwner = role === "owner";

  const load = async () => {
    const [{ data: emps }, { data: roles }] = await Promise.all([
      supabase.from("employees").select("id, user_id, full_name, email, phone, vehicle_number, monthly_salary, is_active").order("full_name"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const roleMap = new Map<string, AppRole>((roles ?? []).map((r) => [r.user_id, r.role as AppRole]));
    setRows(((emps ?? []) as EmployeeRow[]).map((e) => ({ ...e, role: roleMap.get(e.user_id) })));
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <h1 className="text-2xl font-bold">{t("employees", lang)}</h1>
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>{t("role", lang)}</TableHead>
              <TableHead>{t("phone", lang)}</TableHead>
              <TableHead>{t("vehicle", lang)}</TableHead>
              <TableHead className="text-right">{t("monthlySalary", lang)}</TableHead>
              <TableHead>{t("status", lang)}</TableHead>
              {isOwner && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.full_name}</TableCell>
                <TableCell>{r.role ? t(r.role, lang) : <span className="text-muted-foreground">—</span>}</TableCell>
                <TableCell>{r.phone || "—"}</TableCell>
                <TableCell>{r.vehicle_number || "—"}</TableCell>
                <TableCell className="text-right">₹{Number(r.monthly_salary).toFixed(0)}</TableCell>
                <TableCell><Badge variant={r.is_active ? "default" : "secondary"}>{r.is_active ? t("active", lang) : t("inactive", lang)}</Badge></TableCell>
                {isOwner && <TableCell><Button size="icon" variant="ghost" onClick={() => setEditing(r)}><Pencil className="h-4 w-4" /></Button></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {editing && <EditDialog row={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </div>
  );
}

function EditDialog({ row, onClose, onSaved }: { row: EmployeeRow; onClose: () => void; onSaved: () => void }) {
  const { lang } = useAuth();
  const [phone, setPhone] = useState(row.phone ?? "");
  const [vehicle, setVehicle] = useState(row.vehicle_number ?? "");
  const [salary, setSalary] = useState(String(row.monthly_salary));
  const [active, setActive] = useState(row.is_active);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from("employees").update({ phone: phone || null, vehicle_number: vehicle || null, monthly_salary: Number(salary) || 0, is_active: active }).eq("id", row.id);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("save", lang));
    onSaved();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>{row.full_name}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5"><Label>{t("phone", lang)}</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>{t("vehicle", lang)}</Label><Input value={vehicle} onChange={(e) => setVehicle(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>{t("monthlySalary", lang)}</Label><Input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} /></div>
          <div className="flex items-center justify-between rounded-md border p-3"><Label className="cursor-pointer">{t("active", lang)}</Label><Switch checked={active} onCheckedChange={setActive} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t("cancel", lang)}</Button>
          <Button onClick={save} disabled={busy}>{t("save", lang)}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
