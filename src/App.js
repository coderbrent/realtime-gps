import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from './views/dashboard';

function App() {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = ({ data }) => {
      setMsg(data);
    };
  }, []);

  return (
    <>
    <div className="App">
      <div>{msg}</div>
      <Dashboard />
    </div>
    </>
  );
}

export default App;
