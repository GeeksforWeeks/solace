// FILE PATH: components/admin/ProductForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";
import ImageUpload from "./ImageUpload";
import Spinner from "@/components/Spinner";
import {
  createProduct,
  updateProduct,
  ProductFormData,
} from "@/lib/products";

interface ProductFormProps {
  productId?: string; // present = editing, absent = creating
  initialData?: ProductFormData;
}

const emptyProduct: ProductFormData = {
  slug: "",
  name: "",
  category: "Outerwear",
  price: 0,
  oldPrice: null,
  images: [],
  description: "",
  sizes: [],
  materials: [],
  details: [],
  isSale: false,
  isLimited: false,
  isExclusive: false,
};

export default function ProductForm({
  productId,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const [data, setData] = useState<ProductFormData>(
    initialData ?? emptyProduct,
  );
  const [sizeInput, setSizeInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");
  const [detailInput, setDetailInput] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = isEditing
      ? await updateProduct(productId!, data)
      : await createProduct(data);

    if (!result.success) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  const addToList = (
    field: "sizes" | "materials" | "details",
    value: string,
    clear: () => void,
  ) => {
    if (!value.trim()) return;
    setData((prev) => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    clear();
  };

  const removeFromList = (
    field: "sizes" | "materials" | "details",
    index: number,
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Basic fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
            Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            className="w-full bg-black border border-border-custom p-3 text-xs text-white uppercase focus:border-white focus:outline-hidden"
          />
        </div>

        <div className="space-y-2 col-span-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
            Slug (URL-safe, lowercase, hyphens only)
          </label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => setData({ ...data, slug: e.target.value })}
            required
            pattern="[a-z0-9-]+"
            placeholder="solace-example-product"
            className="w-full bg-black border border-border-custom p-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
            Category
          </label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full bg-black border border-border-custom p-3 text-xs text-white uppercase focus:border-white focus:outline-hidden"
          >
            <option value="Outerwear">Outerwear</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
            Price (P)
          </label>
          <input
            type="number"
            value={data.price}
            onChange={(e) =>
              setData({ ...data, price: parseFloat(e.target.value) || 0 })
            }
            onFocus={(e) => e.target.select()}
            required
            min={0}
            step={0.01}
            className="w-full bg-black border border-border-custom p-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
          />
        </div>

        <div className="space-y-2 col-span-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
            Old Price (optional — leave blank if not on sale)
          </label>
          <input
            type="number"
            value={data.oldPrice ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                oldPrice: e.target.value ? parseFloat(e.target.value) : null,
              })
            }
            onFocus={(e) => e.target.select()}
            min={0}
            step={0.01}
            className="w-full bg-black border border-border-custom p-3 text-xs font-mono text-white focus:border-white focus:outline-hidden"
          />
        </div>

        <div className="space-y-2 col-span-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
            rows={4}
            className="w-full bg-black border border-border-custom p-3 text-xs text-white focus:border-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-3 border-t border-border-custom pt-6">
        <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
          Images ({data.images.length})
        </label>
        <div className="grid grid-cols-4 gap-3">
          {data.images.map((url, i) => (
            <div
              key={i}
              className="relative aspect-3/4 bg-neutral-950 border border-border-custom"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Product image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    images: data.images.filter((_, idx) => idx !== i),
                  })
                }
                className="absolute top-1 right-1 bg-black/80 p-1 hover:bg-red-900 transition-colors"
                aria-label="Remove image"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
        <ImageUpload
          onUploaded={(url) =>
            setData({ ...data, images: [...data.images, url] })
          }
        />
      </div>

      {/* Sizes, materials, details — same add/remove pattern */}
      {(["sizes", "materials", "details"] as const).map((field) => {
        const inputValue =
          field === "sizes"
            ? sizeInput
            : field === "materials"
              ? materialInput
              : detailInput;
        const setInputValue =
          field === "sizes"
            ? setSizeInput
            : field === "materials"
              ? setMaterialInput
              : setDetailInput;

        return (
          <div
            key={field}
            className="space-y-3 border-t border-border-custom pt-6"
          >
            <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
              {field}
            </label>
            <div className="flex flex-wrap gap-2">
              {data[field].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-border-custom text-[10px] text-white uppercase"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeFromList(field, i)}
                    aria-label={`Remove ${item}`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addToList(field, inputValue, () => setInputValue(""));
                  }
                }}
                placeholder={`Add a ${field.slice(0, -1)}...`}
                className="flex-1 bg-black border border-border-custom p-2.5 text-xs text-white focus:border-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() =>
                  addToList(field, inputValue, () => setInputValue(""))
                }
                className="px-4 bg-neutral-900 border border-border-custom hover:bg-white hover:text-black transition-colors"
                aria-label={`Add ${field.slice(0, -1)}`}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        );
      })}

      {/* Flags */}
      <div className="flex gap-6 border-t border-border-custom pt-6">
        {(["isSale", "isLimited", "isExclusive"] as const).map((flag) => (
          <label
            key={flag}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white"
          >
            <input
              type="checkbox"
              checked={data[flag]}
              onChange={(e) => setData({ ...data, [flag]: e.target.checked })}
              className="accent-white"
            />
            {flag.replace("is", "")}
          </label>
        ))}
      </div>

      {/* Submit */}
      {error && (
        <p className="text-[10px] text-red-500 font-semibold tracking-wider">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-white text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Spinner size={12} />
            {isEditing ? "SAVING..." : "CREATING..."}
          </>
        ) : isEditing ? (
          "SAVE CHANGES"
        ) : (
          "CREATE PRODUCT"
        )}
      </button>
    </form>
  );
}
