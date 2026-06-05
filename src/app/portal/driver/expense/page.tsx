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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { t } from "@/lib/i18n";
import { notifyExpenseSubmitted } from "@/lib/notify";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

type Category = "fuel" | "toll" | "maintenance" | "food" | "lodging" | "other_business" | "personal";
const CATEGORIES: Category[] = ["fuel", "toll", "maintenance", "food", "lodging", "other_business", "personal"];

export default function ExpensePage() {
  const { profile, user, lang } = useAuth();
  const router = useRouter();
  const [amount, setAmount] = useState(""); const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10)); const [category, setCategory] = useState<Category>("fuel"); const [description, setDescription] = useState(""); const [isBusiness, setIsBusiness] = useState(true); const [receipt, setReceipt] = useState<File | null>(null); const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;
    const amt = Number(amount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    setBusy(true);
    try {
      let receiptUrl: string | null = null;
      if (receipt) {
        const ext = receipt.name.split(".").pop() || "jpg";
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("receipts").upload(path, receipt, { upsert: false });
        if (upErr) throw upErr;
        receiptUrl = path;
      }
      const { error } = await supabase.from("expense_claims").insert({ employee_id: profile.id, amount: amt, expense_date: expenseDate, category, description: description || null, is_business: isBusiness && category !== "personal", receipt_url: receiptUrl });
      if (error) throw error;
      notifyExpenseSubmitted({ employeeName: profile.full_name, amount: amt, category, date: expenseDate });
      toast.success(t("expenseSubmitted", lang));
      router.push("/portal/driver");
    } catch (err) { toast.error((err as Error).message); } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button asChild size="icon" variant="ghost"><Link href="/portal/driver" aria-label={t("back", lang)}><ArrowLeft className="h-5 w-5" /></Link></Button>
          <h1 className="text-base font-bold">{t("addExpense", lang)}</h1>
        </div>
      </header>
      <main className="px-4 pt-4">
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5"><Label htmlFor="amount">{t("amount", lang)}</Label><Input id="amount" type="number" inputMode="decimal" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} required /></div>
            <div className="space-y-1.5"><Label htmlFor="date">{t("expenseDate", lang)}</Label><Input id="date" type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>{t("category", lang)}</Label><Select value={category} onValueChange={(v) => setCategory(v as Category)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{t(`cat_${c}` as const, lang)}</SelectItem>)}</SelectContent></Select></div>
            <div className="flex items-center justify-between rounded-md border p-3"><Label htmlFor="business" className="cursor-pointer">{t("isBusiness", lang)}</Label><Switch id="business" checked={isBusiness} onCheckedChange={setIsBusiness} disabled={category === "personal"} /></div>
            <div className="space-y-1.5"><Label htmlFor="desc">{t("description", lang)}</Label><Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></div>
            <div className="space-y-1.5"><Label htmlFor="receipt">{t("receipt", lang)}</Label><Input id="receipt" type="file" accept="image/*" onChange={(e) => setReceipt(e.target.files?.[0] ?? null)} /></div>
            <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{t("submit", lang)}</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
