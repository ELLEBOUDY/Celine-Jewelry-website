import React, { useEffect, useMemo, useState } from 'react';
import { useProducts } from '../context/ProductsContext.jsx';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../utils/orders.js';
import { uploadProductImage, deleteProductImageByUrl } from '../utils/storage.js';
import { useCart } from '../context/CartContext.jsx';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'celine-admin-2026';
const CATEGORIES = ['rings', 'bracelets', 'necklaces', 'sets'];

const emptyForm = {
  id: '',
  nameEn: '',
  nameAr: '',
  category: 'rings',
  categoryLabelEn: '',
  categoryLabelAr: '',
  price: '',
  originalPrice: '',
  image: '',
  images: '',
  badge: '',
  badgeAr: '',
  inStock: true,
  refCode: '',
  descriptionEn: '',
  descriptionAr: '',
};

const toForm = (p) => ({
  id: p.id || '',
  nameEn: p.nameEn || '',
  nameAr: p.nameAr || '',
  category: p.category || 'rings',
  categoryLabelEn: p.categoryLabelEn || '',
  categoryLabelAr: p.categoryLabelAr || '',
  price: p.price ?? '',
  originalPrice: p.originalPrice ?? '',
  image: p.image || '',
  images: Array.isArray(p.images) ? p.images.join(', ') : (p.image || ''),
  badge: p.badge || '',
  badgeAr: p.badgeAr || '',
  inStock: p.inStock !== false,
  refCode: p.refCode || '',
  descriptionEn: p.descriptionEn || '',
  descriptionAr: p.descriptionAr || '',
});

const fromForm = (f) => ({
  id: f.id.trim().toLowerCase().replace(/\s+/g, '-'),
  nameEn: f.nameEn.trim(),
  nameAr: f.nameAr.trim(),
  category: f.category,
  categoryLabelEn: f.categoryLabelEn.trim(),
  categoryLabelAr: f.categoryLabelAr.trim(),
  price: Number(f.price) || 0,
  originalPrice: f.originalPrice === '' ? null : Number(f.originalPrice),
  image: f.image.trim() || (f.images.split(',').map(s => s.trim()).filter(Boolean)[0] || ''),
  images: f.images.split(',').map(s => s.trim()).filter(Boolean),
  badge: f.badge.trim() || null,
  badgeAr: f.badgeAr.trim() || null,
  inStock: !!f.inStock,
  refCode: f.refCode.trim(),
  descriptionEn: f.descriptionEn.trim(),
  descriptionAr: f.descriptionAr.trim(),
});

