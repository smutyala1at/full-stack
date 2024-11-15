const express = require("express");
// create an instance of express http server
const app = express();

app.use(cors());
app.use(express.json());

app.post("/users/signup", async (req, res) => {

}) 

app.post("/users/login", async (req, res) => {
    
}) 

app.get("/courses", async  (req, res) => {

}) 

app.get("/user/purchases", async (req, res) => {

})

app.post("/course/purchase", async (req, res) => {
    
}) 


app.listen(3000, () => {
    console.log("Server running on port 3000");
})