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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_services_1 = require("../services/user.services");
const custom_errors_1 = require("../errors/custom.errors");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_services_1.createUser)(req.body);
        res.status(201).json({
            message: "User signup successful"
        });
        return;
    }
    catch (error) {
        if (error instanceof custom_errors_1.ValidationError) {
            res.status(422).json(error);
            return;
        }
        if (error instanceof custom_errors_1.DuplicateResourceError) {
            res.status(409).json({
                message: error.message
            });
            return;
        }
        if (error instanceof custom_errors_1.DatabaseError) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, user_services_1.login)(req.body);
        res.status(200).json({
            message: "User login successful",
            token
        });
        return;
    }
    catch (error) {
        if (error instanceof custom_errors_1.ValidationError) {
            res.status(422).json(error);
            return;
        }
        if (error instanceof custom_errors_1.NotFoundError) {
            res.status(404).json({
                message: error.message
            });
            return;
        }
        if (error instanceof custom_errors_1.DatabaseError) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
}));
