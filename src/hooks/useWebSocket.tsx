import { connected } from "process";
import { useEffect, useRef, useState } from "react";
import { connect } from "../websocket";

const data = JSON.stringify({
  documentId: "document-id",
});

export const useAutosaveWS = () => {
  const [connected, setConnected] = useState(false);
  const socket = useRef<WebSocket>();

  console.log("here");

  useEffect(() => {
    socket.current = connect(data);

    return () => {
      socket.current?.close();
    };
  }, []);

  useEffect(() => {
    setConnected(!!socket.current);
  }, [socket.current?.readyState]);

  return { connected, socket: socket.current };
};
