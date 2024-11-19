import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase_url = process.env.NEXT_PUBLIC_PROJECT_URL || "";
const supabase_annon_key = process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY || "";

export const supabase = createClient(supabase_url!, supabase_annon_key!);
