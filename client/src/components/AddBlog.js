import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    article: "",
    imageURL: "",
    tags: [],
  });
  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blogs/create", {
      title: inputs.title,
      article: inputs.article,
      bannerImage: inputs.imageURL,
      tags: inputs.tags,
      user: localStorage.getItem("userId"),
    });
    const data = await res.data;

    return { data, res };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => setInputs(data))
      .then(() => navigate("/myblogs"));

    console.log(inputs);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <Paper className="container card">
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="card">
            <Typography className="card-title mt-2">Post your blog</Typography>
            <div className="form-group">
              <FileBase
                className="form-control mt-3"
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setInputs({ ...inputs, imageURL: base64 })
                }
              />
            </div>
            <TextField
              className="form-control mt-2"
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.title}
            />
            <TextField
              label="Article"
              name="article"
              variant="outlined"
              className="form-control mt-2"
              fullWidth
              onChange={handleChange}
              value={inputs.article}
            />
            <TextField
              label="Tags"
              name="tags"
              variant="outlined"
              className="form-control mt-2"
              fullWidth
              onChange={handleChange}
              value={inputs.tags}
            />

            <Button
              type="submit"
              variant={"contained"}
              className="btn btn-success mt-2"
              size="large"
            >
              Publish
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AddBlog;
