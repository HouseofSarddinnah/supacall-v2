"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { FaPhoneAlt, FaPlus, FaEllipsisV } from "react-icons/fa";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchContacts() {
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
