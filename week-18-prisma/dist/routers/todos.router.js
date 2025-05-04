"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const todos_services_1 = require("../services/todos.services");
const custom_errors_1 = require("../errors/custom.errors");
exports.todosRouter = (0, express_1.default)();
exports.todosRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, todos_services_1.addTodo)(Object.assign(Object.assign({}, req.body), { userId: req.userId }));
        res.status(201).json({
            message: "Todo created succesfully"
        });
        return;
    }
    catch (error) {
        if (error instanceof custom_errors_1.ValidationError) {
            res.status(422).json(error);
            return;
        }
        if (error instanceof custom_errors_1.DatabaseError) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
}));
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, todos_services_1.getTodos)(req.userId);
        res.status(200).json({
            todos
        });
        return;
    }
    catch (error) {
        if (error instanceof custom_errors_1.DatabaseError) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
}));
