"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white italic">
        SupaCall Loading...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {!user ? (
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black italic tracking-tighter text-purple-500">SUPACALL</h1>
          <p className="text-gray-400">Secure video calling for the next generation.</p>
          <button
            onClick={handleLogin}
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-purple-500/50 p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back,</h2>
          <p className="text-purple-400 font-mono mb-8">{user.email}</p>
          <div className="grid grid-cols-1 gap-4">
            <button className="bg-purple-600 p-4 rounded-xl font-bold hover:bg-purple-700 transition-colors">
              🚀 Start New Call
            </button>
            <button 
              onClick={handleLogout}
              className="text-zinc-500 text-sm hover:text-white underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-white italic">Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {!user ? (
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black italic text-purple-500">SUPACALL</h1>
          <button onClick={handleLogin} className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all">
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-purple-500/50 p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back,</h2>
          <p className="text-purple-400 font-mono mb-8">{user.email}</p>
          <button className="bg-purple-600 p-4 rounded-xl font-bold w-full">🚀 Start New Call</button>
        </div>
      )}
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
    <div className="flex min-h-screen items-center justify-center bg-black text-white italic">
      SupaCall Loading...
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {!user ? (
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black italic tracking-tighter text-purple-500">SUPACALL</h1>
          <p className="text-gray-400">Secure video calling for the next generation.</p>
          <button
            onClick={handleLogin}
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-purple-500/50 p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back,</h2>
          <p className="text-purple-400 font-mono mb-8">{user.email}</p>
          <div className="grid grid-cols-1 gap-4">
            <button className="bg-purple-600 p-4 rounded-xl font-bold hover:bg-purple-700 transition-colors">
              🚀 Start New Call
            </button>
            <button 
              onClick={handleLogout}
              className="text-zinc-500 text-sm hover:text-white underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize the browser-specific client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-white italic">SupaCall Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 text-center">
      {!user ? (
        <div className="space-y-6">
          <h1 className="text-6xl font-black italic tracking-tighter text-purple-500">SUPACALL</h1>
          <p className="text-gray-400 max-w-sm">Secure, instant video calling powered by Next.js 16.</p>
          <button
            onClick={handleLogin}
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-purple-500/50 p-10 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Welcome Back,</h2>
          <p className="text-purple-400 font-mono mb-8">{user.email}</p>
          <div className="grid grid-cols-1 gap-4">
            <button className="bg-purple-600 p-4 rounded-xl font-bold hover:bg-purple-700 transition-colors">
              🚀 Start New Call
            </button>
            <button 
              onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
              className="text-zinc-500 text-sm hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
"use client";

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
        // This ensures Google sends you back to your site
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear local state
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-white">Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      {/* 1. LOGGED OUT STATE */}
      {!user ? (
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-2xl border border-gray-800 text-center shadow-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight">SupaCall <span className="text-purple-500">v2</span></h1>
          <p className="text-gray-400">Secure video calling for the next generation.</p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        /* 2. LOGGED IN DASHBOARD (The "Post-Login" Screen) */
        <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-900 rounded-3xl border border-purple-500/30 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-purple-400 text-sm font-medium">{user.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-white underline"
            >
              Sign Out
            </button>
          </div>

          {/* Interface Preview Area */}
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

"use client";

import { createClient } from "../utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}


"use client";
import { createClient } from "../utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">SupaCall v2</h1>
        <button
          onClick={handleGoogleLogin}
          className="rounded-lg bg-white text-black px-8 py-4 font-semibold hover:bg-gray-200 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}

