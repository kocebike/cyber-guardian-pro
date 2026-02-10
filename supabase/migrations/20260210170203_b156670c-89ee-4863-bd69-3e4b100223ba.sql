
-- Create quiz_results table to store user quiz scores
CREATE TABLE public.quiz_results (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    module_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Users can view their own results
CREATE POLICY "Users can view own quiz results"
ON public.quiz_results
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert own quiz results"
ON public.quiz_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all quiz results
CREATE POLICY "Admins can view all quiz results"
ON public.quiz_results
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for fast lookups
CREATE INDEX idx_quiz_results_user_module ON public.quiz_results(user_id, module_id);
CREATE INDEX idx_quiz_results_module ON public.quiz_results(module_id);
