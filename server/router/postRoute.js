import express from "express";

import getAllPost from "../controller/post.controller.js";
import authenticate from "../middleware/auth.js";
import authorization from "../utils/permission.validator.js";

const PostRouter = express.Router();

// Routes
PostRouter.get(
  "/get-all-post",
  authenticate,
  authorization("ADMIN", "read:admin"),
  getAllPost,
);

export default PostRouter;
