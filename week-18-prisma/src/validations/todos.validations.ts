import { z } from "zod";


export const addtodoValidation = z.object({
    title: z.string({required_error: "Title is required"})
            .nonempty({message: "Title cannot be empty"})
            .min(10, {message: "Title must be at least 10 characters long"}),
    description: z.string({required_error: "Description is required"})
                  .nonempty({message: "Description cannot be empty"})
                  .min(10, {message: "Description must be at least 10 characters long"}),
    done: z.boolean().optional()
}).strict({message: "Unknown parameter has been passed"})


export const updateTodoValidation = addtodoValidation.partial({
    title: true,
    description: true,
}).extend({
    id: z.number({required_error: "Id is required"})
         .positive()
})

.strict({message: "Unknown parameter has been passed"})