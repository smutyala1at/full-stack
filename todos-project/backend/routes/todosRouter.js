const { Todos } = require("../db/db");
const { Router } = require("express");
const { userAuthMiddleware } = require("../middlewares/userAuthMiddleware");
const { addTodoValidation, updateTodoValidation } = require("../validators/todoSchemaValidation");
const todosRouter = Router();

// add todo endpoint
todosRouter.post("/todo", userAuthMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.body)
        const {success, error} = addTodoValidation.safeParse(req.body);

        if(!success){
            return res.status(400).json({
                message: error.issues
            })
        }

        const userId = req.userId;

        // not needed because of zod validation
        /* if(!title || !description) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
 */
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
        const todos = await Todos.find({
            userId: req.userId
        })

        if(!todos.length) {
            return res.status(200).json({
                message: "No todos found",
                todos: []
            })
        }

        todos.forEach(todo => result.push({
            id: todo._id,
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

        const { success, error } = updateTodoValidation.safeParse(req.body);

        if(!success){
            return res.status(400).json({
                message: error.issues
            })
        }

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

// delete todo endpoint
todosRouter.delete("/todos/:id", userAuthMiddleware, async (req,res) => {
    try {
        const todoId = req.params.id;

        // find and delete todo
        const deletedTodo = await Todos.findByIdAndDelete(todoId);

        if(!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        res.status(200).json({
            message: "Todo deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, please try again",
            error: error.message
        })
    }
})


module.exports = {
    todosRouter
}