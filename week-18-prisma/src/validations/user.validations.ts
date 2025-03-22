import { z } from 'zod';

export const userSignupSchema = z.object({
    email: z.string({required_error: "Email field is required"})
            .nonempty({message: "Email field cannot be empty"})
            .email({message: "Invalid email address"}),
    password: z.string({required_error: "Password field is required"})
                .nonempty({message: "Password field cannot be empty"})
                .min(8, {message: "Password must be at least 8 characters long"})
                .refine((val) => /[A-Z]/.test(val), {message: "Password must contain at least one uppercase letter"})
                .refine((val) => /[a-z]/.test(val), {message: "Password must contain at least one lowercase letter"})
                .refine((val) => /[0-9]/.test(val), {message: "Password must contain at least one number"})
                .refine((val) => /[^\w\s]/.test(val), {message: "Password must contain at least one special character"})
}).strict({message: "Unknown parameter has been passed"});

export const userLoginSchema = z.object({
    email: userSignupSchema.shape.email,
    password: z.string({required_error: "Password field is required"})
                .nonempty({message: "Password field cannot be empty"})
})