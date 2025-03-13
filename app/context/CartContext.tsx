'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; size?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; size?: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'INITIALIZE_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  total: 0
};

function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState;

  switch (action.type) {
    case 'INITIALIZE_CART':
      return action.payload;

    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product.id === action.payload.product.id && 
          item.size === action.payload.size
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity
            };
          }
          return item;
        });
      } else {
        newItems = [...state.items, action.payload];
      }

      const newTotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      newState = {
        items: newItems,
        total: newTotal
      };
      break;
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => 
          !(item.product.id === action.payload.productId && 
            item.size === action.payload.size)
      );
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      newState = {
        items: newItems,
        total: newTotal
      };
      break;
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => {
        if (
          item.product.id === action.payload.productId && 
          item.size === action.payload.size
        ) {
          return {
            ...item,
            quantity: action.payload.quantity
          };
        }
        return item;
      });

      const newTotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      newState = {
        items: newItems,
        total: newTotal
      };
      break;
    }

    case 'CLEAR_CART':
      newState = {
        items: [],
        total: 0
      };
      break;

    default:
      return state;
  }

  return newState;
}

// Function to save cart to localStorage (only called client-side)
const saveCartToStorage = (cart: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  // Use state to track if we're on the client
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Handle localStorage and hydration
  useEffect(() => {
    // This code only runs on the client
    const handleClientLoad = () => {
      try {
        // Clear any carts with old Unsplash URLs
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          
          // Check if cart contains old Unsplash URLs and clear if it does
          const hasOldUrls = parsedCart.items && parsedCart.items.some(
            (item: CartItem) => item.product.image.includes('unsplash.com')
          );
          
          if (hasOldUrls) {
            localStorage.removeItem('cart');
          } else {
            dispatch({
              type: 'INITIALIZE_CART',
              payload: parsedCart
            });
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      } finally {
        setIsLoading(false);
      }
    };

    handleClientLoad();
  }, []);

  // Save to localStorage whenever state changes (but only after initial load)
  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(state);
    }
  }, [state, isLoading]);

  const addToCart = (product: Product, quantity: number, size?: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, size }
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId, size }
    });
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity, size }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 