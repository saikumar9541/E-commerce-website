'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { PrimaryButton } from '../../components/ui/primary-button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
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