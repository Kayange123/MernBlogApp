import axios from "axios";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Blog = ({
  blog,
  article,
  bannerImage,
  blogId,
  publishedAt,
  title,
  username,
  isUser,
  id,
  tags,
}) => {
  const navigate = useNavigate();

  const likeRequest = async () => {
    const res = await axios
      .patch(`http://localhost:5000/api/blogs/${id}/like`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blogs/delete/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleLike = (e) => {
    likeRequest();
  };
  const handleEdit = (e) => {
    navigate(`/blogs/${id}`);
  };
  const handleDelete = (e) => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/myblogs"));
  };

  return (
    <Card
      sm={{
        maxWidth: "100%",
      }}
      sx={{
        maxWidth: "80%",
        margin: "8px auto",
        border: "1px solid white",
      }}
      display="flex"
    >
      {isUser && (
        <Box sx={12} sm={7} size="small" display="flex" alignItems={"right"}>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="warning"
            marginLeft="1px"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      )}
      <CardHeader
        sx={{ color: "#000" }}
        avatar={<Avatar sx={{ bgcolor: "grey" }}>{username.charAt(0)}</Avatar>}
        title={title}
      />
      <CardMedia component="img" height="500" image={bannerImage} alt={title} />
      <CardContent>
        <Typography>{tags.map((tag) => `#${tag}, `)}</Typography>
        <Typography
          sx={{ color: "#000" }}
          variant="body2"
          color="textSecondary"
          gutterBottom
        >
          <b onClick={() => navigate("/user/profile")}>{username}</b> {": "}
          {article}
        </Typography>
        <Typography
          sx={{ color: "black", fontStyle: "italic" }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Published: - {moment(blog.publishedAt).fromNow()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLike}>
          {blog.likeCount} &nbsp;
          {blog.likeCount === 0 ? " Like" : " Likes"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Blog;
