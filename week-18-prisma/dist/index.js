"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user.router");
const todos_router_1 = require("./routers/todos.router");
const authMiddleware_1 = require("./middlewares/authMiddleware");
exports.client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", user_router_1.userRouter);
app.use("/api/v1/todos", authMiddleware_1.authMiddleware, todos_router_1.todosRouter);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
app.listen(3000, () => {
    console.log("Server is running on the port 3000");
});
