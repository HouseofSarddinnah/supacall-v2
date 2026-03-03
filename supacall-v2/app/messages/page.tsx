"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Messages() {
  const [selected, setSelected] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();


  useEffect(() => {
    let subscription: any;
    async function fetchMessages() {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("id, contact_id, text, created_at")
        .order("created_at", { ascending: false });
      if (data) setMessages(data);
      setLoading(false);
    }
    fetchMessages();

    // Real-time subscription
    subscription = supabase
      .channel('messages-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setMessages((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setMessages((prev) => prev.map(m => m.id === payload.new.id ? payload.new : m));
        } else if (payload.eventType === 'DELETE') {
          setMessages((prev) => prev.filter(m => m.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []);

  async function sendMessage() {
    if (selected === null || !input) return;
    setLoading(true);
    const contactId = messages[selected].contact_id;
    const { data, error } = await supabase
      .from("messages")
      .insert([{ contact_id: contactId, text: input }])
      .select();
    if (data) setMessages([data[0], ...messages]);
    setInput("");
    setLoading(false);
  }

  return (
    <main className="p-8 flex gap-8">
      <div className="w-80 bg-zinc-800 rounded-xl p-4">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <input
          type="text"
          placeholder="Search messages"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-900 text-white"
        />
        <div className="flex flex-col gap-2">
          {messages.map((m, i) => (
            <div key={m.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${selected === i ? "bg-purple-600 text-white" : "bg-zinc-900 text-white"}`} onClick={() => setSelected(i)}>
              <div className="bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">C</div>
              <div className="flex-1">
                <div className="font-bold">Contact {m.contact_id}</div>
                <div className="text-xs text-gray-400">{m.text}</div>
              </div>
              <div className="text-xs text-gray-400">{new Date(m.created_at).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-zinc-800 rounded-xl flex flex-col items-center justify-center">
        {selected === null ? (
          <div className="text-gray-400 text-xl">Select a conversation</div>
        ) : (
          <div className="w-full p-8 flex flex-col gap-4">
            <div className="text-lg font-bold mb-2">Chat with Contact {messages[selected].contact_id}</div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="bg-zinc-700 text-white px-4 py-2 rounded-lg self-start">{messages[selected].text}</div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 text-white"
              />
              <button onClick={sendMessage} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold" disabled={loading}>Send</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
