"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSignupSchema = void 0;
const zod_1 = require("zod");
exports.userSignupSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email field is required" })
        .nonempty({ message: "Email field cannot be empty" })
        .email({ message: "Invalid email address" }),
    password: zod_1.z.string({ required_error: "Password field is required" })
        .nonempty({ message: "Password field cannot be empty" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine((val) => /[A-Z]/.test(val), { message: "Password must contain at least one uppercase letter" })
        .refine((val) => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" })
        .refine((val) => /[0-9]/.test(val), { message: "Password must contain at least one number" })
        .refine((val) => /[^\w\s]/.test(val), { message: "Password must contain at least one special character" })
}).strict({ message: "Unknown parameter has been passed" });
exports.userLoginSchema = zod_1.z.object({
    email: exports.userSignupSchema.shape.email,
    password: zod_1.z.string({ required_error: "Password field is required" })
        .nonempty({ message: "Password field cannot be empty" })
});
