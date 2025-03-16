import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

interface Message {
    type: "join" | "chat";
    payload: {
        roomId?: string;
        message?: string;
    }
}

let userConnections: User[] = [];

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString()) as Message;

        if(parsedMessage.type === "join") {
            console.log("user joined the room " + parsedMessage.payload.roomId )
            userConnections.push({ socket: socket, room: parsedMessage.payload.roomId as string })
        }

        if(parsedMessage.type === "chat") {
            const message = parsedMessage.payload.message;

            // get user details
            const currentUser = userConnections.find((user) => user.socket === socket );

            // now send the message to all the users of currentUser's room
            userConnections.forEach((con) => {
                if(con.room === currentUser?.room) {
                    con.socket.send(`New Message: ${message}`);
                }
            })
        }
    })
    
});