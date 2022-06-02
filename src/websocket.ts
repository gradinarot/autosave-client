const WEBSOCKET_ENDPOINT = process.env.REACT_APP_WEBSOCKET_ENDPOINT;

const MAX_RETRIES = 20

let ws: WebSocket
let totalRetries = 0

export const connect = (data: string) => {
  if (ws) return ws

  ws = new WebSocket(WEBSOCKET_ENDPOINT || 'ws://localhost:8080/autosave');

  // ws.onopen = function() {
  //   console.log("autosave websocket open")
  // }

  ws.onclose = function(event: CloseEvent) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', event.reason);
    setTimeout(function() {
      if(totalRetries < MAX_RETRIES) {
        connect(data);
      }
      totalRetries++
    }, 3);
  };


  return ws;
}
