-- Create address aliases table for location shortcuts
CREATE TABLE public.address_aliases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.address_aliases ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Usuários podem ver seus próprios aliases"
ON public.address_aliases
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios aliases"
ON public.address_aliases
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios aliases"
ON public.address_aliases
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios aliases"
ON public.address_aliases
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_address_aliases_user_id ON public.address_aliases(user_id);