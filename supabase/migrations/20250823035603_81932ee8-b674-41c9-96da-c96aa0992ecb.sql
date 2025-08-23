-- Fix critical security vulnerability in baskets table
-- Remove the overly permissive policy that allows public access to all baskets
DROP POLICY IF EXISTS "baskets_all" ON public.baskets;

-- Create secure RLS policies for baskets table
-- Sellers can only access baskets for their own clients
CREATE POLICY "baskets_seller_access" 
ON public.baskets 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = baskets.client_id 
    AND c.seller_id = auth.uid()
  )
);

-- Allow sellers to create baskets for their own clients
CREATE POLICY "baskets_seller_insert" 
ON public.baskets 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = baskets.client_id 
    AND c.seller_id = auth.uid()
  )
);

-- Allow sellers to update baskets for their own clients
CREATE POLICY "baskets_seller_update" 
ON public.baskets 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = baskets.client_id 
    AND c.seller_id = auth.uid()
  )
);

-- Allow sellers to delete baskets for their own clients
CREATE POLICY "baskets_seller_delete" 
ON public.baskets 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = baskets.client_id 
    AND c.seller_id = auth.uid()
  )
);