const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: {type: String, min: 8}
})

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
})

// first argument is the collection from database, second argument is Scheme from here 
const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);


module.exports = {
    UserModel,
    TodoModel
}


