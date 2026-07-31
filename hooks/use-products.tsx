'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types';

type DatabaseProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  old_price: number | null;
  images: string[];
  description: string;
  sizes: string[];
  materials: string[];
  details: string[];
  is_sale: boolean;
  is_limited: boolean;
  is_exclusive: boolean;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        // Map snake_case from DB to camelCase for frontend
        const mappedProducts = (data as DatabaseProduct[] || []).map((p: DatabaseProduct) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          category: p.category,
          price: p.price,
          oldPrice: p.old_price,
          images: p.images || [],
          description: p.description,
          sizes: p.sizes || [],
          materials: p.materials || [],
          details: p.details || [],
          isSale: p.is_sale,
          isLimited: p.is_limited,
          isExclusive: p.is_exclusive,
        })) as Product[];

        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}