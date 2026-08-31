// ============================================================
// CLEANING APP
// SUPABASE CONFIGURATION
// ============================================================

const SUPABASE_URL =
    "https://gcwtcuedbglbafjazelx.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_sA9UtGz4aUTlOlocv8LsUA_4CnhlICZ";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );