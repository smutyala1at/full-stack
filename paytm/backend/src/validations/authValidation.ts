import zod from "zod";

const signupValidation = zod.object({
    firstName: zod.string().trim().nonempty
    ({ message: "First name is required" }).min(3, { message: "First name must be at least 3 characters long" }),
    lastName: zod.string().trim().nonempty
    ({ message: "Last name is required" }).min(3, { message: "Last name must be at least 3 characters" }),
    email: zod.string().trim().nonempty
    ({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod.string().trim().nonempty
    ({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" })
}).strict({ message: "Invalid parameters" });


const signinValidation = zod.object({
    email: zod.string().trim().nonempty
    ({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod.string().trim().nonempty
    ({ message: "Password is required" })
}).strict({ message: "Invalid parameters" });


export { signupValidation, signinValidation };