CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Create profile
    INSERT INTO public.profiles (user_id, email)
    VALUES (NEW.id, NEW.email);
    
    -- Create default user role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    
    -- Check for @neg-goethe.org domain for auto-premium
    IF NEW.email LIKE '%@neg-goethe.org' THEN
        INSERT INTO public.user_subscriptions (user_id, status)
        VALUES (NEW.id, 'active');
    ELSE
        INSERT INTO public.user_subscriptions (user_id, status)
        VALUES (NEW.id, 'none');
    END IF;
    
    RETURN NEW;
END;
$$;