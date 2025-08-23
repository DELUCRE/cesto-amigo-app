-- Fix critical security vulnerability in orders table
-- Remove the overly permissive policy that allows public access
DROP POLICY IF EXISTS "orders_all" ON public.orders;

-- Create secure RLS policies for orders table
-- Sellers can only access orders for their own clients' baskets
CREATE POLICY "orders_seller_access" 
ON public.orders 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.baskets b
    JOIN public.clients c ON b.client_id = c.id
    WHERE b.id = orders.basket_id 
    AND c.seller_id = auth.uid()
  )
);

-- Allow sellers to create orders for their own clients' baskets
CREATE POLICY "orders_seller_insert" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.baskets b
    JOIN public.clients c ON b.client_id = c.id
    WHERE b.id = orders.basket_id 
    AND c.seller_id = auth.uid()
  )
);

-- Allow sellers to update orders for their own clients' baskets
CREATE POLICY "orders_seller_update" 
ON public.orders 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.baskets b
    JOIN public.clients c ON b.client_id = c.id
    WHERE b.id = orders.basket_id 
    AND c.seller_id = auth.uid()
  )
);

-- Allow sellers to delete orders for their own clients' baskets
CREATE POLICY "orders_seller_delete" 
ON public.orders 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.baskets b
    JOIN public.clients c ON b.client_id = c.id
    WHERE b.id = orders.basket_id 
    AND c.seller_id = auth.uid()
  )
);