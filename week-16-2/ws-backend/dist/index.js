"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userConnections = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            console.log("user joined the room " + parsedMessage.payload.roomId);
            userConnections.push({ socket: socket, room: parsedMessage.payload.roomId });
        }
        if (parsedMessage.type === "chat") {
            const message = parsedMessage.payload.message;
            // get user details
            const currentUser = userConnections.find((user) => user.socket === socket);
            // now send the message to all the users of currentUser's room
            userConnections.forEach((con) => {
                if (con.room === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.room)) {
                    con.socket.send(`New Message: ${message}`);
                }
            });
        }
    });
});
