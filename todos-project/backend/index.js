const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// import routes
const { userRouter } = require("../routes/userRouter");
const { todosRouter } = require("../routes/todosRouter");

// middlewares
app.use(express.json());
app.use(cors());

// use routes
app.use("/user", userRouter);
app.use("/todos", todosRouter);

// listen on port 3000 and start mongodb connection
app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Server is running on port ", process.env.PORT);
})

