const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
});


const User = mongoose.model("User", userModel);

module.exports = User;
