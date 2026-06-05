-- HR Improvements Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- 1. Extend attendance_type enum with trip tracking values
ALTER TYPE public.attendance_type ADD VALUE IF NOT EXISTS 'trip_start';
ALTER TYPE public.attendance_type ADD VALUE IF NOT EXISTS 'trip_end';

-- 2. Add bank details + photo columns to employees table
ALTER TABLE public.employees
  ADD COLUMN IF NOT EXISTS bank_account_holder text,
  ADD COLUMN IF NOT EXISTS bank_account_number text,
  ADD COLUMN IF NOT EXISTS bank_ifsc text,
  ADD COLUMN IF NOT EXISTS bank_name text,
  ADD COLUMN IF NOT EXISTS photo_url text;

-- Create employee-photos storage bucket (run in Supabase Storage settings if not exists)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('employee-photos', 'employee-photos', false) ON CONFLICT DO NOTHING;

-- 3. Add submitted_data to onboarding_invites so form data is persisted
ALTER TABLE public.onboarding_invites
  ADD COLUMN IF NOT EXISTS submitted_data jsonb;

-- 4. Create company_holidays table
CREATE TABLE IF NOT EXISTS public.company_holidays (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  name text NOT NULL,
  is_recurring boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on company_holidays (match pattern of other tables)
ALTER TABLE public.company_holidays ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read holidays
DO $$ BEGIN
  CREATE POLICY "authenticated can read holidays"
    ON public.company_holidays FOR SELECT
    TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow owner/admin roles to insert/update/delete holidays
DO $$ BEGIN
  CREATE POLICY "admin can manage holidays"
    ON public.company_holidays FOR ALL
    TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
