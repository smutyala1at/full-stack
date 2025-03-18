"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// Map to store user connections with websockets as key and roomId as value
const userConnections = new Map();
// Map to store room users with ID as key and Set of sockets as values
const roomUsers = new Map();
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            console.log("user joined the room " + parsedMessage.payload.roomId);
            // add user to userConnections Map
            const roomId = parsedMessage.payload.roomId;
            userConnections.set(socket, roomId);
            // add user to roomUsers map
            if (!roomUsers.has(roomId)) {
                roomUsers.set(roomId, new Set());
            }
            (_a = roomUsers.get(roomId)) === null || _a === void 0 ? void 0 : _a.add(socket);
            // send response to the user
            socket.send(JSON.stringify({
                type: "join",
                payload: {
                    status: "success"
                }
            }));
        }
        if (parsedMessage.type === "chat") {
            const message = parsedMessage.payload.message;
            // get user details
            const roomId = userConnections.get(socket);
            // now send the message to all the users of currentUser's room
            if (roomId) {
                const users = roomUsers.get(roomId);
                users === null || users === void 0 ? void 0 : users.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        message: message
                    }));
                });
            }
        }
    });
    socket.on("close", () => {
        // Remove user from userConnections map
        const roomId = userConnections.get(socket);
        userConnections.delete(socket);
        if (roomId) {
            const users = roomUsers.get(roomId);
            users === null || users === void 0 ? void 0 : users.delete(socket);
            // if the room is empty, remove it from roomUsers map
            if ((users === null || users === void 0 ? void 0 : users.size) === 0) {
                roomUsers.delete(roomId);
            }
        }
    });
});
