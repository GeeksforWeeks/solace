'use client';

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Return mock data synchronously or fast to simulate loading
    setProducts(productsData as Product[]);
    setLoading(false);
  }, []);

  return { products, loading };
}
