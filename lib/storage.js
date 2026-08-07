import { supabase } from "./supabaseClient";

// Este objeto imita la API de `window.storage` que se usa en el componente
// original (get/set), pero guardando todo en una tabla de Supabase
// (`app_storage`) en vez del storage propio del entorno de Claude.
//
// Se ignora el segundo parámetro "shared" a propósito: todos los datos de
// esta app quedan compartidos entre todos los que entren con el link,
// que es justo lo que se pidió al migrar a Supabase.

export const storage = {
  async get(key) {
    try {
      const { data, error } = await supabase
        .from("app_storage")
        .select("value")
        .eq("key", key)
        .maybeSingle();

      if (error) {
        console.error("storage.get error:", key, error.message);
        return null;
      }
      if (!data) return null;
      return { key, value: data.value, shared: true };
    } catch (e) {
      console.error("storage.get exception:", key, e);
      return null;
    }
  },

  async set(key, value) {
    try {
      const { error } = await supabase
        .from("app_storage")
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

      if (error) {
        console.error("storage.set error:", key, error.message);
        return null;
      }
      return { key, value, shared: true };
    } catch (e) {
      console.error("storage.set exception:", key, e);
      return null;
    }
  },
};
