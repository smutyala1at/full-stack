import mongoose from "mongoose";
import zod from "zod";


const transferValidation = zod.object({
    amount: zod.number({ required_error: "Transfer amount is required" }).positive({ message: "Transfer amount must be positive" }),
    toAccount: zod.string({ required_error: "toAccount is required" }).refine( val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId format"
    })
}).strict({ message: "Invalid parameters" });

export { transferValidation };