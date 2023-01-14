import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../../actions";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <div>
      {blogs ? (
        blogs?.map((blog) => (
          <Blog
            id={blog._id}
            blog={blog}
            tags={blog.tags}
            isUser={localStorage.getItem("userId") === blog.user._id}
            bannerImage={blog.bannerImage}
            key={blog._id}
            article={blog.article}
            title={blog.title}
            username={blog.user.name}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <div>
          <CircularProgress margin="auto" size={"6rem"} />
        </div>
      )}
    </div>
  );
};

export default Blogs;
