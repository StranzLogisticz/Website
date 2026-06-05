"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { notifyLeaveSubmitted } from "@/lib/notify";
import { toast } from "sonner";
import { Loader2, Info } from "lucide-react";

export type LeaveTypeCode =
  | "casual_leave" | "sick_leave" | "earned_leave" | "loss_of_pay"
  | "compensatory_off" | "maternity_leave" | "paternity_leave"
  | "bereavement_leave" | "optional_holiday";

export const LEAVE_TYPES: LeaveTypeCode[] = [
  "casual_leave", "sick_leave", "earned_leave", "optional_holiday",
  "loss_of_pay", "compensatory_off", "bereavement_leave", "paternity_leave", "maternity_leave",
];

function calcDays(from: string, to: string, halfDay: boolean): number {
  if (!from || !to) return 0;
  if (halfDay) return 0.5;
  const start = new Date(from);
  const end = new Date(to);
  if (end < start) return 0;
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export function LeaveForm({ redirectTo }: { redirectTo: "/portal/driver" | "/portal/office" | "/portal/admin" }) {
  const { profile, lang } = useAuth();
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [leaveType, setLeaveType] = useState<LeaveTypeCode>("casual_leave");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const totalDays = useMemo(() => calcDays(fromDate, toDate, isHalfDay), [fromDate, toDate, isHalfDay]);

  const handleHalfDay = (v: boolean) => { setIsHalfDay(v); if (v) setToDate(fromDate); };
  const handleFromChange = (v: string) => {
    setFromDate(v);
    if (isHalfDay) setToDate(v);
    if (new Date(v) > new Date(toDate)) setToDate(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) { toast.error("Session error — please sign out and sign in again"); return; }
    if (totalDays <= 0) { toast.error("Please select valid dates"); return; }
    setBusy(true);
    try {
      const { error } = await supabase.from("leave_requests").insert({
        employee_id: profile.id, leave_type: leaveType, from_date: fromDate,
        to_date: toDate, is_half_day: isHalfDay, total_days: totalDays, reason: reason || null,
      });
      if (error) throw error;
      notifyLeaveSubmitted({ employeeName: profile.full_name, leaveType: leaveType.replace(/_/g, " "), fromDate, toDate, totalDays, reason });
      toast.success(t("leaveSubmitted", lang));
      router.push(redirectTo);
    } catch (err) { toast.error((err as Error).message); } finally { setBusy(false); }
  };

  return (
    <Card className="p-4">
      <div className="mb-4 flex gap-2 rounded-md border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p>{t("leaveHolidayNote", lang)}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>{t("leaveType", lang)}</Label>
          <Select value={leaveType} onValueChange={(v) => setLeaveType(v as LeaveTypeCode)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LEAVE_TYPES.map((lt) => <SelectItem key={lt} value={lt}>{t(`leave_${lt}` as const, lang)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between rounded-md border p-3">
          <Label htmlFor="halfday" className="cursor-pointer">{t("halfDay", lang)}</Label>
          <Switch id="halfday" checked={isHalfDay} onCheckedChange={handleHalfDay} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="from">{t("fromDate", lang)}</Label>
            <Input id="from" type="date" value={fromDate} onChange={(e) => handleFromChange(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="to">{t("toDate", lang)}</Label>
            <Input id="to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} disabled={isHalfDay} required />
          </div>
        </div>
        <div className="rounded-md bg-muted px-3 py-2 text-sm">
          {t("totalDays", lang)}: <span className="font-semibold">{totalDays}</span> {t("days", lang)}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reason">{t("reason", lang)}</Label>
          <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={busy || totalDays <= 0}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("submit", lang)}
        </Button>
      </form>
    </Card>
  );
}
