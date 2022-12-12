import {
  Avatar,
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import Icon from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../state";
import { Container, Paper } from "@material-ui/core";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPasword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // setLoginFeedback(null);
  };

  const sendRequest = async (type = "signin") => {
    const response = await axios
      .post(`http://localhost:5000/api/users/${type}`, {
        name: inputs.fullname,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        setLoginFeedback(err.response.data.message);
      });

    const data = await response?.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signup")
        .then((data) => {
          localStorage.setItem("userId", data.newUser._id);
          localStorage.setItem("userLevel", data.newUser.userLevel);
          setLoginFeedback(data.message);
        })
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => {
          localStorage.setItem("userId", data.user?._id);
          localStorage.setItem("userLevel", data.user.userLevel);
          setLoginFeedback(data.message);
        })
        .then(() => dispatch(authActions.login()))
        .then(() => {
          if (localStorage.getItem("userLevel") === 5) {
            navigate("/#/administrator");
          }
          navigate("/blogs");
        });
    }
  };
  const handleShowPassword = () => {
    setShowPasword((PrevShowPassword) => !PrevShowPassword);
    setTimeout(() => {
      setShowPasword((PrevShowPassword) => !PrevShowPassword);
    }, 1000);
  };
  const googleSuccess = async (res) => {
    console.log(res);
  };
  const googleFailure = () => {
    console.log("Google signin was unsuccessful, Try again later!");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Box className="login-box card">
            {loginFeedback && (
              <Box sx={{ marginBottom: "10px", color: "error" }}>
                <div className="alert alert-danger">{loginFeedback}</div>
              </Box>
            )}
            <Typography className="title">
              {isSignUp ? "SignUp" : <Avatar></Avatar>}
            </Typography>
            {isSignUp && (
              <TextField
                name="fullname"
                autoFocus
                fullWidth
                required
                onBlur={(e) => setLoginFeedback(null)}
                onChange={handleChange}
                type={"text"}
                value={inputs.fullname}
                label="Full Name"
                margin="normal"
              />
            )}
            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type={"email"}
              fullWidth
              required
              onBlur={(e) => setLoginFeedback(null)}
              autoFocus
              label="E-mail"
              margin="normal"
            />
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              fullWidth
              type={showPassword ? "text" : "password"}
              required
              xs={7}
              onBlur={(e) => setLoginFeedback(null)}
              label="Password"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      size="small"
                      color="blue"
                    >
                      show
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <div className="mt-2">
              <GoogleLogin
                clientId="110264502437-rql7d1g2tjptjgjqdq8k328ejg2svhst.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    fullWidth
                  >
                    Google sign in
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </div>
            <Button
              sx={{ marginTop: 1 }}
              variant="contained"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have account? Login"
                : "Don't have account? Sign Up"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
