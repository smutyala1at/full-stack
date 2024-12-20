const { Todos } = require("../db/db");
const { Router } = require("express");

const todosRouter = Router();

// add todo endpoint
todosRouter.post("/todo", async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;

        // create new todo
        await Todos.create({
            title: title,
            description: description,
            userId: userId
        })

        res.status(201).json({
            message: "Todo created successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, please try again",
            error: error.message
        })
    }
})