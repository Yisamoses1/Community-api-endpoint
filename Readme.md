 
Manage posts and comments in a community board feature.
API Endpoints
Post Management
Create a Post

Endpoint: POST /posts
Description: Allows users to create a new post.
Request Body:
json
Copy code
{
  "image": "image_url",
  "content": "Post content",
  "category": "Category name"
}
Edit a Post

Endpoint: PUT /posts/:id
Description: Allows users to edit their own posts.
Request Body:
json
Copy code
{
  "image": "new_image_url",
  "content": "Updated content",
  "category": "Updated category"
}
Delete a Post

Endpoint: DELETE /posts/:id
Description: Allows users to delete their own posts.
Get Posts

Endpoint: GET /posts
Description: Retrieves a list of posts with details.
Response:
json
Copy code
[
  {
    "_id": "post_id",
    "imageUrl": "image_url",
    "content": "Post content",
    "category": "Category name",
    "upVotes": 0,
    "downVotes": 0,
    "viewCounts": 0,
    "user": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]

Interactions
Upvote a Post

Endpoint: POST /posts/upvote/:id
Description: Allows users to upvote a post.
Downvote a Post

Endpoint: POST /posts/downvote/:id
Description: Allows users to downvote a post.
Add a Comment

Endpoint: POST /comments"
Description: Allows users to add a comment to a post.
Request Body:
json
Copy code
{
  "content": "Comment content"
}
Get Comments

Endpoint: GET /post/:postId/comments
Description: Retrieves comments for a specific post.
Response:
json
Copy code
[
  {
    "_id": "comment_id",
    "content": "Comment content",
    "user": {
      "username": "username",
      "profilePicture": "profile_picture_url"
    },
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
Sorting and Filtering
Sort Posts

Endpoint: GET /api/posts?sort=time|upvotes
Description: Allows users to sort posts by time posted or number of upvotes.
Filter Posts by Category

Endpoint: GET /api/posts?category=health_topic
Description: Filters posts by categories such as Kidney, Liver, etc.
Data Models
Post
json
Copy code
{
  "name": "String",
  "upVotes": "Number",
  "downVotes": "Number",
  "viewCounts": "Number",
  "comments": "Array",
  "user": "ObjectId",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Comment
json
Copy code
{
  "content": "String",
  "post": "ObjectId",
  "user": "ObjectId",
  "createdAt": "Date",
  "updatedAt": "Date"
}

Error Handling
Errors are returned with appropriate HTTP status codes and descriptive messages to help with debugging.

