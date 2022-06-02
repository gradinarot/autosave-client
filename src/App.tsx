import { useEffect, useState } from "react";
import "./App.css";
import Receive from "./components/Receive";
import Send from "./components/Send";
import { useAutosaveWS } from "./hooks/useWebSocket";

function App() {
  const { socket, connected } = useAutosaveWS();
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener("message", (event) => {
      setResponseData(event.data);
    });
  }, [socket]);

  if (!socket || !connected) return null;

  return (
    <div className="App">
      <Send socket={socket} />
      <Receive data={responseData} />
    </div>
  );
}

export default App;
