import { useEffect, useRef, useState } from "react";
import "./App.css";
import Receive from "./components/Receive";
import Send from "./components/Send";

const WEBSOCKET_ENDPOINT = process.env.REACT_APP_WEBSOCKET_ENDPOINT;

function App() {
  const socket = useRef<WebSocket>();
  const [connected, setConnected] = useState(false);
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    if (!WEBSOCKET_ENDPOINT) return;
    socket.current = new WebSocket(WEBSOCKET_ENDPOINT);

    socket.current.addEventListener("open", () => setConnected(true));
    return () => {
      if (socket.current) socket.current.close();
    };
  }, []);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.addEventListener("message", (event) => {
      setResponseData(event.data);
    });
  }, []);

  if (!socket.current || !connected) return null;

  return (
    <div className="App">
      <Send socket={socket.current} />
      <Receive data={responseData} />
    </div>
  );
}

export default App;
