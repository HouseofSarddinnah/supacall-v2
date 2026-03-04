"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

const CREDIT_AMOUNTS = [5, 10, 15, 20, 25, 30];

export default function Credit() {
  const [balance, setBalance] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCredits() {
      setLoading(true);
      const { data, error } = await supabase
        .from("credits")
        .select("balance")
        .single();
      if (data) setBalance(data.balance);
      setLoading(false);
    }
    fetchCredits();
  }, []);

  async function purchaseCredits() {
    if (!selected) return;
    setLoading(true);
    // Simulate purchase by incrementing balance
    const { error } = await supabase
      .from("credits")
      .update({ balance: (balance ?? 0) + selected })
      .eq("id", 1); // Replace with user's credit row id
    if (!error) setBalance((balance ?? 0) + selected);
    setLoading(false);
    setSelected(null);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Credits</h1>
      <div className="mb-6">
        <div className="bg-zinc-800 rounded-xl p-6 flex items-center justify-between">
          <span className="font-bold text-lg">Balance</span>
          <span className="bg-white text-black px-4 py-2 rounded-xl font-bold">{loading ? "..." : `$${balance ?? 0}`}</span>
        </div>
      </div>
      <div className="mb-6 flex gap-2">
        {CREDIT_AMOUNTS.map(v => (
          <button key={v} onClick={() => setSelected(v)} className={`px-4 py-2 rounded-full font-bold ${selected === v ? "bg-purple-600 text-white" : "bg-zinc-800 text-white"}`}>${v}</button>
        ))}
      </div>
      <button
        onClick={purchaseCredits}
        disabled={!selected || loading}
        className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold mb-6 disabled:opacity-50"
      >
        {loading ? "Processing..." : `Buy $${selected ?? ""} Credits`}
      </button>
      <div className="mb-6 bg-zinc-800 rounded-xl p-6">
        <div className="font-bold mb-2">Stablecoin Balance</div>
        <div className="flex gap-6">
          <div className="bg-green-100 text-black px-6 py-4 rounded-xl">USDC<br /><span className="font-bold text-2xl">8.17</span></div>
          <div className="bg-blue-100 text-black px-6 py-4 rounded-xl">USDT<br /><span className="font-bold text-2xl">5.44</span></div>
        </div>
      </div>
      <div className="mb-6 bg-zinc-800 rounded-xl p-6">
        <div className="font-bold mb-2">Conversion Rate</div>
        <div className="flex gap-4 items-center">
          <span className="bg-white text-black px-4 py-2 rounded-xl font-bold">$1.00 USD</span>
          <span className="text-purple-400">→</span>
          <span className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold">6.67 Credits</span>
        </div>
        <div className="text-xs text-gray-400 mt-2">1 Credit = 1 Minute of calling</div>
      </div>
      <div className="mb-6 bg-zinc-800 rounded-xl p-6">
        <div className="font-bold mb-2">Feature Access</div>
        <div className="text-gray-400">All features enabled</div>
      </div>
      <div className="bg-zinc-800 rounded-xl p-6">
        <div className="font-bold mb-2">Transaction Ledger</div>
        <div className="text-gray-400">No recent transactions.</div>
      </div>
    </main>
  );
}
