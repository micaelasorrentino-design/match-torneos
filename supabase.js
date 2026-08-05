const SUPABASE_URL = "https://ivkwgmwxbjcabuyizohq.supabase.co";

const SUPABASE_KEY = "sb_publishable_iaI-H9b102a-GXHtYPGAGg_MTHC6fmT";

// Verificamos que la librería cargó
console.log("window.supabase:", window.supabase);

// Creamos el cliente y lo dejamos disponible globalmente
window.db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Cliente:", window.db);