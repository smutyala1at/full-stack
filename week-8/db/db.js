const mongoose = require("mongoose");
const objectId = mongoose.Schema.ObjectId;

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

const User = mongoose.model("user", userSchema);
const Admin = mongoose.model("admin", adminSchema);
const Course = mongoose.model("course", courseSchema);
const Purchase = mongoose.model("purchase", purchaseSchema);

module.exports = {
    User,
    Admin,
    Course,
    Purchase
}