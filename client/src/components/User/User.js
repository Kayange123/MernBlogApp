import { CircularProgress, Container } from "@material-ui/core";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../actions/user";
import Blog from "../Blogs/Blog";

const User = () => {
  const user = useSelector((state) => state?.user?.userData?.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState(user?.blogs);
  console.log(blogs);
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id, dispatch]);
  return (
    <div>
      <>
        <Container>
          <Typography variant="h3">
            Hello there welcome to my profile
          </Typography>
        </Container>
        {blogs ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              {blogs.map((blog) => (
                <Blog blog={blog} key={blog._id} isUser={true} />
              ))}
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </>
    </div>
  );
};

export default User;
