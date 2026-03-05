"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaPhoneAlt, FaPlus, FaEllipsisV } from "react-icons/fa";

type Contact = {
  id: number;
  name: string;
  number: string;
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchContacts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("id, name, number")
        .order("id", { ascending: false });
      if (data) setContacts(data as Contact[]);
      if (error) console.error("Error fetching:", error.message);
      setLoading(false);
    }
    fetchContacts();
  }, []);

  async function addContact() {
    if (newName && newNumber) {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ name: newName, number: newNumber }])
        .select();
      if (data) {
        setContacts([data[0], ...contacts]);
        setNewName("");
        setNewNumber("");
      }
      if (error) console.error("Error adding:", error.message);
      setLoading(false);
    }
  }

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8 max-w-4xl mx-auto min-h-screen text-white bg-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <button 
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-colors" 
          title="Add Contact" 
          onClick={addContact}
        >
          <FaPlus />
        </button>
      </div>

      <input
        type="text"
        placeholder="Search contacts"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-purple-500"
      />

      <div className="mb-8 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
        />
        <input
          type="text"
          placeholder="Number"
          value={newNumber}
          onChange={e => setNewNumber(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800"
        />
        <button 
          onClick={addContact} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50" 
          disabled={loading}
        >
          {loading ? "..." : "Add"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div key={c.id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 hover:bg-zinc-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl uppercase">
                  {c.name ? c.name[0] : "?"}
                </div>
                <div>
                  <div className="font-bold text-lg">{c.name}</div>
                  <div className="text-sm text-gray-500">{c.number}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-green-400 hover:text-green-300 p-2" title="Call"><FaPhoneAlt size={20} /></button>
                <button className="text-gray-500 hover:text-white p-2"><FaEllipsisV /></button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-10">
            {loading ? "Loading..." : "No contacts found."}
          </p>
        )}
      </div>
    </main>
  );
}
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("id, name, number")
        .order("created_at", { ascending: false });
      if (data) setContacts(data);
      setLoading(false);
    }
    fetchContacts();
  }, []);

  async function addContact() {
    if (newName && newNumber) {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ name: newName, number: newNumber }])
        .select();
      if (data) setContacts([data[0], ...contacts]);
      setNewName("");
      setNewNumber("");
      setLoading(false);
    }
  }

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // Return statement at top level of component
  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <button className="bg-orange-500 text-white rounded-full p-3" title="Add Contact" onClick={addContact}><FaPlus /></button>
      </div>
      <input
        type="text"
        placeholder="Search contacts"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-800 text-white"
      />
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="px-3 py-2 rounded-lg bg-zinc-800 text-white"
        />
        <input
          type="text"
          placeholder="Number"
          value={newNumber}
          onChange={e => setNewNumber(e.target.value)}
          className="px-3 py-2 rounded-lg bg-zinc-800 text-white"
        />
        <button onClick={addContact} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold" disabled={loading}>Add</button>
      </div>
      <div className="flex flex-col gap-3">
        {filtered.map((c, i) => (
          <div key={c.id} className="flex items-center justify-between bg-zinc-800 rounded-xl px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                {c.name.split(" ")[0][0]}
              </div>
              <div>
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-gray-400">{c.number}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-green-400 hover:text-green-600" title="Call"><FaPhoneAlt /></button>
              <button className="text-gray-400 hover:text-white"><FaEllipsisV /></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
