"use client";
import { useState } from 'react';

export default function Home() {
  const [msg, setMsg] = useState('');
  const [reply, setReply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setReply(data.reply ?? 'Error occurred');
  };

  return (
    <div>
      <h1>Mental‑health Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="How are you feeling today?"
        />
        <button type="submit">Send</button>
      </form>
      {reply && (
        <div>
          <h2>Assistant:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
