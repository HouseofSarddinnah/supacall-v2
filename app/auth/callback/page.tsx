'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function handleAuth() {
      const { data, error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        console.error(error);
        return;
      }
      router.push("/"); // redirect to homepage after login
    }
    handleAuth();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      Logging you in...
    </div>
  );
}
