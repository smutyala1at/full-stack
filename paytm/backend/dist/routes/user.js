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
exports.userRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const authValidation_1 = require("../validations/authValidation");
const utils_1 = require("../utils/utils");
const userValidation_1 = require("../validations/userValidation");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const { success, error } = authValidation_1.signupValidation.safeParse(input);
        if (!success) {
            return res.status(400).json({
                errors: (0, utils_1.formatErrors)(error)
            });
        }
        const { firstName, lastName, email, password } = input;
        const user = yield db_1.User.findOne({ email });
        if (user) {
            return res.status(409).json({
                errors: "User aleady exists with this email"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const newUser = yield db_1.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        // Assign random balance to the user so that we don't have to integrate with the banks
        yield db_1.Account.create({
            userId: newUser._id,
            balance: Math.floor(Math.random() * 10000) + 1
        });
        return res.status(201).json({
            userId: newUser._id,
            message: "User signup successfull"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error while creating a user"
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const { success, error } = authValidation_1.signinValidation.safeParse(input);
        if (!success) {
            return res.status(400).json({
                errors: (0, utils_1.formatErrors)(error)
            });
        }
        const { email, password } = input;
        const user = yield db_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found this email"
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const payload = {
            userId: user._id
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({
            token
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
userRouter.put("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const { success, error } = userValidation_1.updateUserValidation.safeParse(input);
        if (!success) {
            return res.status(400).json({
                errors: (0, utils_1.formatErrors)(error)
            });
        }
        const userId = req.userId;
        yield db_1.User.findByIdAndUpdate(userId, input);
        return res.status(200).json({
            message: "User updated successfully"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
userRouter.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = (_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.trim();
        const users = yield db_1.User.find({
            "$or": [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
            ]
        });
        return res.status(200).json({
            users: users.map(({ _id, firstName, lastName }) => ({
                _id,
                firstName,
                lastName
            }))
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}));
