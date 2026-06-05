export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      absence_decisions: {
        Row: {
          absence_date: string
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision: Database["public"]["Enums"]["absence_decision"]
          employee_id: string
          id: string
          notes: string | null
          payroll_month_id: string
        }
        Insert: {
          absence_date: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision?: Database["public"]["Enums"]["absence_decision"]
          employee_id: string
          id?: string
          notes?: string | null
          payroll_month_id: string
        }
        Update: {
          absence_date?: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision?: Database["public"]["Enums"]["absence_decision"]
          employee_id?: string
          id?: string
          notes?: string | null
          payroll_month_id?: string
        }
        Relationships: []
      }
      advance_repayments: {
        Row: {
          advance_id: string
          amount: number
          created_at: string
          id: string
          notes: string | null
          payroll_month_id: string | null
          scheduled_for: string
          status: Database["public"]["Enums"]["repayment_status"]
        }
        Insert: {
          advance_id: string
          amount: number
          created_at?: string
          id?: string
          notes?: string | null
          payroll_month_id?: string | null
          scheduled_for: string
          status?: Database["public"]["Enums"]["repayment_status"]
        }
        Update: {
          advance_id?: string
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          payroll_month_id?: string | null
          scheduled_for?: string
          status?: Database["public"]["Enums"]["repayment_status"]
        }
        Relationships: []
      }
      attendance_logs: {
        Row: {
          accuracy_m: number | null
          created_at: string
          distance_m: number | null
          employee_id: string
          id: string
          latitude: number | null
          log_type: Database["public"]["Enums"]["attendance_type"]
          logged_at: string
          longitude: number | null
          regularisation_notes: string | null
          regularised_at: string | null
          regularised_by: string | null
          remarks: string | null
          selfie_url: string | null
          verification_status: Database["public"]["Enums"]["attendance_verification"] | null
          work_site_id: string | null
        }
        Insert: {
          accuracy_m?: number | null
          created_at?: string
          distance_m?: number | null
          employee_id: string
          id?: string
          latitude?: number | null
          log_type: Database["public"]["Enums"]["attendance_type"]
          logged_at?: string
          longitude?: number | null
          regularisation_notes?: string | null
          regularised_at?: string | null
          regularised_by?: string | null
          remarks?: string | null
          selfie_url?: string | null
          verification_status?: Database["public"]["Enums"]["attendance_verification"] | null
          work_site_id?: string | null
        }
        Update: {
          accuracy_m?: number | null
          created_at?: string
          distance_m?: number | null
          employee_id?: string
          id?: string
          latitude?: number | null
          log_type?: Database["public"]["Enums"]["attendance_type"]
          logged_at?: string
          longitude?: number | null
          regularisation_notes?: string | null
          regularised_at?: string | null
          regularised_by?: string | null
          remarks?: string | null
          selfie_url?: string | null
          verification_status?: Database["public"]["Enums"]["attendance_verification"] | null
          work_site_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_role: Database["public"]["Enums"]["app_role"] | null
          actor_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_role?: Database["public"]["Enums"]["app_role"] | null
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_role?: Database["public"]["Enums"]["app_role"] | null
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      employee_bank_details: {
        Row: {
          id: string
          employee_id: string
          account_holder: string | null
          account_number: string | null
          ifsc: string | null
          bank_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          account_holder?: string | null
          account_number?: string | null
          ifsc?: string | null
          bank_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          account_holder?: string | null
          account_number?: string | null
          ifsc?: string | null
          bank_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
      employee_documents: {
        Row: {
          created_at: string
          doc_number: string | null
          doc_type: Database["public"]["Enums"]["document_type"]
          employee_id: string
          expires_on: string | null
          file_url: string
          id: string
          issued_on: string | null
          notes: string | null
          status: Database["public"]["Enums"]["document_status"]
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          doc_number?: string | null
          doc_type: Database["public"]["Enums"]["document_type"]
          employee_id: string
          expires_on?: string | null
          file_url: string
          id?: string
          issued_on?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          doc_number?: string | null
          doc_type?: Database["public"]["Enums"]["document_type"]
          employee_id?: string
          expires_on?: string | null
          file_url?: string
          id?: string
          issued_on?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      company_holidays: {
        Row: {
          id: string
          date: string
          name: string
          is_recurring: boolean
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          name: string
          is_recurring?: boolean
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          name?: string
          is_recurring?: boolean
          created_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          full_name: string
          id: string
          is_active: boolean
          joined_on: string | null
          language_pref: Database["public"]["Enums"]["language_pref"]
          monthly_salary: number
          notes: string | null
          phone: string | null
          updated_at: string
          user_id: string
          vehicle_number: string | null
          bank_account_holder: string | null
          bank_account_number: string | null
          bank_ifsc: string | null
          bank_name: string | null
          photo_url: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          joined_on?: string | null
          language_pref?: Database["public"]["Enums"]["language_pref"]
          monthly_salary?: number
          notes?: string | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
          vehicle_number?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          joined_on?: string | null
          language_pref?: Database["public"]["Enums"]["language_pref"]
          monthly_salary?: number
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          vehicle_number?: string | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
        }
        Relationships: []
      }
      expense_approvals: {
        Row: {
          approver_role: Database["public"]["Enums"]["app_role"]
          approver_user_id: string
          decided_at: string
          decision: Database["public"]["Enums"]["expense_status"]
          expense_claim_id: string
          id: string
          notes: string | null
        }
        Insert: {
          approver_role: Database["public"]["Enums"]["app_role"]
          approver_user_id: string
          decided_at?: string
          decision: Database["public"]["Enums"]["expense_status"]
          expense_claim_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          approver_role?: Database["public"]["Enums"]["app_role"]
          approver_user_id?: string
          decided_at?: string
          decision?: Database["public"]["Enums"]["expense_status"]
          expense_claim_id?: string
          id?: string
          notes?: string | null
        }
        Relationships: []
      }
      expense_claims: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string
          description: string | null
          employee_id: string
          expense_date: string
          id: string
          is_business: boolean
          receipt_url: string | null
          status: Database["public"]["Enums"]["expense_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          description?: string | null
          employee_id: string
          expense_date?: string
          id?: string
          is_business?: boolean
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["expense_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string
          description?: string | null
          employee_id?: string
          expense_date?: string
          id?: string
          is_business?: boolean
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["expense_status"]
          updated_at?: string
        }
        Relationships: []
      }
      incentive_entries: {
        Row: {
          added_by: string | null
          amount: number
          created_at: string
          employee_id: string
          id: string
          payroll_month_id: string | null
          reason: string | null
        }
        Insert: {
          added_by?: string | null
          amount: number
          created_at?: string
          employee_id: string
          id?: string
          payroll_month_id?: string | null
          reason?: string | null
        }
        Update: {
          added_by?: string | null
          amount?: number
          created_at?: string
          employee_id?: string
          id?: string
          payroll_month_id?: string | null
          reason?: string | null
        }
        Relationships: []
      }
      leave_balances: {
        Row: {
          created_at: string
          employee_id: string
          entitled: number
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          updated_at: string
          used: number
          year: number
        }
        Insert: {
          created_at?: string
          employee_id: string
          entitled?: number
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          updated_at?: string
          used?: number
          year: number
        }
        Update: {
          created_at?: string
          employee_id?: string
          entitled?: number
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          updated_at?: string
          used?: number
          year?: number
        }
        Relationships: []
      }
      leave_requests: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_notes: string | null
          employee_id: string
          from_date: string
          id: string
          is_half_day: boolean
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string | null
          status: Database["public"]["Enums"]["leave_status"]
          to_date: string
          total_days: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_notes?: string | null
          employee_id: string
          from_date: string
          id?: string
          is_half_day?: boolean
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason?: string | null
          status?: Database["public"]["Enums"]["leave_status"]
          to_date: string
          total_days: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_notes?: string | null
          employee_id?: string
          from_date?: string
          id?: string
          is_half_day?: boolean
          leave_type?: Database["public"]["Enums"]["leave_type"]
          reason?: string | null
          status?: Database["public"]["Enums"]["leave_status"]
          to_date?: string
          total_days?: number
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_invites: {
        Row: {
          completed_employee_id: string | null
          created_at: string
          email: string | null
          expires_at: string
          id: string
          invited_by: string | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          status: Database["public"]["Enums"]["invite_status"]
          token: string
          submitted_data: Json | null
        }
        Insert: {
          completed_employee_id?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string
          id?: string
          invited_by?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["invite_status"]
          token: string
          submitted_data?: Json | null
        }
        Update: {
          completed_employee_id?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string
          id?: string
          invited_by?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["invite_status"]
          token?: string
          submitted_data?: Json | null
        }
        Relationships: []
      }
      payroll_items: {
        Row: {
          absence_days: number
          advance_deduction: number
          base_salary: number
          created_at: string
          deductions: number
          employee_id: string
          id: string
          incentive: number
          net_pay: number
          override_by: string | null
          override_notes: string | null
          payroll_month_id: string
          reimbursements: number
          unpaid_absence_days: number
          updated_at: string
        }
        Insert: {
          absence_days?: number
          advance_deduction?: number
          base_salary?: number
          created_at?: string
          deductions?: number
          employee_id: string
          id?: string
          incentive?: number
          net_pay?: number
          override_by?: string | null
          override_notes?: string | null
          payroll_month_id: string
          reimbursements?: number
          unpaid_absence_days?: number
          updated_at?: string
        }
        Update: {
          absence_days?: number
          advance_deduction?: number
          base_salary?: number
          created_at?: string
          deductions?: number
          employee_id?: string
          id?: string
          incentive?: number
          net_pay?: number
          override_by?: string | null
          override_notes?: string | null
          payroll_month_id?: string
          reimbursements?: number
          unpaid_absence_days?: number
          updated_at?: string
        }
        Relationships: []
      }
      payroll_months: {
        Row: {
          created_at: string
          finalized_at: string | null
          finalized_by: string | null
          id: string
          month: number
          notes: string | null
          status: Database["public"]["Enums"]["payroll_status"]
          year: number
        }
        Insert: {
          created_at?: string
          finalized_at?: string | null
          finalized_by?: string | null
          id?: string
          month: number
          notes?: string | null
          status?: Database["public"]["Enums"]["payroll_status"]
          year: number
        }
        Update: {
          created_at?: string
          finalized_at?: string | null
          finalized_by?: string | null
          id?: string
          month?: number
          notes?: string | null
          status?: Database["public"]["Enums"]["payroll_status"]
          year?: number
        }
        Relationships: []
      }
      salary_advances: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          decision_notes: string | null
          employee_id: string
          id: string
          kind: Database["public"]["Enums"]["advance_kind"]
          principal: number
          reason: string | null
          repayment_months: number
          status: Database["public"]["Enums"]["advance_status"]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          decision_notes?: string | null
          employee_id: string
          id?: string
          kind?: Database["public"]["Enums"]["advance_kind"]
          principal: number
          reason?: string | null
          repayment_months?: number
          status?: Database["public"]["Enums"]["advance_status"]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          decision_notes?: string | null
          employee_id?: string
          id?: string
          kind?: Database["public"]["Enums"]["advance_kind"]
          principal?: number
          reason?: string | null
          repayment_months?: number
          status?: Database["public"]["Enums"]["advance_status"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      work_sites: {
        Row: {
          address: string | null
          created_at: string
          id: string
          is_active: boolean
          latitude: number
          longitude: number
          name: string
          radius_m: number
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          latitude: number
          longitude: number
          name: string
          radius_m?: number
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          latitude?: number
          longitude?: number
          name?: string
          radius_m?: number
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      get_user_role: { Args: { _user_id: string }; Returns: Database["public"]["Enums"]["app_role"] }
      has_role: { Args: { _role: Database["public"]["Enums"]["app_role"]; _user_id: string }; Returns: boolean }
      log_audit_event: { Args: { _action: string; _entity_id?: string; _entity_type: string; _metadata?: Json }; Returns: string }
    }
    Enums: {
      absence_decision: "pending" | "approved_paid" | "rejected_unpaid"
      advance_kind: "advance" | "loan"
      advance_status: "pending" | "approved" | "rejected" | "closed"
      app_role: "owner" | "accounts" | "ceo" | "office" | "driver"
      attendance_type: "office_in" | "office_out" | "driver_in" | "driver_out" | "trip_start" | "trip_end"
      attendance_verification: "verified" | "outside_geofence" | "no_site" | "regularised" | "pending_review" | "approved_location"
      document_status: "pending" | "verified" | "rejected"
      document_type: "aadhaar" | "pan" | "driving_licence" | "vehicle_rc" | "insurance" | "address_proof" | "bank_passbook" | "other"
      expense_category: "fuel" | "toll" | "maintenance" | "food" | "lodging" | "other_business" | "personal"
      expense_status: "pending_accounts" | "pending_owner" | "approved" | "rejected" | "forwarded"
      invite_status: "pending" | "completed" | "expired"
      language_pref: "en" | "ta"
      leave_status: "pending" | "approved" | "rejected" | "cancelled"
      leave_type: "casual_leave" | "sick_leave" | "earned_leave" | "loss_of_pay" | "compensatory_off" | "maternity_leave" | "paternity_leave" | "bereavement_leave" | "optional_holiday"
      payroll_status: "draft" | "finalized" | "paid"
      repayment_status: "scheduled" | "deducted" | "waived" | "deferred"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<T extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][T]["Update"]
export type Enums<T extends keyof DefaultSchema["Enums"]> = DefaultSchema["Enums"][T]
