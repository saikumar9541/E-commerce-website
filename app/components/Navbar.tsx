'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartIcon from './CartIcon';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/logo/explore-logo.svg" 
                alt="ExploreWithMe Logo" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="text-2xl font-bold text-gray-800">ExploreWithMe</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/"
              className={`${
                pathname === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 text-sm font-medium`}
            >
              Home
            </Link>
            <Link 
              href="/men"
              className={`${
                pathname === '/men' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 text-sm font-medium`}
            >
              Men
            </Link>
            <Link 
              href="/women"
              className={`${
                pathname === '/women' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 text-sm font-medium`}
            >
              Women
            </Link>
            <Link
              href="/cart"
              className="text-gray-600 hover:text-gray-900"
            >
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 