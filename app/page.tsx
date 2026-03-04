'use client';

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, [supabase]);

  const handleLogin = async () => {
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
      SupaCall Loading...
    </div>
  );

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
        <div className="bg-zinc-900 border border-purple-500/50 p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back,</h2>
          <p className="text-purple-400 font-mono mb-8">{user.email}</p>
          <button
            className="bg-purple-600 p-4 rounded-xl font-bold hover:bg-purple-700 transition-colors"
          >
            🚀 Start New Call
          </button>
          <button
            onClick={handleLogout}
            className="text-zinc-500 text-sm hover:text-white underline mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}