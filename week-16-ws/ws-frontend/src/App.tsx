import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setSocket(ws);

      ws.onmessage = (ev: MessageEvent) => {
        alert(ev.data);
      }
    }
  }, []);

  function sendMessage() {
    console.log(inputRef.current);
    if(inputRef.current) {
      const message = inputRef.current?.value;
      socket?.send(message);
    }
  }

  return (
    <div>
      <input type="text" placeholder="Message..." ref={inputRef} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
