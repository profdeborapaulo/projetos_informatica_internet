-- Criar tabela de despesas de transporte
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  type TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para expenses
CREATE POLICY "Usuários podem ver suas próprias despesas"
  ON public.expenses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias despesas"
  ON public.expenses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias despesas"
  ON public.expenses
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias despesas"
  ON public.expenses
  FOR DELETE
  USING (auth.uid() = user_id);

-- Criar índice para melhor performance
CREATE INDEX idx_expenses_user_id ON public.expenses(user_id);
CREATE INDEX idx_expenses_date ON public.expenses(date);

-- Criar tabela de configurações do usuário
CREATE TABLE public.user_settings (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  car_price_per_km NUMERIC(10, 2) DEFAULT 0.80,
  bus_price NUMERIC(10, 2) DEFAULT 4.80,
  train_price NUMERIC(10, 2) DEFAULT 5.40,
  uber_base_price NUMERIC(10, 2) DEFAULT 5.00,
  uber_price_per_km NUMERIC(10, 2) DEFAULT 2.50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_settings
CREATE POLICY "Usuários podem ver suas próprias configurações"
  ON public.user_settings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias configurações"
  ON public.user_settings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias configurações"
  ON public.user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at em user_settings
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();