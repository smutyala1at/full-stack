import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RoomSelection } from "./Pages/RoomSelection";
import { ChatWindow } from "./Pages/ChatWindow";

export function ConnectToWS () {
    const [messages, setMessages] = useState<string[]>([]);
    const wsRef = useRef<WebSocket>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080");
      wsRef.current = ws;
      ws.onopen = () => {
        console.log("after open")
        navigate("/join-room");
      }
      ws.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data);
  
        if(parsedMessage.type === "join" && parsedMessage.payload.status === "success"){
          navigate("/chat-room")
        } else {
          setMessages((prev) => [...prev, parsedMessage.message]);
        }
      }
    }, []);
  
    return <Routes>
      <Route path="join-room" element={<RoomSelection wsReference={wsRef} />} />
      <Route path="chat-room" element={<ChatWindow messages={messages} wsReference={wsRef} />} />
    </Routes>
  }
  