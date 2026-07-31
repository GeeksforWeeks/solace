import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 pt-16 pb-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="border-b border-border-custom pb-6">
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
            SOLACE ADMIN
          </span>
          <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-white mt-1">
            New Product
          </h1>
        </div>
        <ProductForm />
      </div>
    </div>
  );
}
