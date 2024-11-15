const mongoose = require("mongoose");
const objectId = mongoose.Schema.ObjectId;

mongoose.connect("mongodb+srv://admin:qpaly%40199@cluster0.6rzvv.mongodb.net/course-selling-db");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be minimum of 8 characters"] 
    }
})

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be minimum of 8 characters"] 
    }
})

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    imageUrl: {
        type: String
    },

    creatorId: {
        type: objectId
    }
})

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: objectId,
        required: true
    },

    courseId: {
        type: objectId,
        required: true
    }
})

const users = mongoose.model("user", userSchema);
const admins = mongoose.model("admin", adminSchema);
const courses = mongoose.model("course", courseSchema);
const purchases = mongoose.model("purchase", purchaseSchema);

module.exports = {
    users,
    admins,
    courses,
    purchases
}