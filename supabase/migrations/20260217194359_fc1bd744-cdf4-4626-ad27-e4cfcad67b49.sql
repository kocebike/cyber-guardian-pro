
-- Table to store one-time diploma records
CREATE TABLE public.diplomas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text NOT NULL,
  cert_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.diplomas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diploma"
ON public.diplomas FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diploma"
ON public.diplomas FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all diplomas"
ON public.diplomas FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all diplomas"
ON public.diplomas FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));
