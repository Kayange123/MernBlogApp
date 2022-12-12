import express from "express";
import {
  deleteUser,
  getAllUsers,
  makeAdmin,
  signin,
  signup,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/api/users", getAllUsers);
userRoutes.post("/api/users/signup", signup);
userRoutes.post("/api/users/signin", signin);
userRoutes.delete("/api/users/:id/delete", deleteUser);
userRoutes.patch("/api/users/:id", makeAdmin);

export default userRoutes;
