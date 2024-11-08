const fs = require('fs').promises;
const express = require('express');
const app = express();

app.use(express.json());

let todoId = 1

// helper function to read file
async function loadTodos(){
    try{
        const data = await fs.readFile('todos.json', 'utf-8'); 
        return JSON.parse(data);    
    } catch(err){
        console.log(err);
        return null;
    }
}

// helper function to write into file
async function saveTodo(todo){
    try{
        await fs.writeFile('todos.json', JSON.stringify(todo));
        return true;
    } catch(err){
        console.log(err);
        return null;
    }
}

app.get("/todos", async function(req, res) {
    const data = await loadTodos();
    if (data) {
        res.status(200).json({
            todos: data
        })
    }
    else {
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
})

app.get("/todos/:id", async function(req, res){
    const id = req.params.id;
    const data = await loadTodos();
    if(data) {
        const filtered = data.filter(todo => {
            if(todo['id'] === parseInt(id)) return res.status(201).json({
                todo
            })
        })
    }
    else {
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
})

app.post("/todos", async function(req, res) {
    const todoBody = req.body;
    const todo = {
        title: todoBody.title,
        description: todoBody.description,
        completed: todoBody.completed
    }

    const data = await loadTodos();

    if(data) {
        todo['id'] = data.length + 1;
        data.push(todo);
    }

    const isSuccess = await saveTodo(data);
    if(isSuccess){
        res.status(201).json({
            msg: `created todo: ${todo} with id: ${todo['id']}`
        })
    } else {
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
})

app.put("/todos/:id", async function(req, res){
    const id = req.params.id;
    const {title, description, completed} = req.body;
    const data = await loadTodos();
    if(data) {
        data.forEach(todo => {
            if(todo['id'] === parseInt(id)){
                todo['title'] = title !== undefined? title: todo['title'];
                todo['description'] = description !== undefined? description: todo['description'];
                todo['completed'] = completed !== undefined? completed : todo['completed'];
            }
        });

        const isSuccess = await saveTodo(data);
        if(isSuccess){
            res.status(200).json({
                msg: `todo has been found and updated.`
            })
        } else {
            res.status(404).json({
                msg: 'Not found'
            })
        }
    } else {
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
})

app.delete("/todos/:id", async function(req, res){
    const id = req.params.id;
    const data = await loadTodos();
    if (data) {
        let found = false
        data.forEach((todo, index) => {
            if(todo['id'] === parseInt(id)) {
                found = true;
                data.splice(index, 1);
            }
        })

        if(!found) {
            res.status(404).json({
                msg: 'Not found'
            })
        }

        const isSuccess = await saveTodo(data);
        if(isSuccess) {
            res.status(200).json({
                msg: 'Todo has been deleted'
            })
        }
    } else {
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
})

app.all('*', (req, res) => {
    res.send('This matches any request type (GET, POST, etc.) to any path');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});