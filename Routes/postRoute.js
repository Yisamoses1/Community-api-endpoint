const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createPost,
  editPost,
  deletePost,
  getPosts,
  upvotesPost,
  downvotesPost,
} = require("../controllers/postController");
const { auth}  = require("../Middleware/auth")


const router = express.Router();


router.post("/posts", auth, upload.single("image"), createPost);
router.put("/posts/:id", auth, editPost);
router.delete("/posts/:id", auth, deletePost);
router.get("/posts", getPosts);
router.post("/posts/upvote/:id", auth, upvotesPost);
router.post("/posts/downvote/:id", auth, downvotesPost);


module.exports = router