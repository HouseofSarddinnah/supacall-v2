"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallback() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) console.error("Error fetching user:", error.message);
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
