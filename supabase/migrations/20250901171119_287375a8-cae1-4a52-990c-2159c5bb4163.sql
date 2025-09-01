-- Create a function to get email by username for login
CREATE OR REPLACE FUNCTION public.get_email_by_username(_username TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.email 
  FROM auth.users u
  INNER JOIN public.profiles p ON u.id = p.user_id
  WHERE p.username = _username;
$$;