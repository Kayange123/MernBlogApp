import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  blogId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  article: {
    type: String,
  },
  bannerImage: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  tags: [String],
});
export default mongoose.model("blog", blogSchema);

//To connect to mongo cluster
// username: kayangejr
// password: v8ev6G20EOU2e0ya
// Link: mongodb+srv://kayangejr:<password>@cluster0.e6tuh47.mongodb.net/?retryWrites=true&w=majority
