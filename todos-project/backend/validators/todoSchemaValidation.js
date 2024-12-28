const zod = require("zod");

const addTodoValidation = zod.object({
    title: zod
            .string()
            .nonempty({message: "Title cannot be empty"})
            .min(3, {message: "Title must be at least 3 characters"}),
    description: zod
            .string()
            .nonempty({message: "Description cannot be empty"})
            .min(3, {message: "Description must be at least 3 characters"})
})


const updateTodoValidation = addTodoValidation.extend({
    completed: zod
                .boolean()
                .optional()
}).partial({
    title: true,
    description: true
})

module.exports = {
    addTodoValidation,
    updateTodoValidation
}