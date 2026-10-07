import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../utils/supabase.js';
import { productsData as localProducts } from '../data/products.js';

const ProductsContext = createContext(null);

const dbToProduct = (row) => ({
  id: row.id,
  nameEn: row.name_en,
  nameAr: row.name_ar,
  category: row.category,
  categoryLabelEn: row.category_label_en,
  categoryLabelAr: row.category_label_ar,
  price: Number(row.price),
  originalPrice: row.original_price != null ? Number(row.original_price) : null,
  image: row.image,
  images: Array.isArray(row.images) && row.images.length > 0 ? row.images : [row.image],
  colors: row.colors || null,
  badge: row.badge || null,
  badgeAr: row.badge_ar || null,
  inStock: row.in_stock !== false,
  refCode: row.ref_code,
  descriptionEn: row.description_en,
  descriptionAr: row.description_ar,
});

const productToDb = (p) => ({
  id: p.id,
  name_en: p.nameEn,
  name_ar: p.nameAr,
  category: p.category,
  category_label_en: p.categoryLabelEn || null,
  category_label_ar: p.categoryLabelAr || null,
  price: p.price,
  original_price: p.originalPrice || null,
  image: p.image,
  images: p.images || (p.image ? [p.image] : []),
  colors: p.colors || null,
  badge: p.badge || null,
  badge_ar: p.badgeAr || null,
  in_stock: p.inStock !== false,
  ref_code: p.refCode || null,
  description_en: p.descriptionEn || null,
  description_ar: p.descriptionAr || null,
  updated_at: new Date().toISOString(),
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(localProducts);
  const [loading, setLoading] = useState(true);
  const [usingLocal, setUsingLocal] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: sbError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });
      if (sbError) throw sbError;
      if (data && data.length > 0) {
        setProducts(data.map(dbToProduct));
        setUsingLocal(false);
      } else {
        // Empty table — keep local fallback so the storefront still works
        setProducts(localProducts);
        setUsingLocal(true);
      }
    } catch (e) {
      console.warn('Supabase products fetch failed, using local data:', e?.message);
      setProducts(localProducts);
      setUsingLocal(true);
      setError(e?.message || 'fetch failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (product) => {
    const payload = productToDb(product);
    const { data, error: sbError } = await supabase.from('products').insert(payload).select().single();
    if (sbError) throw sbError;
    const mapped = dbToProduct(data);
    setProducts((prev) => [...prev, mapped]);
    setUsingLocal(false);
    return mapped;
  };

  const updateProduct = async (id, patch) => {
    const payload = productToDb({ ...products.find((p) => p.id === id), ...patch, id });
    delete payload.id; // don't try to update PK
    const { data, error: sbError } = await supabase.from('products').update(payload).eq('id', id).select().single();
    if (sbError) throw sbError;
    const mapped = dbToProduct(data);
    setProducts((prev) => prev.map((p) => (p.id === id ? mapped : p)));
    return mapped;
  };

  const deleteProduct = async (id) => {
    const { error: sbError } = await supabase.from('products').delete().eq('id', id);
    if (sbError) throw sbError;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, usingLocal, refresh: fetchProducts, createProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};
