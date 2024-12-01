const express = require("express"); // importing express gives you a fn
const app = express(); // call that fn, now app holds instance of express application
const cors = require("cors");

app.use(cors());

app.get("/notifications", (req, res) => {
    const network = Math.ceil(Math.random() * 10)
    const jobs = Math.ceil(Math.random() * 10) 
    const messages = Math.ceil(Math.random() * 10)
    const notifications = Math.ceil(Math.random() * 10)

    res.json({
        network, jobs, messages, notifications
    })
})

app.get("/todos/:id", (req, res) => {
    
    const todoId = req.params.id - 1;
    console.log(todoId);

    const todos = [
                    { id:1, title: "go to gym", description: "do workout everyday"}, 
                    { id:2, title: "get groceries", description: "don't forget to give back fund"}, 
                    { id:3, title: "write code", description: "work on todo project"}, 
                    { id:4, title: "wake up at 3am", description: "prep for interviews"}
                ]
    
                console.log(todos[todoId])
    res.send(todos[todoId]);
})

app.listen(3000);