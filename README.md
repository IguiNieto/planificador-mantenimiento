# Planificador de Mantenimiento

App de Next.js lista para publicar en Vercel, con los datos guardados en Supabase
(compartidos entre todos los que entren al link).

## 1. Crear el proyecto en Supabase

1. Andá a https://supabase.com → creá una cuenta (podés entrar con GitHub) → **New project**.
2. Elegí un nombre, una contraseña de base de datos (guardala, no la vas a necesitar para esto pero por las dudas) y una región cercana.
3. Cuando el proyecto esté listo, andá a **SQL Editor** → **New query**.
4. Copiá y pegá todo el contenido del archivo `supabase/schema.sql` de este proyecto, y apretá **Run**. Esto crea la tabla `app_storage` donde vive toda la información de la app.
5. Andá a **Project Settings → API**. Ahí vas a ver:
   - **Project URL** → esto es tu `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → esto es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Subir el código a GitHub

Si nunca subiste un proyecto a GitHub, la forma más simple:

1. Entrá a https://github.com/new y creá un repositorio nuevo (puede ser privado), por ejemplo `planificador-mantenimiento`. No marques ninguna opción de inicializar con README.
2. En tu computadora, abrí una terminal dentro de esta carpeta del proyecto y corré:

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/planificador-mantenimiento.git
git push -u origin main
```

(Reemplazá `TU-USUARIO` por tu usuario de GitHub y el nombre del repo si lo pusiste distinto.)

## 3. Publicar en Vercel

1. Entrá a https://vercel.com y logueate con tu cuenta de GitHub.
2. **Add New → Project**, y elegí el repositorio `planificador-mantenimiento` que acabás de subir.
3. Vercel va a detectar solo que es un proyecto Next.js — no toques nada del build.
4. Antes de apretar **Deploy**, abrí la sección **Environment Variables** y cargá las dos que copiaste de Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL` → pegá tu Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → pegá tu anon public key
5. Apretá **Deploy**. En 1-2 minutos te da un link tipo `https://planificador-mantenimiento.vercel.app` — ese es el link que le podés pasar a todo tu equipo.

## Desarrollo local (opcional)

Si querés correrlo en tu computadora antes de subirlo:

```bash
npm install
cp .env.local.example .env.local
# completá .env.local con tus datos reales de Supabase
npm run dev
```

Y abrís http://localhost:3000

## Actualizar la app más adelante

Cualquier cambio que necesites (yo te puedo seguir ayudando con ajustes), simplemente:
```bash
git add .
git commit -m "Descripción del cambio"
git push
```
Vercel vuelve a publicar automáticamente cada vez que hacés push a `main`.

## Estructura del proyecto

- `components/PlanificadorMantenimiento.jsx` — toda la app (las 4 pestañas: Mantenimiento, Parada de Planta, Indicadores, Centrífugas y Tanques).
- `lib/storage.js` — reemplaza el guardado que usaba Claude por guardado real en Supabase, con la misma forma de uso (`storage.get` / `storage.set`), así que el resto del código no tuvo que cambiar.
- `lib/supabaseClient.js` — conexión a Supabase usando las variables de entorno.
- `supabase/schema.sql` — la tabla que hay que crear una sola vez en Supabase.
- `pages/index.js` — carga la app (sin renderizado en servidor, porque usa el navegador para todo).
