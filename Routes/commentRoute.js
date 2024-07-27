const express = require("express");
const { addComment, getComments} = require("../controllers/commentController");
const { auth } = require("../Middleware/auth")


const router = express.Router();
 


router.post("/comments", auth, addComment);
router.get("/post/:postId/comments", getComments);

module.exports = router;
