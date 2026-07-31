'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

// Server-side validation
const productSchema = z.object({
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only'),
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  oldPrice: z.number().min(0).optional().nullable(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  description: z.string().min(1, 'Description is required'),
  sizes: z.array(z.string()).min(1, 'At least one size is required'),
  materials: z.array(z.string()),
  details: z.array(z.string()),
  isSale: z.boolean(),
  isLimited: z.boolean(),
  isExclusive: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export type ActionResult = { success: true } | { success: false; error: string };

export async function createProduct(formData: ProductFormData): Promise<ActionResult> {
  const parsed = productSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid product data.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('products').insert({
    slug: parsed.data.slug,
    name: parsed.data.name,
    category: parsed.data.category,
    price: parsed.data.price,
    old_price: parsed.data.oldPrice ?? null,
    images: parsed.data.images,
    description: parsed.data.description,
    sizes: parsed.data.sizes,
    materials: parsed.data.materials,
    details: parsed.data.details,
    is_sale: parsed.data.isSale,
    is_limited: parsed.data.isLimited,
    is_exclusive: parsed.data.isExclusive,
  });

  if (error) {
    return { success: false, error: toFriendlyDbError(error.message) };
  }

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  return { success: true };
}

export async function updateProduct(id: string, formData: ProductFormData): Promise<ActionResult> {
  const parsed = productSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid product data.' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('products')
    .update({
      slug: parsed.data.slug,
      name: parsed.data.name,
      category: parsed.data.category,
      price: parsed.data.price,
      old_price: parsed.data.oldPrice ?? null,
      images: parsed.data.images,
      description: parsed.data.description,
      sizes: parsed.data.sizes,
      materials: parsed.data.materials,
      details: parsed.data.details,
      is_sale: parsed.data.isSale,
      is_limited: parsed.data.isLimited,
      is_exclusive: parsed.data.isExclusive,
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: toFriendlyDbError(error.message) };
  }

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  revalidatePath(`/product/${parsed.data.slug}`);
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    return { success: false, error: toFriendlyDbError(error.message) };
  }

  revalidatePath('/admin/products');
  revalidatePath('/catalog');
  return { success: true };
}

// Same principle as ImageUpload's error mapping — whoever's using the
// admin panel shouldn't see raw Postgres/RLS error strings.
function toFriendlyDbError(rawMessage: string): string {
  const msg = rawMessage.toLowerCase();

  if (msg.includes('duplicate') || msg.includes('unique')) {
    return 'A product with that slug already exists — use a different one.';
  }
  if (msg.includes('row-level security') || msg.includes('policy')) {
    return 'You need to be logged in to do that. Try logging in again.';
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Connection issue — check your network and try again.';
  }
  return 'Something went wrong saving this product. Please try again.';
}