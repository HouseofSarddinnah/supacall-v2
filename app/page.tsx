"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) console.error(error);
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload(); // refresh to clear state
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading SupaCall...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {!user ? (
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black italic text-purple-500">SUPACALL</h1>
          <p className="text-gray-400">Secure video calling for the next generation.</p>
          <button
            onClick={handleLogin}
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl text-center">
          <h2 className="text-2xl font-bold">Welcome Back,</h2>
          <p className="text-purple-400 mb-4">{user.email}</p>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Logout
          </button>
          <div className="mt-6">
            <button className="bg-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition">
              🚀 Start New Call
            </button>
          </div>
        </div>
      )}
    </main>
  );
}