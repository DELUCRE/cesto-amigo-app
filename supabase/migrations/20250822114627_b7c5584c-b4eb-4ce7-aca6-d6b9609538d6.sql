-- ================================================
-- CRM VENDAS - SCHEMA COMPLETO (TRANSACIONAL)
-- Somente Admin pode criar Vendedores e Clientes.
-- Vendedores só podem criar Clientes.
-- ================================================

BEGIN;

-- ==================================================
-- 1. DROPS DE OBJETOS EXISTENTES
-- ==================================================
DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trg_profiles_set_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS trg_clients_set_updated_at ON public.clients;
DROP TRIGGER IF EXISTS trg_baskets_set_updated_at ON public.baskets;
DROP TRIGGER IF EXISTS trg_orders_set_updated_at ON public.orders;
DROP TRIGGER IF EXISTS trg_appointments_set_updated_at ON public.appointments;

DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;
DROP FUNCTION IF EXISTS public.set_updated_at CASCADE;
DROP FUNCTION IF EXISTS public.enforce_role_rules CASCADE;

DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.baskets CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ==================================================
-- 2. FUNÇÕES AUXILIARES
-- ==================================================
-- Atualiza automaticamente a coluna updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enforce rules: quem pode criar quem
CREATE OR REPLACE FUNCTION public.enforce_role_rules()
RETURNS TRIGGER AS $$
DECLARE
  actor_role TEXT;
BEGIN
  -- Pega o papel do usuário que está fazendo a ação
  SELECT role INTO actor_role FROM public.profiles WHERE user_id = auth.uid();

  -- Se não encontrou perfil, bloqueia
  IF actor_role IS NULL THEN
    RAISE EXCEPTION 'Ação não permitida: usuário sem perfil válido.';
  END IF;

  -- Regras:
  -- 1) Admin pode criar Vendedores e Clientes
  IF actor_role = 'admin' THEN
    RETURN NEW;
  END IF;

  -- 2) Vendedor pode criar somente Clientes
  IF actor_role = 'vendedor' AND NEW.role = 'cliente' THEN
    RETURN NEW;
  END IF;

  -- Bloqueia qualquer outra tentativa
  RAISE EXCEPTION 'Ação não permitida: % não pode criar %', actor_role, NEW.role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==================================================
-- 3. TABELAS PRINCIPAIS
-- ==================================================
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','vendedor','cliente')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.baskets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  basket_id UUID REFERENCES public.baskets(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  appointment_date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================
-- 4. TRIGGERS DE ATUALIZAÇÃO E REGRA DE PAPÉIS
-- ==================================================
-- updated_at automático
CREATE TRIGGER trg_profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_clients_set_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_baskets_set_updated_at
BEFORE UPDATE ON public.baskets
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_appointments_set_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Enforce rules (quem pode criar quem) na tabela profiles
CREATE TRIGGER trg_enforce_role_rules
BEFORE INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.enforce_role_rules();

-- ==================================================
-- 5. POLÍTICAS DE SEGURANÇA (RLS)
-- ==================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baskets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Perfis:
CREATE POLICY select_own_profile ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Admin pode ver todos
CREATE POLICY admin_all_profiles ON public.profiles
  FOR ALL USING ((SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin');

-- Clientes só podem acessar seus próprios dados
CREATE POLICY client_self ON public.clients
  FOR SELECT USING (seller_id = auth.uid());

-- Vendedores só podem acessar clientes deles
CREATE POLICY seller_clients ON public.clients
  FOR ALL USING (seller_id = auth.uid());

COMMIT;