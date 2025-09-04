-- Update existing users without usernames to have auto-generated usernames
UPDATE public.profiles 
SET username = 'user_' || substr(user_id::text, 1, 8)
WHERE username IS NULL OR username = '';

-- Ensure all usernames are unique by adding a counter if needed
UPDATE public.profiles 
SET username = username || '_' || 
  (SELECT COUNT(*) FROM public.profiles p2 WHERE p2.username = public.profiles.username AND p2.user_id < public.profiles.user_id)
WHERE username IN (
  SELECT username 
  FROM public.profiles 
  GROUP BY username 
  HAVING COUNT(*) > 1
);

-- Make username column not nullable and unique for future integrity
ALTER TABLE public.profiles ALTER COLUMN username SET NOT NULL;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_unique UNIQUE (username);