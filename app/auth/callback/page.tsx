"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      // Exchange code for session (Supabase v2)
      const { data: { session }, error } = await supabase.auth.exchangeCodeForSession();

      if (error) {
        console.error("Error exchanging code for session:", error.message);
        return;
      }

      if (session) {
        // Optionally, store session locally
        localStorage.setItem("supabaseSession", JSON.stringify(session));
        router.push("/dashboard"); // Redirect after login
      }
    }

    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Logging you in...</p>
    </div>
  );
}
