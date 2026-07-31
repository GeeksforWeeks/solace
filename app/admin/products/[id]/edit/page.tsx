import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import { ProductFormData } from "@/lib/products";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const initialData: ProductFormData = {
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: product.price,
    oldPrice: product.old_price,
    images: product.images ?? [],
    description: product.description,
    sizes: product.sizes ?? [],
    materials: product.materials ?? [],
    details: product.details ?? [],
    isSale: product.is_sale,
    isLimited: product.is_limited,
    isExclusive: product.is_exclusive,
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 pt-16 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="border-b border-border-custom pb-6">
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
            SOLACE ADMIN
          </span>
          <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-white mt-1">
            Edit Product
          </h1>
        </div>
        <ProductForm productId={id} initialData={initialData} />
      </div>
    </div>
  );
}
