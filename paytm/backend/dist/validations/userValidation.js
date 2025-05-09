"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = void 0;
const authValidation_1 = require("./authValidation");
const updateUserValidation = authValidation_1.signupValidation.omit({
    email: true,
}).partial();
exports.updateUserValidation = updateUserValidation;
