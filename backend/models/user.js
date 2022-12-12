import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userLevel: {
    type: Number,
    default: 0,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  ],
});
export default mongoose.model("User", UserSchema);
