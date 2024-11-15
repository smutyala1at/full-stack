const {Router} = require("express");
const adminRouter = Router();
const {admins, courses} = require("../db/db")

adminRouter.post("/signup", async (req, res) => {

}) 

adminRouter.post("/login", async (req, res) => {
    
}) 

adminRouter.post("/course", async (req, res) => {
    
}) 

adminRouter.put("/course", async (req, res) => {
    
}) 

adminRouter.get("/course/bulk", async (req, res) => {
    
}) 

module.exports = {
    adminRouter
}