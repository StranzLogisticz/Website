"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <Link href="/portal/login" className="inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back to Login
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Demo Setup</CardTitle>
            <CardDescription>
              To seed demo users, use the Supabase dashboard or the standalone HR app at{" "}
              <code className="rounded bg-muted px-1">c:\Apps\my_hr</code>. Default demo accounts:
              admin, co, staff, accounts, driver — password:{" "}
              <code className="rounded bg-muted px-1">Stranz@2026!</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/portal/login">Go to Login →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
