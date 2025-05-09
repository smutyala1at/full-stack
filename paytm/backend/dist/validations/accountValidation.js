"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const transferValidation = zod_1.default.object({
    amount: zod_1.default.number({ required_error: "Transfer amount is required" }).positive({ message: "Transfer amount must be positive" }),
    toAccount: zod_1.default.string({ required_error: "toAccount is required" }).refine(val => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId format"
    })
}).strict({ message: "Invalid parameters" });
exports.transferValidation = transferValidation;
