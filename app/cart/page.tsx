'use client';

import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { PrimaryButton } from '../components/ui/primary-button';

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some items to your cart to continue shopping.</p>
            <Link href="/">
              <PrimaryButton size="lg">
                Continue Shopping
              </PrimaryButton>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8" suppressHydrationWarning>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {state.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size || 'no-size'}`}
                  className="flex items-center gap-4 p-4 border-b last:border-b-0"
                >
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.size && `Size: ${item.size}`}
                    </p>
                    <p className="text-gray-600 text-sm">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.size)}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    <span suppressHydrationWarning>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span suppressHydrationWarning>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span suppressHydrationWarning>${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link href="/checkout">
                <PrimaryButton className="w-full">
                  Proceed to Checkout
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 