import { getProductById } from '../../data/products';
import { notFound } from 'next/navigation';
import ProductDetails from './ProductDetails';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // This is now a server component that can use async/await
  const id = params.id;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
} 