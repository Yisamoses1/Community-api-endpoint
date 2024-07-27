const Comment = require("../Models/commentModel");
const Post = require("../Models/postModel");


////////////////////////////////////
///////ADD COMMENT//////////////////
///////////////////////////////////

exports.addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    // Create a new comment
    const comment = new Comment({
       content,
        post: postId,
         user: req.user._id
    });
    await comment.save();


    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(201).json({ message: comment});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


///////////////////////////////
////////GET COMMENT////////////
//////////////////////////////

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      "username profilePicture"
    );
    return res.json({message: comments});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};