"use client";

// Admin-only

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Spinner from "@/components/Spinner";

interface ImageUploadProps {
  onUploaded: (url: string) => void;
}

export default function ImageUpload({ onUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic guardrails
    const MAX_SIZE_MB = 8;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large — keep it under ${MAX_SIZE_MB}MB.`);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("That is not an image file.");
      return;
    }

    setUploading(true);
    setError(null);

    const supabase = createClient();

    // Unique-ish filename so re-uploads don't silently overwrite each other
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError(toFriendlyUploadError(uploadError.message));
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    onUploaded(publicUrlData.publicUrl);
    setUploading(false);
  };

  function toFriendlyUploadError(rawMessage: string): string {
    const msg = rawMessage.toLowerCase();

    if (msg.includes("row-level security") || msg.includes("policy")) {
      return "You need to be logged in to upload images. Try logging in again.";
    }
    if (msg.includes("exceeded") || msg.includes("quota")) {
      return "Storage limit reached - contact support before uploading more.";
    }
    if (msg.includes("network") || msg.includes("fetch")) {
      return "Upload failed - check your connection and try again.";
    }
    return "Upload failed. Please try again, or try a different image.";
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
        Upload Product Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full bg-black border border-border-custom p-3 text-xs text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-white file:text-black file:text-xs file:font-bold file:uppercase"
      />
      {uploading && (
        <p className="text-[10px] text-text-secondary uppercase tracking-wider flex items-center gap-2">
          <Spinner size={12} />
          Uploading...
        </p>
      )}
      {error && (
        <p className="text-[10px] text-red-500 font-semibold tracking-wider">
          {error}
        </p>
      )}
    </div>
  );
}
