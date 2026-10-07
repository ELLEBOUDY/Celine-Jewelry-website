import { supabase } from './supabase.js';

export const PRODUCT_IMAGES_BUCKET = 'product-images';

const extOf = (name) => (name?.split('.').pop() || 'jpg').toLowerCase().slice(0, 5);

export const uploadProductImage = async (file, hint = 'product') => {
  const safeHint = String(hint || 'product').toLowerCase().replace(/[^a-z0-9-]+/g, '-').slice(0, 40) || 'product';
  const path = `${safeHint}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extOf(file.name)}`;
  const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
};

export const deleteProductImageByUrl = async (publicUrl) => {
  try {
    const marker = `/${PRODUCT_IMAGES_BUCKET}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return; // local /images/... or external URL — nothing to delete in storage
    const path = publicUrl.slice(idx + marker.length).split('?')[0];
    const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
    if (error) throw error;
  } catch (e) {
    console.warn('Storage delete skipped:', e?.message);
  }
};
