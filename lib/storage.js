import { supabase } from "./supabaseClient";

const BUCKET_ARCHIVOS = "proveedores-archivos";

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

  // Sube un archivo al bucket de Supabase Storage (en vez de guardarlo
  // embebido en base64 dentro del registro), y devuelve su URL pública.
  async uploadFile(file) {
    try {
      const extension = (file.name.split(".").pop() || "bin").toLowerCase();
      const nombreUnico = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}.${extension}`;

      const { error } = await supabase.storage
        .from(BUCKET_ARCHIVOS)
        .upload(nombreUnico, file, { upsert: false, cacheControl: "3600" });

      if (error) {
        console.error("storage.uploadFile error:", error.message);
        return null;
      }

      const { data } = supabase.storage.from(BUCKET_ARCHIVOS).getPublicUrl(nombreUnico);
      return { url: data.publicUrl, path: nombreUnico };
    } catch (e) {
      console.error("storage.uploadFile exception:", e);
      return null;
    }
  },
};
