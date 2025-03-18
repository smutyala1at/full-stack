import { useRef, useState } from "react"
import { ChatIcon } from "../components/icons/ChatIcon"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { SubTitle } from "../components/ui/SubTitle"
import { Title } from "../components/ui/Title"

export const RoomSelection = ({ wsReference }: { wsReference: React.MutableRefObject<WebSocket | null> }) => {
    const [roomDetails, setRoomDetails] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<string>(""); 
    const inputRoomRef = useRef<HTMLInputElement>(null);

    const createNewRoom = () => {
        const randomHash = Math.random().toString(36).substring(2, 8).toLocaleUpperCase();
        setRoomDetails(true);
        setRoomCode(randomHash);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomCode);
    }

    const handleJoinRoom = () => {
        if(wsReference.current) {
            console.log("clicked")
            console.log(inputRoomRef.current?.value)
            console.log("WebSocket is open:", wsReference.current.readyState === WebSocket.OPEN);
            wsReference.current.send(JSON.stringify({
                type: "join",
                payload: {
                    "roomId": inputRoomRef.current?.value
                }
            }))
        }
    }

    return <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-xl p-4 bg-black ring-2 ring-white/30 rounded-lg flex flex-col justify-between gap-4">
            <div className="flex flex-col">
                <div className="flex gap-2 place-items-center">
                    <ChatIcon />
                    <Title title="Real Time Chat" />
                </div>
                <SubTitle subtitle="temporary room that expires after both users exit"  />
            </div>

            <Button variant="primary" size="md" label="Create New Room" onClick={createNewRoom} />

            <div className="flex gap-2">
                <div className="flex-1">
                    <Input type="text" placeholder="Enter Room Code" reference={inputRoomRef} />
                </div>
                <Button variant="primary" size="md" label="Join Room" onClick={handleJoinRoom} />
            </div>

            { roomDetails && <Button variant="secondary" size="lg" label="Share this code with your friends" code={roomCode} onClick={copyToClipboard}  /> }
        </div>
    </div>
}