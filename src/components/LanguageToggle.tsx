"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function LanguageToggle() {
  const { lang, setLang } = useAuth();
  return (
    <div className="inline-flex rounded-md border bg-background p-0.5">
      <Button
        size="sm"
        variant={lang === "en" ? "default" : "ghost"}
        className="h-7 px-3 text-xs"
        onClick={() => setLang("en")}
      >
        EN
      </Button>
      <Button
        size="sm"
        variant={lang === "ta" ? "default" : "ghost"}
        className="h-7 px-3 text-xs"
        onClick={() => setLang("ta")}
      >
        தமிழ்
      </Button>
    </div>
  );
}
