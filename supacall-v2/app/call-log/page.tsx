
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function CallLog() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const supabase = createClient();
    let subscription: any;
    const fetchCalls = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("calls")
        .select("id, caller, callee, duration, created_at, status")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) {
        setError(error.message);
      } else {
        setCalls(data || []);
      }
      setLoading(false);
    };
    fetchCalls();

    // Real-time subscription
    subscription = supabase
      .channel('calls-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'calls',
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setCalls((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setCalls((prev) => prev.map(c => c.id === payload.new.id ? payload.new : c));
        } else if (payload.eventType === 'DELETE') {
          setCalls((prev) => prev.filter(c => c.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Call Log</h1>
      {loading ? (
        <p className="text-gray-400">Loading calls...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : calls.length === 0 ? (
        <p className="text-gray-400">No calls found.</p>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">Caller</th>
                <th className="py-2 px-4">Callee</th>
                <th className="py-2 px-4">Duration</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="py-2 px-4">{call.caller}</td>
                  <td className="py-2 px-4">{call.callee}</td>
                  <td className="py-2 px-4">{call.duration ? `${call.duration} sec` : "-"}</td>
                  <td className="py-2 px-4">{call.status}</td>
                  <td className="py-2 px-4">{new Date(call.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
