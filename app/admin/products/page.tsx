import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteProductButton from "@/components/admin/deleteProductButton";
import Logo from "@/components/logo/Logo";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 text-center">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-red-500">
            Couldn&apos;t load products.
          </p>
          <p className="text-[10px] text-text-secondary uppercase tracking-wider">
            Try refreshing — if it keeps happening, check your Supabase
            connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 pt-16 pb-24">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-border-custom pb-6">
          <div>
            <Logo size={24} />
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block mt-2">
              ADMIN
            </span>
            <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-white mt-1">
              Products ({products?.length ?? 0})
            </h1>
          </div>
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 bg-white text-black font-display text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            <Plus size={14} />
            New Product
          </Link>
        </div>

        {!products || products.length === 0 ? (
          <p className="text-text-secondary text-xs uppercase tracking-wider text-center py-16">
            No products yet. Add your first one.
          </p>
        ) : (
          <div className="divide-y divide-border-custom border border-border-custom">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 hover:bg-neutral-950 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-12 h-14 object-cover bg-neutral-900 border border-border-custom shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-white truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider">
                      {product.category} — P{product.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-[10px] text-white uppercase tracking-widest hover:text-text-secondary transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
