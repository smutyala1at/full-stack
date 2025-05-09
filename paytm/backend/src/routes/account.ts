import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { Account } from "../db/db";
import mongoose from "mongoose";
import { transferValidation } from "../validations/accountValidation";
import { formatErrors } from "../utils/utils";

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const account = await Account.findOne({
            userId: userId
        })

        return res.status(200).json({
            balance: account?.balance
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error while fetching the balance"
        });
    }
})


accountRouter.post("/transfer", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    
    const session: mongoose.ClientSession = await mongoose.startSession();

    try {
        const senderId = req.userId;
        const input = req.body;
        const { success, error } = transferValidation.safeParse(input);

        if(!success) {
            return res.status(400).json({
                errors: formatErrors(error)
            })
        }

        const { amount, toAccount } = input;

        session.startTransaction();

        // fetch the accounts in the transaction
        const senderAccount = await Account.findOne({
            userId: senderId
        }).session(session);

        if(!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const receiverAccount = await Account.findOne({
            userId: toAccount
        }).session(session);

        if(!receiverAccount) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Receiver account not found"
            })
        }

        // perform the transfer
        await Account.updateOne({ userId: senderId }, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        await Account.updateOne({ userId: toAccount }, {
            $inc: {
                balance: amount
            }
        }).session(session);


        // commit the transaction
        await session.commitTransaction();

        return res.status(200).json({
            message: "Transfer successful"
        })
    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({
            message: "Error while tranferring the money"
        })
    } finally {
        await session.endSession();
    }
})

export { accountRouter };

