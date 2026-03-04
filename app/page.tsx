"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Check if a user session exists
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);

      // Subscribe to auth changes (optional but recommended)
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  const handleLogin = async () => {
    // Start OAuth login
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      Loading SupaCall...
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {!user ? (
        // LOGGED OUT VIEW
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl text-center">
          <h1 className="text-5xl font-extrabold text-purple-500">SupaCall v2</h1>
          <p className="text-gray-400">Secure video calling for the next generation.</p>
          <button
            onClick={handleLogin}
            className="w-full bg-white text-black py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        // LOGGED IN VIEW
        <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-900 rounded-3xl border border-purple-500/30 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-purple-400 text-sm">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-white underline"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-black/50 rounded-2xl border border-gray-800 hover:border-purple-500 transition cursor-pointer group">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-bold group-hover:text-purple-400">Start New Call</h3>
              <p className="text-xs text-gray-500">Create a unique link and invite others.</p>
            </div>
            <div className="p-6 bg-black/50 rounded-2xl border border-gray-800 hover:border-purple-500 transition cursor-pointer group">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-bold group-hover:text-purple-400">Contacts</h3>
              <p className="text-xs text-gray-500">Manage your saved call partners.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}