import express from "express";
import {
  deleteUser,
  getAllUsers,
  makeAdmin,
  signin,
  signup,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);
userRoutes.post("/users/signup", signup);
userRoutes.post("/users/signin", signin);
userRoutes.delete("/users/:id/delete", deleteUser);
userRoutes.patch("/users/:id", makeAdmin);

export default userRoutes;
