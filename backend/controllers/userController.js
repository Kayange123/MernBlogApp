import User from "../models/user.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  let existingUser, newUser;
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(500)
      .json({ message: "Email already registered, try to login" });
  }
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    newUser = await user.save();
  } catch (error) {
    console.log(error);
  }
  if (!newUser) {
    return res.status(500).json({ message: " Failed to add a User" });
  }
  return res.status(201).json({ newUser });
};

export const signin = async (req, res, next) => {
  let existingUser;
  const { email, password } = req.body;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "No user Found with this Email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login successfull", user: existingUser });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  let deleted;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: "Could not find a user by this id" });
  try {
    deleted = await User.findByIdAndDelete(id);
  } catch (error) {
    return console.log(err);
  }
  if (deleted) {
    return res.status(200).json({ message: "User is succesful deleted" });
  }
  return res.status(500).json({ message: "Could not delete the user" });
};
export const makeAdmin = async (req, res) => {
  const { id } = req.params;
  let user;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: 'Could not find a user with this id'})
  try {
    user = await User.findByIdAndUpdate(
      id,
      {
        userLevel: 5,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
  if (user) {
    return res.status(200).json({message: 'A user is now an admin'})
  }
  return res.status(400).json({message: 'Could not make a user an admin'})
};
