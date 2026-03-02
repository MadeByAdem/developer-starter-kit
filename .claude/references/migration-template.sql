-- ============================================================================
-- Migration: Short title
-- Description: What and why
-- ============================================================================

SET search_path = '';

-- Helper function for auto-updating updated_at timestamps.
-- Only created once — safe to run multiple times thanks to IF NOT EXISTS.
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS public.my_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Ownership (uncomment if this table belongs to authenticated users)
    -- user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Business columns
    name TEXT NOT NULL,

    -- Timestamps (always include)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.my_table IS 'Description — Cleanup: [soft delete / TTL / hard delete after X days]';

-- RLS (always enable)
ALTER TABLE public.my_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_access" ON public.my_table
    FOR ALL TO service_role
    USING (true) WITH CHECK (true);

-- Uncomment and adapt if users should only access their own rows:
-- CREATE POLICY "users_own_data" ON public.my_table
--     FOR ALL TO authenticated
--     USING (user_id = auth.uid())
--     WITH CHECK (user_id = auth.uid());

-- Auto-update trigger for updated_at
CREATE TRIGGER trg_my_table_updated_at
    BEFORE UPDATE ON public.my_table
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
