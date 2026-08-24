import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function ApiTest() {
  const [message, setMessage] = React.useState("Loading...");
  const [status, setStatus] = React.useState("Connecting to Next.js API");

  async function loadMessage() {
    setStatus("Connecting to Next.js API");
    try {
      const response = await fetch("http://localhost:3000/api/hello");
      if (!response.ok) throw new Error("The API returned an error");
      const data = await response.json();
      setMessage(data.message);
      setStatus("API connected successfully");
    } catch (error) {
      setMessage("Unable to load message");
      setStatus(error.message);
    }
  }

  React.useEffect(() => { loadMessage(); }, []);

  return (
    <main>
      <section className="card">
        <div className="badge">/test_api</div>
        <p className="label">Next.js Hello API response</p>
        <h1>{message}</h1>
        <p className="status"><span />{status}</p>
        <button onClick={loadMessage}>Test API again</button>
      </section>
    </main>
  );
}

function App() {
  return window.location.pathname === "/test_api" ? <ApiTest /> : (
    <main><section className="card"><h1>React API Client</h1><a href="/test_api">Open /test_api</a></section></main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
