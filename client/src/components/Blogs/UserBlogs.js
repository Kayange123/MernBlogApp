import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";

const UserBlogs = () => {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  });

  return (
    <div>
      {user && user.blogs ? (
        user.blogs.map((blog) => (
          <Blog
            id={blog._id}
            isUser={true}
            key={blog._id}
            title={blog.title}
            tags={blog.tags}
            blog={blog}
            bannerImage={blog.bannerImage}
            article={blog.article}
            username={user.name}
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UserBlogs;
