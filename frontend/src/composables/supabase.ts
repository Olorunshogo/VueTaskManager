
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase.types';

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

// const supabaseUrl = 'https://fsbozeqazenktzddbhji.supabase.co' // Replace with your Supabase project URL
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYm96ZXFhemVua3R6ZGRiaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTgyOTUsImV4cCI6MjA2NTI5NDI5NX0.KA6T-OWUPTzWdoi6ifcchxY_vCynA-UMJN5ljhPUmJQ' // Replace with your Supabase API key
// export const supabase = createClient(supabaseUrl, supabaseKey);
