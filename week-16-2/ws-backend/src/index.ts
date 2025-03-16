import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket: WebSocket) => {
    allSockets.push(socket);
    userCount += 1;

    socket.on("message", (message: MessageEvent) => {
        allSockets.forEach((s) => {
            s.send(`Message: ${message.toString()} from User ${userCount}`);
        })
    })
    
});