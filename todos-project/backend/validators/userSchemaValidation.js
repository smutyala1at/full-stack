const zod = require("zod");

const userSignupValidation = zod.object({
    firstName: zod
                 .string()
                 .nonempty({message: "First name cannot be empty"}),
    lastName: zod
                .string()
                .nonempty({message: "Last name cannot be empty"}),
    email: zod
            .string({required_error: "Email is required"})
            .email({message: "Invalid email address"}),
    password: zod
                .string()
                .min(6, {message: "Password must be at least 6 characters"})
                .refine(password => /[A-Z]/.test(password), {message: "Password must have at least one uppercase letter"})
                .refine(password => /[a-z]/.test(password), {message: "Password must have at least one lowercase letter"})
                .refine(password => /[0-9]/.test(password), {message: "Password must have at least one number"})
                .refine(password => /[^\w\s]/.test(password), {message: "Password must have at least one special character"})
}).strict({message: "Unknown parameters have been passed"})


const userSigninValidation = zod.partial({
    firstName: true,
    lastName: true
}).strict({message: "Unknown parameters have been passed"})


module.exports = {
    userSignupValidation,
    userSigninValidation
}