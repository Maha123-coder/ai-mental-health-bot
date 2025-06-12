import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setReply("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply || "No reply");
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>🧠 AI Mental Health Chatbot</h1>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "1.5rem" }}>
        Helping you track moods and improve well-being.
      </p>

      <textarea
        rows="4"
        placeholder="How are you feeling today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f9f9f9",
          }}
        >
          <strong>AI Response:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

 
  