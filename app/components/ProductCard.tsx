'use client';

import { Product } from '../data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { PrimaryButton } from './ui/primary-button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <PrimaryButton 
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </PrimaryButton>
          </div>
        </div>
      </Link>
    </div>
  );
} 