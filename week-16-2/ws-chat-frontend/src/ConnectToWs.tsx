import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RoomSelection } from "./Pages/RoomSelection";
import { ChatWindow } from "./Pages/ChatWindow";

export function ConnectToWS () {
    const [messages, setMessages] = useState<string[]>([]);
    const [usersCount, setUserCounts] = useState<number>(0);
    const [roomId, setRoomId] = useState<string>("");
    const wsRef = useRef<WebSocket>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080");
      wsRef.current = ws;
      ws.onopen = () => {
        navigate("/join-room");
      }
      ws.onmessage = (event) => {
        const parsedMessage = JSON.parse(event.data);
        if(parsedMessage.type === "join" && parsedMessage.payload.status === "failed"){
          alert(`Error: ${parsedMessage.payload.status}, Please generate room code first`)
          navigate("/join-room");
          return;
        } else if(parsedMessage.type === "join" && parsedMessage.payload.status === "success") {
          setRoomId(parsedMessage.payload.roomId);
          setUserCounts(parsedMessage.payload.userCount);
          navigate("/chat-room")
        }else if(parsedMessage.type === "create") {
          setRoomId(parsedMessage.roomId);
        } else if(parsedMessage.type === "chat" && parsedMessage.payload.newUserCount) {
          setUserCounts(parsedMessage.payload.newUserCount);
        } else {
          setMessages((prev) => [...prev, parsedMessage.message]);
        }
      }

      return () => {
        setRoomId("");
        setMessages([]);
        setUserCounts(0);
        ws.close();
      }
    }, []);
  
    return <Routes>
      <Route path="join-room" element={<RoomSelection wsReference={wsRef} roomId={roomId} />} />
      <Route path="chat-room" element={<ChatWindow messages={messages} wsReference={wsRef} userCount={usersCount} roomId={roomId} />} />
    </Routes>
  }
  