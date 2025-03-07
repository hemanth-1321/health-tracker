import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🧠 Mental Health Advisor</h2>
      <textarea
        rows="4"
        placeholder="How are you feeling today?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%", padding: "10px" }}
      />
      <br />
      <button
        onClick={handleSendMessage}
        style={{ marginTop: "10px", padding: "10px" }}
      >
        Get Advice
      </button>
      <div style={{ marginTop: "20px", color: "green" }}>
        <strong>{response}</strong>
      </div>
    </div>
  );
}

export default App;
