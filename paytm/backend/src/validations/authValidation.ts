import zod from "zod";

const signupValidation = zod.object({
    firstName: zod.string({ required_error: "First name is required" }).trim().min(3, { message: "First name must be at least 3 characters long" }).refine(val => val.trim()),
    lastName: zod.string({ required_error: "Last name is required" }).trim().min(3, { message: "Last name must be required" }),
    email: zod.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: zod.string({ required_error: "Password is required" }).trim().min(6, { message: "Password must be at least 6 characters long" })
}).strict({ message: "Invalid parameters" });


const signinValidation = zod.object({
    email: zod.string({ required_error: "Email is required" }).trim().email({ message: "Invalid email address" }),
    password: zod.string({ required_error: "Password is required" }).trim()
}).strict({ message: "Invalid parameters" });


export { signupValidation, signinValidation };