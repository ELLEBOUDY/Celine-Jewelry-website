import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      // Clear legacy sample cart if present
      localStorage.removeItem('laura_cart');
      const saved = localStorage.getItem('celine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'about' | 'checkout'
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('celine_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('celine_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('celine_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const chosenColor = selectedColor || (product.colors?.[0] || null);
    const cartItemId = `${product.id}_${chosenColor?.id || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => (item.cartItemId || item.product.id) === cartItemId);
      if (existing) {
        return prev.map(item =>
          (item.cartItemId || item.product.id) === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { cartItemId, product, quantity, selectedColor: chosenColor }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (idOrCartItemId) => {
    setCart(prev => prev.filter(item => 
      item.cartItemId !== idOrCartItemId && item.product.id !== idOrCartItemId
    ));
  };

  const updateQuantity = (idOrCartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(idOrCartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        (item.cartItemId === idOrCartItemId || item.product.id === idOrCartItemId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = 0; // Complimentary White-Glove delivery as per Figma design
  const total = subtotal + shippingFee;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#9A7B56', '#59492E', '#FAF8F5']
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        shippingFee,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        currentView,
        setCurrentView,
        wishlist,
        toggleWishlist,
        triggerConfetti
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
