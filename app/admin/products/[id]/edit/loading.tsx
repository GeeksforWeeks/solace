import Spinner from "@/components/Spinner";

export default function EditProductLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex items-center gap-3 text-text-secondary text-xs uppercase tracking-widest">
        <Spinner size={16} />
        Loading product...
      </div>
    </div>
  );
}
