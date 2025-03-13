export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women';
  subcategory: string;
  image: string;
  description: string;
  features?: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  dateAdded: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: "Men's Classic T-Shirt",
    price: 29.99,
    category: 'men',
    subcategory: 'tops',
    image: '/Mens/mens-tshirt.jpeg',
    description: 'Classic cotton t-shirt for everyday wear. Made from 100% organic cotton for comfort and durability.',
    features: ['100% Organic Cotton', 'Regular fit', 'Crew neck', 'Machine washable'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    inStock: true,
    rating: 4.5,
    reviews: 128,
    isNew: false,
    isFeatured: true,
    dateAdded: '2023-01-15'
  },
  {
    id: '2',
    name: "Men's Slim-Fit Jeans",
    price: 79.99,
    category: 'men',
    subcategory: 'bottoms',
    image: '/Mens/mens-jeans.webp',
    description: 'Comfortable slim-fit jeans for a modern look. These jeans offer the perfect balance of style and comfort for everyday wear.',
    features: ['98% Cotton, 2% Elastane', 'Slim fit', 'Five-pocket styling', 'Button closure'],
    sizes: ['30x30', '32x30', '32x32', '34x32', '36x32'],
    colors: ['Blue', 'Black', 'Gray'],
    inStock: true,
    rating: 4.3,
    reviews: 95,
    isNew: false,
    isFeatured: false,
    dateAdded: '2023-02-10'
  },
  {
    id: '3',
    name: "Women's Summer Dress",
    price: 59.99,
    category: 'women',
    subcategory: 'dresses',
    image: '/Womens/womens-dress.jpeg',
    description: 'Elegant summer dress perfect for any occasion. This lightweight dress features a flattering silhouette and comfortable fabric.',
    features: ['100% Rayon', 'A-line silhouette', 'V-neck', 'Machine washable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Blue', 'Red'],
    inStock: true,
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isFeatured: true,
    dateAdded: '2023-03-05'
  },
  {
    id: '4',
    name: "Women's Blouse",
    price: 39.99,
    category: 'women',
    subcategory: 'tops',
    image: '/Womens/womens-blouse.jpeg',
    description: 'Stylish blouse for a professional look. This versatile blouse can be dressed up for work or down for casual outings.',
    features: ['95% Polyester, 5% Spandex', 'Relaxed fit', 'Button-up front', 'Hand wash cold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Pink', 'Blue'],
    inStock: true,
    rating: 4.2,
    reviews: 78,
    isNew: false,
    isFeatured: false,
    dateAdded: '2023-01-25'
  },
  {
    id: '5',
    name: "Men's Hoodie",
    price: 49.99,
    category: 'men',
    subcategory: 'outerwear',
    image: '/Mens/mens-hoodie.jpeg',
    description: 'Comfortable hoodie for casual wear. This cozy hoodie is perfect for lounging or outdoor activities in cooler weather.',
    features: ['80% Cotton, 20% Polyester', 'Regular fit', 'Kangaroo pocket', 'Drawstring hood'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy', 'Green'],
    inStock: true,
    rating: 4.6,
    reviews: 112,
    isNew: false,
    isFeatured: true,
    dateAdded: '2023-02-18'
  },
  {
    id: '6',
    name: "Women's Jeans",
    price: 69.99,
    category: 'women',
    subcategory: 'bottoms',
    image: '/Womens/womens-jeans.jpeg',
    description: 'Classic high-waisted jeans that provide both comfort and style. These jeans feature a flattering fit and versatile design.',
    features: ['95% Cotton, 5% Elastane', 'High-waisted', 'Skinny fit', 'Five-pocket styling'],
    sizes: ['25', '26', '27', '28', '29', '30', '31', '32'],
    colors: ['Blue', 'Black', 'Light Wash'],
    inStock: true,
    rating: 4.4,
    reviews: 89,
    isNew: false,
    isFeatured: false,
    dateAdded: '2023-01-30'
  },
  {
    id: '7',
    name: "Men's Jacket",
    price: 89.99,
    category: 'men',
    subcategory: 'outerwear',
    image: '/Mens/mens-jacket.jpeg',
    description: 'Stylish jacket for cooler weather. This versatile jacket offers protection from the elements without sacrificing style.',
    features: ['100% Polyester shell', 'Water-resistant', 'Zippered pockets', 'Machine washable'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Olive'],
    inStock: true,
    rating: 4.8,
    reviews: 65,
    isNew: true,
    isFeatured: true,
    dateAdded: '2023-03-15'
  },
  {
    id: '8',
    name: "Women's Top",
    price: 34.99,
    category: 'women',
    subcategory: 'tops',
    image: '/Womens/womens-top.jpeg',
    description: 'Versatile top that pairs with anything. This essential piece is perfect for creating numerous outfits for any occasion.',
    features: ['95% Rayon, 5% Spandex', 'Relaxed fit', 'Scoop neck', 'Machine washable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Red', 'Blue', 'Green'],
    inStock: true,
    rating: 4.3,
    reviews: 102,
    isNew: false,
    isFeatured: false,
    dateAdded: '2023-02-05'
  },
  {
    id: '9',
    name: "Men's Dress Shirt",
    price: 54.99,
    category: 'men',
    subcategory: 'formal',
    image: '/Mens/mens-shirt.jpeg',
    description: 'Formal dress shirt for business or special occasions. This crisp, well-tailored shirt provides a polished look for any formal setting.',
    features: ['100% Cotton', 'Regular fit', 'Button-down collar', 'Machine washable'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink', 'Black'],
    inStock: true,
    rating: 4.5,
    reviews: 76,
    isNew: false,
    isFeatured: false,
    dateAdded: '2023-01-20'
  },
  {
    id: '10',
    name: "Women's Skirt",
    price: 44.99,
    category: 'women',
    subcategory: 'bottoms',
    image: '/Womens/womens-skirt.jpeg',
    description: 'Elegant skirt with a modern cut. This stylish skirt can be dressed up for work or down for casual outings.',
    features: ['65% Polyester, 35% Viscose', 'A-line silhouette', 'Side zipper', 'Dry clean only'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray', 'Beige'],
    inStock: true,
    rating: 4.4,
    reviews: 58,
    isNew: false,
    isFeatured: false,
    dateAdded: '2023-02-25'
  },
  {
    id: '11',
    name: "Men's Casual Shorts",
    price: 39.99,
    category: 'men',
    subcategory: 'bottoms',
    image: '/Mens/mens-shirt.jpeg',
    description: 'Comfortable casual shorts perfect for warm weather. These shorts offer both style and functionality for everyday wear.',
    features: ['100% Cotton', 'Regular fit', 'Drawstring waist', 'Side pockets'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    inStock: true,
    rating: 4.2,
    reviews: 45,
    isNew: true,
    isFeatured: false,
    dateAdded: '2023-04-10'
  },
  {
    id: '12',
    name: "Women's Cardigan",
    price: 49.99,
    category: 'women',
    subcategory: 'outerwear',
    image: '/Womens/womens-top.jpeg',
    description: 'Soft, lightweight cardigan for layering. This versatile piece adds warmth and style to any outfit.',
    features: ['70% Cotton, 30% Polyester', 'Relaxed fit', 'Button-up front', 'Machine washable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Cream', 'Navy'],
    inStock: true,
    rating: 4.6,
    reviews: 87,
    isNew: false,
    isFeatured: true,
    dateAdded: '2023-03-01'
  }
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Helper function to get products by category
export function getProductsByCategory(category: 'men' | 'women'): Product[] {
  return products.filter(product => product.category === category);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured);
}

// Helper function to get new arrivals
export function getNewArrivals(): Product[] {
  return products.filter(product => product.isNew);
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.subcategory.toLowerCase().includes(lowercaseQuery)
  );
} 