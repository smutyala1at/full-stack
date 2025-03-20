import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface Message {
    type: "join" | "chat" | "create";
    payload: {
        roomId?: string;
        message?: string;
    }
}

// Map to store user connections with websockets as key and roomId as value
const userConnections = new Map<WebSocket, string>();

// Map to store room users with ID as key and Set of sockets as values
const roomUsers = new Map<string, Set<WebSocket>>();

const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toLocaleUpperCase();
}

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString()) as Message;

        // create a roomId, save it into roomUsers with roomId and empty set, return the roomId
        if(parsedMessage.type === "create") {
            let roomId = generateRoomId();
            
            if(roomUsers.has(roomId)){
                roomId = generateRoomId();
            }

            roomUsers.set(roomId, new Set());

            socket.send(JSON.stringify({
                type: "create",
                roomId: roomId
            }))
        }

        // if roomId exists, add the user into userConnections(userSocket, roomId) also add the user into roomUsers, finally return the status!
        if(parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId as string;

            if(!roomUsers.has(roomId)){
                socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        status: "failed"
                    }
                }))
                return;
            } else {
                // add user to userConnections and userRooms
                userConnections.set(socket, roomId);
                roomUsers.get(roomId)?.add(socket);


                // send success status to the user who joined! and send updatedUserCount to all the other users who are in the chat already
                const users = roomUsers.get(roomId);
                const userCount = users?.size;

                users?.forEach((userSocket) => {

                    if(userSocket === socket){
                        // send succes status to frontend
                        socket.send(JSON.stringify({
                            type: "join",
                            payload: {
                                status: "success",
                                roomId: roomId,
                                userCount: userCount
                            }
                        }))
                    }

                    else {
                        userSocket.send(JSON.stringify({
                            type: "chat",
                            payload: {
                                newUserCount: userCount
                            }
                        }))
                    }
                })
            }
        }

        // on new messages from a user, send the messages to all the users
        if(parsedMessage.type === "chat") {
            const message = parsedMessage.payload.message;

            // get user details
            const roomId = userConnections.get(socket);

            // now send the message to all the users of currentUser's room
            if(roomId) {
                const users = roomUsers.get(roomId);
                const userCount = users?.size;

                users?.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        message: message,
                    }));
                })
            }
        }
    })

    socket.on("close", () => {
        // Remove user from userConnections and roomUsers
        const roomId = userConnections.get(socket);
        userConnections.delete(socket);

        if(roomId) {
            const users = roomUsers.get(roomId);
            users?.delete(socket);

            // if the room is empty, remove it from roomUsers map, else send all the users with updatedUserCount
            if(users?.size === 0){
                roomUsers.delete(roomId);
            } else if(users){
                users?.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            newUserCount: users.size
                        }
                    }))
                })
            }
        }
    })
    
});