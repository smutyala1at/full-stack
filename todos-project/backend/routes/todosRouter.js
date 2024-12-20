const { Todos } = require("../db/db");
const { Router } = require("express");
const { userAuthMiddleware } = require("../middlewares/userAuthMiddleware");

const todosRouter = Router();

// add todo endpoint
todosRouter.post("/todo", userAuthMiddleware, async (req, res) => {
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

// get all todos endpoint
todosRouter.get("/todos", userAuthMiddleware, async (req, res) => {
    try {
        const result = [];

        // find all todos for the user
        const todos = await Todos.findById({
            userId: req.userId
        })

        todos.forEach(todo => result.push({
            title: todo.title,
            description: todo.description,
            completed: todo.completed
        }));

        res.status(200).json({
            todos: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, please try again",
            error: error.message
        })
    }
})

// update todo endpoint
todosRouter.put("/todos/:id", userAuthMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const updates = req.body;

        // find and update todo
        const updatedTodo = await Todos.findByIdAndUpdate(
            todoId,
            updates,
            { new: true } // returns updated document
        )

        if(!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        res.status(200).json({
            message: "Todo updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, please try again",
            error: error.message
        })
    }
})