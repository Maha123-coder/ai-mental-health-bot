import { useState, useEffect } from "react";

export default function MoodTracker() {
  const [mood, setMood] = useState('');
  const [history, setHistory] = useState([]);

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  useEffect(() => {
    if (mood) {
      setHistory((prev) => [...prev, { mood, time: new Date().toLocaleTimeString() }]);
    }
  }, [mood]);

  return (
    <div>
      <h2>Daily Mood Tracker</h2>
      <select onChange={handleMoodChange} value={mood}>
        <option value="">-- Choose Mood --</option>
        <option value="😊 Happy">😊 Happy</option>
        <option value="😞 Sad">😞 Sad</option>
        <option value="😠 Angry">😠 Angry</option>
        <option value="😐 Neutral">😐 Neutral</option>
      </select>
      <ul>
        {history.map((entry, i) => (
          <li key={i}>{entry.time} - {entry.mood}</li>
        ))}
      </ul>
    </div>
  );
}
