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

-- Admin-only writes: only a signed-in user (authenticated) can change the catalog.
-- The public storefront (anon) is read-only for products.
drop policy if exists "Anon write products" on public.products;
drop policy if exists "Authenticated write products" on public.products;
create policy "Authenticated write products"
  on public.products for all
  to authenticated
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

-- Orders hold customer names, phone numbers and addresses: only a signed-in
-- admin may read them. Customers (anon) may only create their own order.
drop policy if exists "Anon read orders" on public.orders;
drop policy if exists "Authenticated read orders" on public.orders;
create policy "Authenticated read orders"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "Anon insert orders" on public.orders;
create policy "Anon insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anon update orders" on public.orders;
drop policy if exists "Authenticated update orders" on public.orders;
create policy "Authenticated update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Anon delete orders" on public.orders;
drop policy if exists "Authenticated delete orders" on public.orders;
create policy "Authenticated delete orders"
  on public.orders for delete
  to authenticated
  using (true);

-- ============ DATA API GRANTS ============
-- From 2026-10-30 Supabase no longer auto-grants Data API access to tables
-- created in the `public` schema. Tables that already exist keep their grants,
-- but any table created or re-created after that date needs explicit grants,
-- otherwise supabase-js / PostgREST / GraphQL return "permission denied".
--
-- These statements are idempotent — safe to re-run this whole file anytime.

-- Public storefront (anon): read-only for products.
revoke insert, update, delete on public.products from anon;
grant select on public.products to anon;

-- Public storefront (anon): customers may create their own order at checkout,
-- but must NOT be able to read the table (it holds names, phones, addresses).
revoke select, update, delete on public.orders from anon;
grant insert on public.orders to anon;

-- Signed-in admins (authenticated) and the server-side role (service_role).
grant select, insert, update, delete on public.products to authenticated, service_role;
grant select, insert, update, delete on public.orders   to authenticated, service_role;
