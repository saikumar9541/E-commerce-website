'use client';

import { useEffect, useState, useId } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { PrimaryButton } from '../../components/ui/primary-button';
import { useCart } from '../../context/CartContext';

export default function SuccessPage() {
  // Generate a stable ID for this component instance
  const stableId = useId();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart, isLoading } = useCart();

  useEffect(() => {
    // Only proceed when cart context is ready
    if (!isLoading) {
      // Use a small timeout to ensure we're fully hydrated before modifying state
      const timer = setTimeout(() => {
        // Clear the cart when payment is successful
        clearCart();

        // Fetch order details from session ID
        const fetchOrderDetails = async () => {
          if (!sessionId) {
            setError('No session ID found');
            setLoading(false);
            return;
          }

          try {
            // In a real application, you would fetch the order details from your backend
            // For this demo, we'll just simulate a successful order
            setOrderDetails({
              id: `ORD-${Math.floor(Math.random() * 1000000)}`,
              date: new Date().toLocaleDateString(),
              status: 'Paid',
            });
          } catch (err) {
            console.error('Error fetching order details:', err);
            setError('Failed to load order details');
          } finally {
            setLoading(false);
          }
        };

        fetchOrderDetails();
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [sessionId, clearCart, isLoading]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading order details...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/">
              <PrimaryButton size="lg">
                Return to Home
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
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600">
              Your payment was successful and your order has been placed.
            </p>
          </div>

          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium" suppressHydrationWarning>{orderDetails.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium" suppressHydrationWarning>{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600" suppressHydrationWarning>{orderDetails.status}</span>
            </div>
          </div>

          <p className="text-gray-600 text-center mb-6">
            We&apos;ve sent a confirmation email with all the details of your order.
          </p>

          <div className="flex justify-center">
            <Link href="/">
              <PrimaryButton size="lg">
                Continue Shopping
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 