import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/signOutButton";
import Logo from "@/components/logo/Logo";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 pt-16 pb-24">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-border-custom pb-6">
          <div className="space-y-2">
            <Logo size={24} />
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              ADMIN
            </span>
            <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-white">
              Dashboard
            </h1>
          </div>
          <SignOutButton />
        </div>

        <p className="text-text-secondary text-xs uppercase tracking-wider">
          Signed in as {user.email}
        </p>

        <nav className="border border-border-custom">
          <Link
            href="/admin/products"
            className="flex items-center justify-between p-6 hover:bg-neutral-950 transition-colors group"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white">
                Products
              </p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">
                Add, edit, and remove catalog items
              </p>
            </div>
            <span className="text-text-secondary group-hover:text-white transition-colors text-xs">
              →
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
