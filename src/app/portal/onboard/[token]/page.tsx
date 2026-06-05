"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Invite {
  id: string;
  email: string | null;
  phone: string | null;
  role: string;
  status: string;
  expires_at: string;
}

export default function OnboardPage() {
  const params = useParams();
  const token = params?.token as string;
  const [invite, setInvite] = useState<Invite | null>(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("onboarding_invites").select("id,email,phone,role,status,expires_at")
        .eq("token", token).maybeSingle();
      if (error || !data) { setLoading(false); return; }
      setInvite(data as Invite);
      if (data.phone) setPhone(data.phone);
      setLoading(false);
    })();
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invite) return;
    setBusy(true);
    const payload = {
      full_name: fullName, phone, aadhaar, pan,
      bank: { account_holder: accountHolder || fullName, account_number: accountNumber, ifsc, bank_name: bankName },
    };
    const { error } = await supabase.from("onboarding_invites")
      .update({ status: "completed", phone: phone || invite.phone } as any).eq("id", invite.id);
    console.info("[onboarding submitted]", invite.id, payload);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setDone(true);
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  if (!invite) return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md p-6 text-center">
        <h1 className="mb-2 text-lg font-semibold">Invalid invite</h1>
        <p className="text-sm text-muted-foreground">This onboarding link is invalid or has expired.</p>
      </Card>
    </div>
  );

  if (invite.status === "completed" || done) return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="max-w-md p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-primary" />
        <h1 className="mb-2 text-lg font-semibold">Onboarding complete</h1>
        <p className="text-sm text-muted-foreground">Your details have been submitted. The HR team will reach out shortly.</p>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 p-4">
      <Card className="mx-auto max-w-xl p-4 sm:p-6">
        <h1 className="mb-1 text-xl font-semibold">Welcome aboard</h1>
        <p className="mb-4 text-sm text-muted-foreground">Complete your profile to get started ({invite.role}).</p>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Full Name *</Label><Input required value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div><Label>Email</Label><Input value={invite.email ?? ""} disabled /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><Label>Aadhaar Number</Label><Input value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} /></div>
            <div><Label>PAN</Label><Input value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} /></div>
          </div>
          <div className="border-t pt-4">
            <h2 className="mb-2 text-sm font-semibold">Bank Details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Account Holder</Label><Input value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} placeholder={fullName} /></div>
              <div><Label>Account Number</Label><Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} /></div>
              <div><Label>IFSC</Label><Input value={ifsc} onChange={(e) => setIfsc(e.target.value.toUpperCase())} /></div>
              <div><Label>Bank Name</Label><Input value={bankName} onChange={(e) => setBankName(e.target.value)} /></div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
