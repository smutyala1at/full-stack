const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://admin:qpaly%40199@cluster0.6rzvv.mongodb.net/tododb");

const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: [8, "passoword must be at least 8 characters long"]}
})

const Todo = new Schema({
    userId: ObjectId,
    title: {type: String, required: true},
    done: Boolean
})

// first argument is the collection from database, second argument is Scheme from here 
const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);


module.exports = {
    UserModel,
    TodoModel
}