"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { t } from "@/lib/i18n";
import { LayoutDashboard, Users, FileCheck, IndianRupee, LogOut, Loader2, CalendarDays, Wallet, MapPin, Clock, HandCoins, UserPlus, House } from "lucide-react";

function AppSidebar() {
  const { lang, role } = useAuth();
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const handleNav = () => { if (isMobile) setOpenMobile(false); };

  const showLeaveApprovals = role === "owner" || role === "ceo" || role === "accounts";
  const showLeaveBalances = role === "owner";
  const showAdvances = role === "owner" || role === "ceo" || role === "accounts";
  const showSites = role === "owner";
  const showInvites = role === "owner";

  const items = [
    { to: "/portal/admin", label: t("dashboard", lang), icon: LayoutDashboard, exact: true, show: true },
    { to: "/portal/admin/employees", label: t("employees", lang), icon: Users, exact: false, show: true },
    { to: "/portal/admin/attendance", label: t("attendance", lang), icon: Clock, exact: false, show: true },
    { to: "/portal/admin/approvals", label: t("approvals", lang), icon: FileCheck, exact: false, show: true },
    { to: "/portal/admin/advances", label: t("advances", lang), icon: HandCoins, exact: false, show: showAdvances },
    { to: "/portal/admin/leave-requests", label: t("leaveRequests", lang), icon: CalendarDays, exact: false, show: showLeaveApprovals },
    { to: "/portal/admin/leave-balances", label: t("leaveBalances", lang), icon: Wallet, exact: false, show: showLeaveBalances },
    { to: "/portal/admin/sites", label: t("sites", lang), icon: MapPin, exact: false, show: showSites },
    { to: "/portal/admin/invites", label: t("invites", lang), icon: UserPlus, exact: false, show: showInvites },
    { to: "/portal/admin/payroll", label: t("payroll", lang), icon: IndianRupee, exact: false, show: true },
  ] as const;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("dashboard", lang)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.filter((i) => i.show).map((item) => {
                const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.to} onClick={handleNav}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, lang, profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/portal/login");
    else if (!loading && role === "driver") router.push("/portal/driver");
    else if (!loading && role === "office") router.push("/portal/office");
  }, [user, role, loading, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  const handleSignOut = async () => { await signOut(); router.push("/portal/login"); };
  const roleLabel = role ? t(role as "owner" | "accounts" | "ceo" | "office", lang) : "";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Link href="/portal/admin">
                <Image src="/img/logo.png" alt="Stranz" width={100} height={28} className="h-7 w-auto object-contain" />
              </Link>
            </div>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-muted-foreground">
              <span className="sm:hidden">{(profile?.full_name ?? "").split(" ")[0]}</span>
              <span className="hidden sm:inline">{profile?.full_name} · {roleLabel}</span>
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <Link href="/" title="Back to Stranz website">
                <Button size="sm" variant="ghost" className="gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                  <House className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Website</span>
                </Button>
              </Link>
              <LanguageToggle />
              <Button size="sm" variant="outline" onClick={handleSignOut} className="px-2 sm:px-3">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t("signOut", lang)}</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-muted/20 p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
