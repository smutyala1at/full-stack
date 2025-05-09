"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const account_1 = require("./account");
const rootRouter = (0, express_1.default)();
exports.rootRouter = rootRouter;
rootRouter.use("/user", user_1.userRouter);
rootRouter.use("/account", account_1.accountRouter);
