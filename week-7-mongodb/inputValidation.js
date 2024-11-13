const zod = require("zod");

const signupSchema = zod.object({
    name: zod.string().min(3, {message: "name should be at least 3 characters long"}).max(100, {message: "name cannot be over 100 characters long"}),
    email: zod.string().email().min(7, {message: "email should be at least 7 characters long"}).max(100, {message: "email cannot be over 100 characters long"}),
    password: zod.string().min(8, {message: "password should be at least 8 characters long"}).max(100, {message: "password cannot be over 100 characters long"}),
}).strict()


module.exports = {
    signupSchema
}