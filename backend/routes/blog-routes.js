import express from "express";
import {
  deleteBlog,
  getBlogs,
  getBlogsByUser,
  getById,
  likePost,
  postBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/api/blogs", getBlogs);
router.post("/api/blogs/create", postBlog);
router.put("/api/blogs/update/:id", updateBlog);
router.get("/api/blogs/:id", getById);
router.delete("/api/blogs/delete/:id", deleteBlog);
router.get("/api/blogs/user/:id", getBlogsByUser);
router.patch("/api/blogs/:id/like", likePost);

export default router;
