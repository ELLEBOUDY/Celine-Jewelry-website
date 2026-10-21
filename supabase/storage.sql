-- Celine Jewelry — Storage bucket for product images (run once in SQL Editor)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Only a signed-in admin may upload / edit / remove files.
-- The bucket itself is public, so visitors can still read the images.
drop policy if exists "Anon upload product images" on storage.objects;
drop policy if exists "Authenticated upload product images" on storage.objects;
create policy "Authenticated upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Anon update product images" on storage.objects;
drop policy if exists "Authenticated update product images" on storage.objects;
create policy "Authenticated update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

drop policy if exists "Anon delete product images" on storage.objects;
drop policy if exists "Authenticated delete product images" on storage.objects;
create policy "Authenticated delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
