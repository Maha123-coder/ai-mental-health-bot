import { useState, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setBotResponse("Thank you for sharing. I'm here to help.");
    setInput('');
  };

  useEffect(() => {
    if (botResponse) {
      setMessages((prev) => [...prev, { sender: "Bot", text: botResponse }]);
    }
  }, [botResponse]);

  return (
    <div>
      <h2>Mental Health Chatbot</h2>
      <div style={{ border: '1px solid #ccc', height: '200px', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.sender}:</b> {msg.text}</p>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type how you feel..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
