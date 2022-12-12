import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { authActions } from "../state";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar position="sticky" bg="white" maxWidth="lg" sx={12} sm={7}>
      <Toolbar sx={{ background: "whitesmoke", size: "12" }}>
        <div>
          <Typography
            component={Link}
            to={isLoggedIn ? "/blogs" : "/popular"}
            variant="h4"
            align="center"
            sx={{ color: "blue" }}
          >
            bLoggEr
          </Typography>
        </div>

        <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
          {isLoggedIn && (
            <Tabs>
              <Tab LinkComponent={Link} to="/blogs" label="All blogs" />
              <Tab LinkComponent={Link} to="/myblogs" label="My blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add blog" />
            </Tabs>
          )}
        </Box>
        <Box marginLeft="auto" display="flex">
          {isLoggedIn ? (
            <>
              <div>
                <Avatar>R </Avatar>
                <Typography>{}</Typography>
              </div>
              <Button
                onClick={() => {
                  dispatch(authActions.logout());
                  navigate("/popular");
                }}
                LinkComponent={Link}
                to="/popular"
                variant="contained"
                color="warning"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
