import { getFeaturedProducts } from './data/products';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Image from 'next/image';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ExploreWithMe</h1>
          <p className="text-lg text-gray-600">Discover quality apparel for your next adventure</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Men&apos;s Collection</h3>
                <a
                  href="/men"
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative w-full h-full">
              <Image
                src="/Mens/mens-jacket.jpeg"
                alt="Men&apos;s Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Women&apos;s Collection</h3>
                <a
                  href="/women"
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative w-full h-full">
              <Image
                src="/Womens/womens-dress.jpeg"
                alt="Women&apos;s Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
