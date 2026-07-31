"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import Spinner from "@/components/Spinner";
import Logo from "@/components/logo/Logo";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setSubmitting(true);
    setServerError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError("Incorrect email or password.");
      setSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo size={28} />
          </div>
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
            ADMIN
          </span>
          <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-white">
            SIGN IN
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-black border border-border-custom p-4 text-xs font-mono text-white tracking-wide uppercase focus:border-white focus:outline-hidden transition-all duration-300"
              placeholder="ENTER YOUR EMAIL"
              autoComplete="username"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
              PASSWORD
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full bg-black border border-border-custom p-4 text-xs text-white tracking-wide focus:border-white focus:outline-hidden transition-all duration-300"
              placeholder="ENTER YOUR PASSWORD"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-[10px] text-red-500 font-semibold tracking-wider text-center">
              {serverError}
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
                SIGNING IN...
              </>
            ) : (
              "AUTHENTICATE"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
