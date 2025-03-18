import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Message } from "../components/ui/Message"
import { ChatIcon } from "../components/icons/ChatIcon"
import { Title } from "../components/ui/Title"
import { SubTitle } from "../components/ui/SubTitle"

export const ChatWindow = ({ messages, wsReference }: { messages: string[], wsReference: React.MutableRefObject<WebSocket | null> }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        const message = inputRef.current?.value;

        if(message === "") return;

        wsReference?.current?.send(JSON.stringify({
            type: "chat",
            payload: {
                message: message
            }
        }))
        
        if(inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return <div className="bg-black flex justify-center items-center min-h-screen">
        <div className="w-xl p-5 bg-black ring-2 ring-white/30 rounded-lg flex flex-col gap-5">
            <div className="flex flex-col">
                <div className="flex gap-2 place-items-center">
                    <ChatIcon />
                    <Title title="Real Time Chat" />
                </div>
                <SubTitle subtitle="temporary room that expires after both users exit"  />
            </div>
            
            <div className="w-full h-[60vh] ring-1 ring-white/30 rounded-lg p-2">
                <div className="flex flex-col gap-2">
                    {
                        messages.map((message, index) => {
                            return <Message message={message} key={index} />
                        })
                    }
                </div>
            </div>

            <div className="flex gap-2">
                <Input type="text" placeholder="Message" reference={inputRef} />
                <Button variant="primary" size="md" label="Send" onClick={handleClick} />
            </div>
        </div>
    </div>
}