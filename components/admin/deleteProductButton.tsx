"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/products";
import Spinner from "@/components/Spinner";

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const result = await deleteProduct(id);

    if (!result.success) {
      setError(result.error);
      setDeleting(false);
      setConfirming(false);
      return;
    }

    router.refresh();
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-text-secondary uppercase">
          Delete {name}?
        </span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1.5 bg-red-900 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-red-800 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          {deleting && <Spinner size={10} />}
          {deleting ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="px-3 py-1.5 border border-border-custom text-white text-[9px] uppercase tracking-widest hover:border-white transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        {error && <span className="text-[9px] text-red-500">{error}</span>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-text-secondary hover:text-red-500 transition-colors p-1.5"
      aria-label={`Delete ${name}`}
    >
      <Trash2 size={14} />
    </button>
  );
}
