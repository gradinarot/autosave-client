import imageData from "../data/image";
import pencilData from "../data/pencil";
import shapesData from "../data/shapes";
import textHighlightData from "../data/text-highlight";
import textSelectData from "../data/text-select";
import textData from "../data/text";
import { useState } from "react";

function Send({ socket }: { socket: WebSocket }) {
  const [customData, setCustomData] = useState("");

  const handleSendData = (data: string) => {
    socket.send(data);
  };

  return (
    <div className="send">
      <button onClick={() => handleSendData(imageData)}>Send Image</button>
      <button onClick={() => handleSendData(pencilData)}>Send Pencil</button>
      <button onClick={() => handleSendData(shapesData)}>Send Shapes</button>
      <button onClick={() => handleSendData(textHighlightData)}>Send Text Highlight</button>
      <button onClick={() => handleSendData(textSelectData)}>Send Text Select</button>
      <button onClick={() => handleSendData(textData)}>Send Text</button>

      <textarea
        name="data"
        id="data"
        cols={30}
        rows={10}
        onChange={(event) => setCustomData(event?.target.value)}
      ></textarea>
      <button disabled={!customData} onClick={() => handleSendData(customData)}>
        Send Custom
      </button>
    </div>
  );
}

export default Send;
