import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // No tiramos error en build time (Vercel corre build sin las env vars a veces),
  // pero sí avisamos claro en consola del navegador si faltan en runtime.
  if (typeof window !== "undefined") {
    console.error(
      "Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Configuralas en Vercel (Project Settings → Environment Variables) y en tu .env.local para desarrollo."
    );
  }
}

// DIAGNÓSTICO TEMPORAL: mostramos una sola vez, apenas carga, exactamente qué
// valores llegaron desde Vercel (entre corchetes, para detectar espacios o
// caracteres raros). Se saca en cuanto quede resuelto el problema de guardado.
if (typeof window !== "undefined" && !window.__diagMostrado) {
  window.__diagMostrado = true;
  window.alert(
    "[Diagnóstico env]\n" +
    "URL = [" + supabaseUrl + "]\n" +
    "URL length = " + (supabaseUrl ? supabaseUrl.length : 0) + "\n" +
    "KEY length = " + (supabaseAnonKey ? supabaseAnonKey.length : 0) + "\n" +
    "KEY starts with = [" + (supabaseAnonKey ? supabaseAnonKey.slice(0, 12) : "") + "]"
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
