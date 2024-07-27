const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postModel = new Schema({
  imageUrl: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  viewCounts: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
}, { timestamps: true });


const Post = mongoose.model("Post", postModel);

module.exports = Post

