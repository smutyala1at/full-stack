import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface Message {
    type: "join" | "chat";
    payload: {
        roomId?: string;
        message?: string;
    }
}

// Map to store user connections with websockets as key and roomId as value
const userConnections = new Map<WebSocket, string>();

// Map to store room users with ID as key and Set of sockets as values
const roomUsers = new Map<string, Set<WebSocket>>();

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString()) as Message;

        if(parsedMessage.type === "join") {
            console.log("user joined the room " + parsedMessage.payload.roomId )
            // add user to userConnections Map
            const roomId = parsedMessage.payload.roomId as string;
            userConnections.set(socket, roomId);

            // add user to roomUsers map
            if(!roomUsers.has(roomId)){
                roomUsers.set(roomId, new Set());
            }
            roomUsers.get(roomId)?.add(socket);

            // send response to the user
            socket.send(JSON.stringify({
                type: "join",
                payload: {
                    status: "success"
                }
            }))
        }

        if(parsedMessage.type === "chat") {
            const message = parsedMessage.payload.message;

            // get user details
            const roomId = userConnections.get(socket);

            // now send the message to all the users of currentUser's room
            if(roomId) {
                const users = roomUsers.get(roomId);
                users?.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        message: message
                    }));
                })
            }
        }
    })

    socket.on("close", () => {
        // Remove user from userConnections map
        const roomId = userConnections.get(socket);
        userConnections.delete(socket);

        if(roomId) {
            const users = roomUsers.get(roomId);
            users?.delete(socket);

            // if the room is empty, remove it from roomUsers map
            if(users?.size === 0){
                roomUsers.delete(roomId);
            }
        }
    })
    
});