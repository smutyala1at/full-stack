"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// Map to store user connections with websockets as key and roomId as value
const userConnections = new Map();
// Map to store room users with ID as key and Set of sockets as values
const roomUsers = new Map();
<<<<<<< HEAD
=======
const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toLocaleUpperCase();
};
>>>>>>> cd2143654a25a1f4a68dfb5a447dcf315537f7d6
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsedMessage = JSON.parse(message.toString());
<<<<<<< HEAD
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
=======
        // create a roomId, save it into roomUsers with roomId and empty set, return the roomId
        if (parsedMessage.type === "create") {
            let roomId = generateRoomId();
            if (roomUsers.has(roomId)) {
                roomId = generateRoomId();
            }
            roomUsers.set(roomId, new Set());
            socket.send(JSON.stringify({
                type: "create",
                roomId: roomId
>>>>>>> cd2143654a25a1f4a68dfb5a447dcf315537f7d6
            }));
        }
        // if roomId exists, add the user into userConnections(userSocket, roomId) also add the user into roomUsers, finally return the status!
        if (parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId;
            if (!roomUsers.has(roomId)) {
                socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        status: "failed"
                    }
                }));
                return;
            }
            else {
                // add user to userConnections and userRooms
                userConnections.set(socket, roomId);
                (_a = roomUsers.get(roomId)) === null || _a === void 0 ? void 0 : _a.add(socket);
                // send success status to the user who joined! and send updatedUserCount to all the other users who are in the chat already
                const users = roomUsers.get(roomId);
                const userCount = users === null || users === void 0 ? void 0 : users.size;
                users === null || users === void 0 ? void 0 : users.forEach((userSocket) => {
                    if (userSocket === socket) {
                        // send succes status to frontend
                        socket.send(JSON.stringify({
                            type: "join",
                            payload: {
                                status: "success",
                                roomId: roomId,
                                userCount: userCount
                            }
                        }));
                    }
                    else {
                        userSocket.send(JSON.stringify({
                            type: "chat",
                            payload: {
                                newUserCount: userCount
                            }
                        }));
                    }
                });
            }
        }
        // on new messages from a user, send the messages to all the users
        if (parsedMessage.type === "chat") {
            const message = parsedMessage.payload.message;
            // get user details
            const roomId = userConnections.get(socket);
            // now send the message to all the users of currentUser's room
            if (roomId) {
                const users = roomUsers.get(roomId);
<<<<<<< HEAD
                users === null || users === void 0 ? void 0 : users.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        message: message
=======
                const userCount = users === null || users === void 0 ? void 0 : users.size;
                users === null || users === void 0 ? void 0 : users.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        message: message,
>>>>>>> cd2143654a25a1f4a68dfb5a447dcf315537f7d6
                    }));
                });
            }
        }
    });
    socket.on("close", () => {
<<<<<<< HEAD
        // Remove user from userConnections map
=======
        // Remove user from userConnections and roomUsers
>>>>>>> cd2143654a25a1f4a68dfb5a447dcf315537f7d6
        const roomId = userConnections.get(socket);
        userConnections.delete(socket);
        if (roomId) {
            const users = roomUsers.get(roomId);
            users === null || users === void 0 ? void 0 : users.delete(socket);
<<<<<<< HEAD
            // if the room is empty, remove it from roomUsers map
            if ((users === null || users === void 0 ? void 0 : users.size) === 0) {
                roomUsers.delete(roomId);
            }
=======
            // if the room is empty, remove it from roomUsers map, else send all the users with updatedUserCount
            if ((users === null || users === void 0 ? void 0 : users.size) === 0) {
                roomUsers.delete(roomId);
            }
            else if (users) {
                users === null || users === void 0 ? void 0 : users.forEach((userSocket) => {
                    userSocket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            newUserCount: users.size
                        }
                    }));
                });
            }
>>>>>>> cd2143654a25a1f4a68dfb5a447dcf315537f7d6
        }
    });
});
