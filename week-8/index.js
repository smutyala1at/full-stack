const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
// create an instance of express http server
const app = express();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);   
app.use("/admin", adminRouter);   


async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.port || 3000}`);
    })
}

main();
