"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LeaveForm } from "@/components/LeaveForm";
import { t } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";

export default function DriverLeaveNew() {
  const { lang } = useAuth();
  return (
    <div className="min-h-screen bg-muted/20 pb-8">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          <Button asChild size="icon" variant="ghost"><Link href="/portal/driver" aria-label={t("back", lang)}><ArrowLeft className="h-5 w-5" /></Link></Button>
          <h1 className="text-base font-bold">{t("applyLeave", lang)}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-xl px-4 pt-4"><LeaveForm redirectTo="/portal/driver" /></main>
    </div>
  );
}
