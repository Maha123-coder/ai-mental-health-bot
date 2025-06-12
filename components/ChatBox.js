// components/ChatBox.js
import { useState } from 'react';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleSend = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mental Health Chatbot</h2>
      <textarea
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your thoughts here..."
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleSend}>Send</button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-line' }}>
        <strong>AI Response:</strong>
        <p>{reply}</p>
      </div>
    </div>
  );
}
