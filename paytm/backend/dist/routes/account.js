"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const db_1 = require("../db/db");
const mongoose_1 = __importDefault(require("mongoose"));
const accountValidation_1 = require("../validations/accountValidation");
const utils_1 = require("../utils/utils");
const accountRouter = (0, express_1.Router)();
exports.accountRouter = accountRouter;
accountRouter.get("/balance", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const account = yield db_1.Account.findOne({
            userId: userId
        });
        return res.status(200).json({
            balance: account === null || account === void 0 ? void 0 : account.balance
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error while fetching the balance"
        });
    }
}));
accountRouter.post("/transfer", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        const senderId = req.userId;
        const input = req.body;
        const { success, error } = accountValidation_1.transferValidation.safeParse(input);
        if (!success) {
            return res.status(400).json({
                errors: (0, utils_1.formatErrors)(error)
            });
        }
        const { amount, toAccount } = input;
        session.startTransaction();
        // fetch the accounts in the transaction
        const senderAccount = yield db_1.Account.findOne({
            userId: senderId
        }).session(session);
        if (!senderAccount || senderAccount.balance < amount) {
            yield session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        const receiverAccount = yield db_1.Account.findOne({
            userId: toAccount
        }).session(session);
        if (!receiverAccount) {
            yield session.abortTransaction();
            return res.status(404).json({
                message: "Receiver account not found"
            });
        }
        // perform the transfer
        yield db_1.Account.updateOne({ userId: senderId }, {
            $inc: {
                balance: -amount
            }
        }).session(session);
        yield db_1.Account.updateOne({ userId: toAccount }, {
            $inc: {
                balance: amount
            }
        }).session(session);
        // commit the transaction
        yield session.commitTransaction();
        return res.status(200).json({
            message: "Transfer successful"
        });
    }
    catch (err) {
        yield session.abortTransaction();
        return res.status(500).json({
            message: "Error while tranferring the money"
        });
    }
    finally {
        yield session.endSession();
    }
}));
