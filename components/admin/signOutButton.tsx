"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-6 py-2.5 border border-border-custom text-white font-display text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all"
    >
      Sign Out
    </button>
  );
}
