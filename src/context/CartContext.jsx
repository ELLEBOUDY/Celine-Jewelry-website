import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('laura_cart');
      return saved ? JSON.parse(saved) : [
        // Initialize with default sample from user's items for instant showroom feel
        {
          product: {
            id: 'laura-ring-solitaire',
            nameEn: 'Solitaire Oval Brilliant Diamond Ring',
            nameAr: 'خاتم سولتير بيضاوي بريليانت مع صفين بافيه',
            price: 1850,
            image: '/images/IMG_8174.JPG.jpeg',
            materialEn: '18K Yellow Gold Vermeil',
            materialAr: 'ذهب أصفر فيرميل عيار 18',
            refCode: 'LAU-SOL-441'
          },
          quantity: 1
        },
        {
          product: {
            id: 'laura-baguette-full-set',
            nameEn: 'Baguette Cut Radiance Trio Master Set',
            nameAr: 'طقم الباجيت الماسي المتكامل (سلسلة + انسيال + خاتم)',
            price: 3600,
            image: '/images/IMG_8178.JPG.jpeg',
            materialEn: '18K Gold Vermeil',
            materialAr: 'ذهب أصفر فيرميل عيار 18',
            refCode: 'LAU-BAG-092'
          },
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'about' | 'checkout'
  const [wishlist, setWishlist] = useState(['laura-ring-solitaire', 'laura-swan-necklace']);

  useEffect(() => {
    localStorage.setItem('laura_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
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
