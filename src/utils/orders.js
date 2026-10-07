import { supabase } from './supabase.js';

// Snapshot a cart item into a plain JSON object for the orders table
export const cartToOrderItems = (cart) =>
  cart.map((it) => ({
    product_id: it.product?.id || null,
    ref_code: it.product?.refCode || null,
    name_en: it.product?.nameEn || null,
    name_ar: it.product?.nameAr || null,
    price: it.product?.price || 0,
    quantity: it.quantity || 1,
    color: it.selectedColor
      ? {
          id: it.selectedColor.id,
          name_en: it.selectedColor.nameEn,
          name_ar: it.selectedColor.nameAr,
        }
      : null,
    image: it.selectedColor?.image || it.product?.image || null,
  }));

export const createOrderInSupabase = async ({
  orderNumber,
  fullName,
  phoneNumber,
  city,
  streetAddress,
  notes,
  selectedPayment,
  cart,
  subtotal,
  total,
}) => {
  const payload = {
    order_number: orderNumber,
    customer_name: fullName,
    phone: phoneNumber,
    city,
    address: streetAddress,
    notes: notes || null,
    payment_method: selectedPayment || 'cod',
    items: cartToOrderItems(cart),
    subtotal,
    shipping: 0,
    total,
    status: 'new',
    whatsapp_sent: true,
  };

  const { data, error } = await supabase.from('orders').insert(payload).select().single();
  if (error) throw error;
  return data;
};

export const fetchOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const updateOrderStatus = async (id, status) => {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteOrder = async (id) => {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
};