export const AdminDashboard = () => {
  const { setCurrentView } = useCart();
  const { products, loading: productsLoading, createProduct, updateProduct, deleteProduct, refresh, usingLocal } = useProducts();

  const [authed, setAuthed] = useState(() => localStorage.getItem('celine_admin_authed') === '1');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('products'); // products | orders | add
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [search, setSearch] = useState('');

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const imageList = useMemo(
    () => (form.images || '').split(',').map((s) => s.trim()).filter(Boolean),
    [form.images]
  );

  const setImageList = (list) => {
    const clean = list.map((s) => s.trim()).filter(Boolean);
    setForm((f) => ({
      ...f,
      images: clean.join(', '),
      image: clean[0] || f.image,
    }));
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setUploadError('');
    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadProductImage(file, form.id || form.refCode || 'product');
        urls.push(url);
      }
      setImageList([...imageList, ...urls]);
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Did you run supabase/storage.sql?');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = async (url) => {
    setImageList(imageList.filter((u) => u !== url));
    setForm((f) => ({ ...f, image: f.image === url ? (imageList.filter((u) => u !== url)[0] || '') : f.image }));
    await deleteProductImageByUrl(url);
  };

  const handleSetMain = (url) => {
    setForm((f) => ({ ...f, image: url }));
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (e) {
      setOrdersError(e.message || 'Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (authed) loadOrders();
  }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('celine_admin_authed', '1');
      setAuthed(true);
      setPassword('');
    } else {
      alert('Wrong password');
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm(toForm(p));
    setTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError('');
    setTab('add');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.id.trim() || !form.nameEn.trim() || !form.nameAr.trim() || !form.price) {
      setFormError('id + English name + Arabic name + price are required');
      return;
    }
    setSaving(true);
    try {
      const payload = fromForm(form);
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setEditingId(null);
      setForm(emptyForm);
      setTab('products');
    } catch (err) {
      setFormError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Delete product "${id}"?`)) return;
    try {
      await deleteProduct(id);
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    } catch (err) {
      alert(err.message || 'Status update failed');
    }
  };

  // const handleDeleteOrder = async (orderId) => {
  //   if (!confirm('Delete this order?')) return;
  //   try {
  //     await deleteOrder(orderId);
  //     setOrders((prev) => prev.filter((o) => o.id !== orderId));
  //   } catch (err) {
  //     alert(err.message || 'Delete failed');
  //   }
  // };

  const filteredProducts = useMemo(
    () => products.filter((p) => !search || p.id.includes(search.toLowerCase()) || (p.nameEn || '').toLowerCase().includes(search.toLowerCase()) || (p.nameAr || '').includes(search)),
    [products, search]
  );

  const filteredOrders = useMemo(
    () => orders.filter((o) => statusFilter === 'all' || o.status === statusFilter),
    [orders, statusFilter]
  );

  if (!authed) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="p-8 rounded-3xl bg-white border border-[#EAE5DC] shadow-xs">
          <h1 className="text-xl font-serif font-bold mb-2">Admin login</h1>
          <p className="text-xs text-[#777] mb-4">Enter the admin password to manage products & orders.</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] text-sm focus:outline-none focus:border-[#59492E]"
            />
            <button type="submit" className="w-full py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold tracking-widest uppercase cursor-pointer">Login</button>
            <button type="button" onClick={() => { setCurrentView('home'); try { window.history.pushState({}, '', '/'); } catch { /* ignore */ } }} className="w-full py-2 text-xs text-[#777] cursor-pointer">← Back to store</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">Admin Dashboard</h1>
          <p className="text-xs text-[#777] mt-1">
            {products.length} products {usingLocal ? '(local fallback — run schema.sql + seed)' : '(live from Supabase)'} • {orders.length} orders loaded
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { refresh(); loadOrders(); }} className="px-4 py-2 rounded-full bg-white border border-[#D5CEC0] text-xs font-semibold cursor-pointer">Refresh</button>
          <button onClick={() => { setCurrentView('home'); try { window.history.pushState({}, '', '/'); } catch { /* ignore */ } }} className="px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold cursor-pointer">View store</button>
          <button onClick={() => { localStorage.removeItem('celine_admin_authed'); setAuthed(false); }} className="px-4 py-2 rounded-full bg-white border border-[#D5CEC0] text-xs cursor-pointer">Logout</button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['products', 'orders', 'add'].map((t) => {
          const count = t === 'products' ? products.length : t === 'orders' ? orders.length : null;
          return (
            <button
              key={t}
              onClick={() => t === 'add' ? startAdd() : setTab(t)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2 ${tab === t ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-[#D5CEC0]'}`}
            >
              <span>{t === 'add' ? (editingId ? 'Edit product' : '+ Add product') : t}</span>
              {count !== null && (
                <span className={`min-w-6 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-center ${tab === t ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === 'products' && (
        <div>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full max-w-sm mb-4 px-4 py-2 rounded-full bg-white border border-[#D5CEC0] text-sm focus:outline-none" />
          {productsLoading ? <p className="text-sm text-[#777]">Loading...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white border border-[#EAE5DC] flex gap-3">
                  <img src={p.image} alt={p.nameEn} className="w-20 h-24 object-cover rounded-xl border border-[#EAE5DC] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{p.nameEn}</p>
                    <p className="text-[11px] text-[#777] truncate">{p.nameAr}</p>
                    <p className="text-[11px] font-mono text-[#999]">{p.id} • {p.category} • E£{p.price}</p>
                    <p className="text-[11px]">{p.inStock ? '✅ In stock' : '❌ Out of stock'}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => startEdit(p)} className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-[11px] cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'orders' && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {['all', 'new', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase cursor-pointer ${statusFilter === s ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-[#D5CEC0]'}`}>{s} ({s === 'all' ? orders.length : orders.filter(o => o.status === s).length})</button>
            ))}
          </div>
          {ordersLoading ? <p className="text-sm">Loading orders...</p> : ordersError ? <p className="text-sm text-red-600">{ordersError}</p> : filteredOrders.length === 0 ? <p className="text-sm text-[#777]">No orders yet. Orders appear here the moment a customer hits “Send Order via WhatsApp”.</p> : (
            <div className="space-y-3">
              {filteredOrders.map((o) => (
                <div key={o.id} className="p-4 rounded-2xl bg-white border border-[#EAE5DC]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold font-mono">{o.order_number}</p>
                      <p className="text-xs text-[#555]">{o.customer_name} • {o.phone} • {o.city}</p>
                      <p className="text-[11px] text-[#888]">{new Date(o.created_at).toLocaleString()} • E£{Number(o.total).toLocaleString()} • {o.payment_method}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select value={o.status} onChange={(e) => handleStatusChange(o.id, e.target.value)} className="px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#D5CEC0] text-xs cursor-pointer">
                        <option value="new">new</option>
                        <option value="confirmed">confirmed</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                      <button onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)} className="px-3 py-1.5 rounded-full bg-white border border-[#D5CEC0] text-xs cursor-pointer">Details</button>
                      {/* <button onClick={() => handleDeleteOrder(o.id)} className="px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs cursor-pointer">Delete</button> */}
                    </div>
                  </div>
                  {expandedOrder === o.id && (
                    <div className="mt-3 pt-3 border-t border-[#EAE5DC] text-xs space-y-1">
                      <p><b>Address:</b> {o.address}</p>
                      {o.notes && <p><b>Notes:</b> {o.notes}</p>}
                      <p><b>Items:</b></p>
                      <ul className="list-disc ps-5">
                        {(o.items || []).map((it, i) => (
                          <li key={i}>{it.name_ar || it.name_en} {it.color ? `[${it.color.name_ar || it.color.name_en}]` : ''} × {it.quantity} — E£{(it.price * it.quantity).toLocaleString()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'add' && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border border-[#EAE5DC] grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <h2 className="md:col-span-2 text-lg font-serif font-bold">{editingId ? `Editing: ${editingId}` : 'Add new product'}</h2>
          {formError && <p className="md:col-span-2 text-xs text-red-600 font-semibold">{formError}</p>}
          <label className="text-xs font-bold">ID (slug)<input value={form.id} disabled={!!editingId} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="laura-new-ring" className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Ref code<input value={form.refCode} onChange={(e) => setForm({ ...form, refCode: e.target.value })} placeholder="LAU-RNG-99" className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Name (EN)<input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Name (AR)<input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-xs font-bold flex items-center gap-2 pt-6"><input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} /> In stock</label>
          <label className="text-xs font-bold">Price<input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Original price<input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <div className="md:col-span-2 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC]">
            <p className="text-xs font-bold mb-2">Product images (upload)</p>
            <input type="file" accept="image/*" multiple onChange={handleFiles} disabled={uploading} className="w-full text-xs file:me-3 file:px-4 file:py-2 file:rounded-full file:bg-[#1A1A1A] file:text-white file:text-[11px] file:font-bold file:cursor-pointer cursor-pointer" />
            {uploading && <p className="text-[11px] text-[#777] mt-2">Uploading...</p>}
            {uploadError && <p className="text-[11px] text-red-600 mt-2">{uploadError}</p>}
            {imageList.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                {imageList.map((url) => (
                  <div key={url} className={`relative rounded-xl overflow-hidden border ${form.image === url ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A]' : 'border-[#D5CEC0]'}`}>
                    <img src={url} alt="product" className="w-full h-24 object-cover" />
                    <div className="absolute bottom-1 inset-x-1 flex gap-1">
                      <button type="button" onClick={() => handleSetMain(url)} title="Set as main" className="flex-1 px-1 py-1 rounded-md bg-black/70 text-white text-[10px] cursor-pointer">{form.image === url ? '★ Main' : 'Main'}</button>
                      <button type="button" onClick={() => handleRemoveImage(url)} title="Remove" className="px-2 py-1 rounded-md bg-red-600/90 text-white text-[10px] cursor-pointer">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#999] mt-2">No images yet — upload or paste a URL below.</p>
            )}
          </div>
          <label className="text-xs font-bold">Main image (URL or /images/...)<input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/1.jpg" className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">All images (comma separated)<input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Badge EN<input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold">Badge AR<input value={form.badgeAr} onChange={(e) => setForm({ ...form, badgeAr: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold md:col-span-2">Description EN<textarea value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} rows={2} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <label className="text-xs font-bold md:col-span-2">Description AR<textarea value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} rows={2} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] font-normal" /></label>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" disabled={saving} className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase cursor-pointer disabled:opacity-50">{saving ? 'Saving...' : editingId ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setTab('products'); }} className="px-6 py-3 rounded-full bg-white border border-[#D5CEC0] text-xs cursor-pointer">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};
