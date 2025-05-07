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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
const authValidation_1 = require("../validations/authValidation");
const userRouter = (0, express_1.default)();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const { success, error } = authValidation_1.signupValidation.safeParse(input);
        if (!success) {
            res.status(400).json({
                message: error
            });
        }
        const { firstName, lastName, email, password } = input;
        const user = yield db_1.User.findOne({ email });
        if (user) {
            res.status(400).json({
                message: "User aleady exists with this email"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const newUser = yield db_1.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            userId: newUser._id,
            message: "User signup successfull"
        });
    }
    catch (err) {
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
