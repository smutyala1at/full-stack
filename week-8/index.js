const express = require("express");
// create an instance of express http server
const app = express();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);   
app.use("/admin", adminRouter);   

app.listen(3000, () => {
    console.log("Server running on port 3000");
})