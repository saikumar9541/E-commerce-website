'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { PrimaryButton } from '../../components/ui/primary-button';
import { Product } from '../../data/products';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [size, setSize] = useState(product?.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, size);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Link 
            href={`/${product.category}`}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to {product.category}&apos;s collection
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-96 md:h-full min-h-[400px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{product.description}</p>
              
              <div className="mb-8">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="space-y-4">
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex items-center gap-4">
                    <label htmlFor="size" className="text-gray-700 font-medium">Size:</label>
                    <select 
                      id="size" 
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {product.sizes.map((sizeOption) => (
                        <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-gray-700 font-medium">Quantity:</label>
                  <select 
                    id="quantity" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <PrimaryButton 
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full"
                >
                  Add to Cart
                </PrimaryButton>
              </div>

              <div className="mt-8 border-t pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-2 text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 text-gray-600">
                    <li>• High-quality materials</li>
                    <li>• Machine washable</li>
                    <li>• Free returns within 30 days</li>
                    <li>• 1 year warranty</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 