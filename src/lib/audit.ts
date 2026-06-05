import { supabase } from "@/integrations/supabase/client";

export async function logAudit(
  action: string,
  entity_type: string,
  entity_id?: string | null,
  metadata?: Record<string, unknown>,
) {
  try {
    await supabase.rpc("log_audit_event", {
      _action: action,
      _entity_type: entity_type,
      _entity_id: entity_id ?? undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _metadata: (metadata ?? null) as any,
    });
  } catch {
    // best-effort, never block UX
  }
}
