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
exports.login = exports.createUser = void 0;
const __1 = require("..");
const custom_errors_1 = require("../errors/custom.errors");
const user_validations_1 = require("../validations/user.validations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.client.user.findFirst({
        where: {
            email: email
        }
    });
    return user;
});
const createUser = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = user_validations_1.userSignupSchema.safeParse(userInput);
        if (error) {
            const errors = error.errors.map((err) => ({ path: err.path[0], message: err.message }));
            throw new custom_errors_1.ValidationError(errors);
        }
        const { email, password } = userInput;
        const user = yield findUser(email);
        if (user) {
            throw new custom_errors_1.DuplicateResourceError("User already exists");
        }
        // hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        yield __1.client.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        return;
    }
    catch (error) {
        if (error instanceof custom_errors_1.ValidationError || error instanceof custom_errors_1.DuplicateResourceError) {
            throw error;
        }
        throw new custom_errors_1.DatabaseError("Error creating user");
    }
});
exports.createUser = createUser;
const login = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = user_validations_1.userLoginSchema.safeParse(userInput);
        if (error) {
            const errors = error.errors.map((err) => ({ path: err.path[0], message: err.message }));
            throw new custom_errors_1.ValidationError(errors);
        }
        const { email, password } = userInput;
        // check if user exists
        const user = yield findUser(email);
        if (!user) {
            throw new custom_errors_1.NotFoundError("User does not exists");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new custom_errors_1.ValidationError([{ path: "password", message: "Invalid password" }]);
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
        return token;
    }
    catch (error) {
        if (error instanceof custom_errors_1.ValidationError || error instanceof custom_errors_1.NotFoundError) {
            throw error;
        }
        throw new custom_errors_1.DatabaseError("Error loggin in");
    }
});
exports.login = login;
