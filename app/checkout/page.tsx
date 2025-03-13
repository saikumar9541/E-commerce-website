'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { PrimaryButton } from '../components/ui/primary-button';
import { useRouter } from 'next/navigation';
import { getStripe } from '@/lib/stripe';

export default function CheckoutPage() {
  const { state, isLoading } = useCart();
  const [email, setEmail] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (!isLoading && state.items.length === 0) {
      router.push('/cart');
    }
  }, [isLoading, state.items.length, router]);

  const handleCheckout = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setCheckoutLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
        
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      setError('An error occurred during checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8" suppressHydrationWarning>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size || 'no-size'}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">{item.quantity} ×</span>
                      <span className="text-gray-900">{item.product.name}</span>
                      {item.size && <span className="text-gray-500 ml-2">({item.size})</span>}
                    </div>
                    <span className="text-gray-900" suppressHydrationWarning>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>
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

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <PrimaryButton
                onClick={handleCheckout}
                className="w-full"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? 'Processing...' : 'Complete Order'}
              </PrimaryButton>

              <p className="text-sm text-gray-500 mt-4">
                By completing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 