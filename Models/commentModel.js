const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentModel = new Schema ({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment
