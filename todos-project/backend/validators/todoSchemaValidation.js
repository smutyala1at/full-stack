const zod = require("zod");

const addTodoValidation = zod.object({
    title: zod
            .string()
            .nonempty({message: "Title cannot be empty"})
            .min(3, {message: "Title must be at least 3 characters"}),
    
})