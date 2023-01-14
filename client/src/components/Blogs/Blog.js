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
import {
  DeleteForever,
  Edit,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost } from "../../actions";
const Blog = ({
  blog,
  article,
  bannerImage,
  title,
  username,
  isUser,
  id,
  tags,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    dispatch(likePost(id));
    setIsLiked((prevState) => !prevState);
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
        <Box size="small" display="flex" alignItems={"right"}>
          <Button variant="contained" onClick={() => navigate(`/blogs/${id}`)}>
            <Edit />
          </Button>
          <Button variant="contained" color="warning" onClick={handleDelete(id)}>
            <DeleteForever />
          </Button>
        </Box>
      )}
      <CardHeader
        sx={{ color: "#000" }}
        avatar={<Avatar sx={{ bgcolor: "grey" }}>{username.charAt(0)}</Avatar>}
        title={title}
      />
      <CardMedia
        className="img-fluid"
        component="img"
        image={bannerImage}
        alt={title}
      />
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
          {isLiked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
        </Button>
        {blog.likeCount} &nbsp;
        {blog.likeCount === 0 ? " Like" : " Likes"}
      </CardActions>
    </Card>
  );
};

export default Blog;
