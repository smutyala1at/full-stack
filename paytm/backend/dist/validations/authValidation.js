"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const signupValidation = zod_1.default.object({
    firstName: zod_1.default.string({ required_error: "First name is required" }).trim().min(3, { message: "First name must be at least 3 characters long" }).refine(val => val.trim()),
    lastName: zod_1.default.string({ required_error: "Last name is required" }).trim().min(3, { message: "Last name must be required" }),
    email: zod_1.default.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: zod_1.default.string({ required_error: "Password is required" }).trim().min(6, { message: "Password must be at least 6 characters long" })
}).strict({ message: "Invalid parameters" });
exports.signupValidation = signupValidation;
const signinValidation = zod_1.default.object({
    email: zod_1.default.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: zod_1.default.string({ required_error: "Password is required" }).trim()
}).strict({ message: "Invalid parameters" });
exports.signinValidation = signinValidation;
