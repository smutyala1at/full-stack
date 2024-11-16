const zod = require("zod");

const purchaseSchemaValidation = zod.object({
    courseId: zod
                .string({required_error: "Course Id is required"}),
    purchased: zod  
                .boolean({required_error: "payment is required"})
}).strict({message: "Unknown parameters are not allowed"});


module.exports = {
    purchaseSchemaValidation
}