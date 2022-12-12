import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../Blog";
import { CircularProgress } from "@mui/material";

const PopularBlogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const response = await axios
      .get("http://localhost:5000/api/blogs")
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, [blogs]);
  return (
    <div>
      {blogs ? (
        blogs.map((blog) => (
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
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default PopularBlogs;
