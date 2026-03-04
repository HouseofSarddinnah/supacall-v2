"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/"); // Redirect to homepage/dashboard
      } else {
        router.push("/login"); // Redirect back to login if session failed
      }
    };
    handleAuth();
  }, []);

  return <p>Logging you in… please wait</p>;
}
