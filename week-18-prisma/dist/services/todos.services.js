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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.addTodo = void 0;
const __1 = require("..");
const custom_errors_1 = require("../errors/custom.errors");
const todos_validations_1 = require("../validations/todos.validations");
const addTodo = (todo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, userId } = todo;
        const { success, error } = todos_validations_1.addtodoValidation.safeParse({ title, description });
        if (error) {
            const errors = error.errors.map((err) => ({ path: err.path[0], message: err.message }));
            throw new custom_errors_1.ValidationError(errors);
        }
        yield __1.client.todo.create({
            data: {
                title,
                description,
                done: false,
                userId
            }
        });
        return;
    }
    catch (error) {
        if (error instanceof custom_errors_1.ValidationError) {
            throw error;
        }
        throw new custom_errors_1.DatabaseError("Failed to add todo");
    }
});
exports.addTodo = addTodo;
const getTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield __1.client.todo.findMany({
            where: {
                userId: userId
            }
        });
        return todos;
    }
    catch (error) {
        throw new custom_errors_1.DatabaseError("Failed to get todos");
    }
});
exports.getTodos = getTodos;
