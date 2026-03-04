"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallbackPage() {
  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Complete the OAuth flow after redirect
      const { data, error } = await supabase.auth.getSessionFromUrl();
      if (error) {
        console.error("Error retrieving session:", error.message);
        return;
      }

      // Optionally, you can store session info locally
      console.log("Logged in user:", data.session?.user);

      // Redirect to homepage after login
      window.location.href = "/";
    };

    handleAuthRedirect();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      Logging you in...
    </div>
  );
}
