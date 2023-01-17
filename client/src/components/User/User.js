import { CircularProgress, Container } from "@material-ui/core";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogsByUser, fetchUserById } from "../../actions/user";
import Blog from "../Blogs/Blog";
import UserBlogs from "../Blogs/UserBlogs";

const User = () => {
  const user = useSelector((state) => state?.user);
  const userData = user?.userData?.userBlogs;
  const userBlog = user?.userData?.userBlogs?.blogs;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  //console.log(user);
  //console.log(blogs);
  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchBlogsByUser(id));
    if (userBlog) {
      setBlogs(userBlog);
    }
  }, [id, dispatch, userBlog]);
  return (
    <div>
      <>
        <Container>
          <Typography variant="h3">
            Hello there welcome to my profile
          </Typography>
        </Container>
        {user && blogs ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {blogs.map((blog) => (
              <Grid item xs={2} sm={4} md={4} key={blog._id}>
                <UserBlogs user={userData} blogs={blogs} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </>
    </div>
  );
};

export default User;
