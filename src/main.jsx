import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const API = "http://localhost:3000";
const getCookie = () => document.cookie.split("; ").find((item) => item.startsWith("csx4107_auth=")) || "No csx4107_auth cookie";
function App() {
  const [email, setEmail] = React.useState("student@csx4107.local"), [password, setPassword] = React.useState("nextjs3"), [status, setStatus] = React.useState("Not authenticated"), [cookie, setCookie] = React.useState(getCookie()), [loggedIn, setLoggedIn] = React.useState(false);
  async function login(event) { event.preventDefault(); setStatus("Checking credentials…"); const response = await fetch(`${API}/api/auth/login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await response.json(); setLoggedIn(Boolean(data.authenticated)); setStatus(data.message); setCookie(getCookie()); }
  async function logout() { const response = await fetch(`${API}/api/auth/logout`, { method: "POST", credentials: "include" }); const data = await response.json(); setLoggedIn(false); setStatus(data.message); setCookie(getCookie()); }
  return <main><section className="card"><p className="eyebrow">CSX4107 • Authentication assignment</p><h1>{loggedIn ? "Authenticated" : "Sign in"}</h1><p className={`status ${loggedIn ? "ok" : ""}`}>{status}</p>{!loggedIn ? <form onSubmit={login}><label>Email<input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required /></label><label>Password<input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required /></label><button type="submit">Log in</button></form> : <button onClick={logout}>Log out</button>}<section className="cookie-proof"><h2>Authentication cookie proof</h2><code>{cookie}</code><p>After logout this value is removed, as required.</p></section><p className="hint">Demo login: student@csx4107.local / nextjs3</p></section></main>;
}
createRoot(document.getElementById("root")).render(<App />);
