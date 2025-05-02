"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addtodoValidation = void 0;
const zod_1 = require("zod");
exports.addtodoValidation = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Title is required" })
        .nonempty({ message: "Title cannot be empty" })
        .min(10, { message: "Title must be at least 10 characters long" }),
    description: zod_1.z.string({ required_error: "Description is required" })
        .nonempty({ message: "Description cannot be empty" })
        .min(10, { message: "Description must be at least 10 characters long" }),
    done: zod_1.z.boolean().optional()
});
