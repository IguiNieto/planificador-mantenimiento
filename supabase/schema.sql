-- Ejecutar esto una sola vez en Supabase: Project → SQL Editor → New query → pegar y Run

create table if not exists app_storage (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Habilitamos Row Level Security y dejamos una política abierta de
-- lectura/escritura, ya que la app no tiene login: cualquiera que entre
-- con el link comparte los mismos datos (igual que se pidió).
alter table app_storage enable row level security;

drop policy if exists "app_storage_select_all" on app_storage;
create policy "app_storage_select_all"
  on app_storage for select
  using (true);

drop policy if exists "app_storage_insert_all" on app_storage;
create policy "app_storage_insert_all"
  on app_storage for insert
  with check (true);

drop policy if exists "app_storage_update_all" on app_storage;
create policy "app_storage_update_all"
  on app_storage for update
  using (true)
  with check (true);
