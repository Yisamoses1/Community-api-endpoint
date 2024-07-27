const Post = require("../Models/postModel");
const Comment = require("../Models/commentModel");
const User = require("../Models/userModel");
const multer = require("multer");
const upload = multer({dest: "uploads/"});


/////////////////////////
//////CREATE POST////////
/////////////////////////

exports.createPost = async (req, res) => {
    const {content, category} = req.body;
    try {
        const imageUrl = req.file ? req.file.path: null;

        const post = new Post({
            imageUrl,
            content,
            category,
            user: req.user._id
        });
        await post.save();
        return res.status(200).json({ message: "Post has been created successfully", post});
    } catch (error) {
       return res.status(500).json({ message: error.message});
    };
}; 

/////////////////////////////
///////EDIT POST/////////////
////////////////////////////

exports.editPost = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id, user: req.user._id});
        if(!post) {
            return res.status(400).json({ message: "Post not found"});
        };
        Object.assign(post, req.body);
        await post.save();

       return res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message})
    };
};

/////////////////////////////
////DELETE POST/////////////
////////////////////////////

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({
          _id: req.params.id,
          user: req.user._id,
        });
        if(!post) {
            return res.status(400).json({ message: "Post not found"});
        };
        return res.status(200).json({ message: "Post deleted successfully", post});
    } catch (error) {
        return res.status(500).json({ message: error.message});
    };
};

////////////////////////////////
////GET POSTS///////////////////
////////////////////////////////

exports.getPosts = async (req, res) => {
    try {
        const post = await Post.find()
          .populate("user", "username profilePicture")
          .populate("comments");
          return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({message: error.message});
    };
};



//////////////////////////////////
////////UPVOTES POST/////////////
/////////////////////////////////

exports.upvotesPost = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        if(!post) {
            return res.status(404).json({message: "Post not found"});
        };
        post.upVotes += 1;
        await post.save();
        return res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message});
    };
};


////////////////////////////////
////////DOWNVOTES POST///////// 
///////////////////////////////


exports.downvotesPost = async (req, res) => {
  try {
    const post = await Post.findOne({_id: req.params.id});
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.downVotes += 1;
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({message: error.message});
  };
};


