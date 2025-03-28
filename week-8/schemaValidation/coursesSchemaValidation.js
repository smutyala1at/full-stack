const zod = require("zod");

const courseValidation = zod.object({
    title: zod
            .string({required_error: "Title is required",})
            .min(10, {message: "Course title must be at least 10 characters long"})
            .max(100, {message: "Course title length cannot exceed 100 characters"}),
    description: zod
                    .string({required_error: "Description is required",})
                    .min(40, {message: "Course title must be at least 40 characters long"})
                    .max(500, {message: "Course title length cannot exceed 500 characters"}),
    price: zod
            .number({required_error: "Price is required",})
            .refine(price => price > 0 && price < 99999, {message: "Please assign price between 0 and 99999"}),
    imageUrl: zod
            .string()
            .url()
})

const newCourseValidation = courseValidation.partial({
    imageUrl: true
}).strict({message: "Unknown parameters aren't allowed"})

const updateCourseValidation = courseValidation.extend({
    courseId: zod
                .string({required_error: "course id is required"})
}).partial({
    title: true,
    description: true,
    price: true,
    imageUrl: true
}).strict({message: "Unknown parameters aren't allowed"})



module.exports = {
    newCourseValidation,
    updateCourseValidation
}