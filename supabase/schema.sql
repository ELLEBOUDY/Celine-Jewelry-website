-- Celine Jewelry — Supabase schema (run in SQL Editor)
-- Tables: products, orders

-- ============ PRODUCTS ============
create table if not exists public.products (
  id text primary key,
  name_en text not null,
  name_ar text not null,
  category text not null check (category in ('rings','bracelets','necklaces','sets')),
  category_label_en text,
  category_label_ar text,
  price numeric not null default 0,
  original_price numeric,
  image text,
  images jsonb default '[]'::jsonb,
  colors jsonb,
  badge text,
  badge_ar text,
  in_stock boolean default true,
  ref_code text,
  description_en text,
  description_ar text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  to anon, authenticated
  using (true);

-- MVP: allow anon insert/update/delete so the admin dashboard works without auth.
-- Tighten later with Supabase Auth (admin-only) if needed.
drop policy if exists "Anon write products" on public.products;
create policy "Anon write products"
  on public.products for all
  to anon, authenticated
  using (true)
  with check (true);

-- ============ ORDERS ============
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  city text,
  address text,
  notes text,
  payment_method text default 'cod',
  items jsonb not null default '[]'::jsonb,
  subtotal numeric default 0,
  shipping numeric default 0,
  total numeric default 0,
  status text default 'new' check (status in ('new','confirmed','shipped','delivered','cancelled')),
  whatsapp_sent boolean default false,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

drop policy if exists "Anon read orders" on public.orders;
create policy "Anon read orders"
  on public.orders for select
  to anon, authenticated
  using (true);

drop policy if exists "Anon insert orders" on public.orders;
create policy "Anon insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anon update orders" on public.orders;
create policy "Anon update orders"
  on public.orders for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Anon delete orders" on public.orders;
create policy "Anon delete orders"
  on public.orders for delete
  to anon, authenticated
  using (true);
