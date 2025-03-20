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
const db_1 = require("./db/db");
const express_1 = __importDefault(require("express"));
db_1.client;
const app = (0, express_1.default)();
// TODO: create routes to create, read, update and delete users and addresses
app.get("/", (req, res) => {
    res.status(200).json({
        message: "app under progress"
    });
});
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.createTables)();
        console.log("App is running on port 3000");
    }
    catch (error) {
        console.log("Error occured while creating tables: ", error);
    }
}));
