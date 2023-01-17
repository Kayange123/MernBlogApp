import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
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
import { AddAPhoto, Home } from "@material-ui/icons";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/popular");
  };
  return (
    <AppBar
      className="navbar bg-dark navbar-dark navbar-expand-lg"
      position="sticky"
    >
      <Toolbar className="container">
        <div>
          <Typography
            component={Link}
            to={isLoggedIn ? "/blogs" : "/popular"}
            variant="h4"
            className="navbar-brand"
          >
            SokaLetu
          </Typography>
        </div>
        <Button className="navbar-toggler" data-bs-toggle="collapse"></Button>
        <Box className="collapse navbar-collapse">
          {user && (
            <Tabs
              value={value}
              className="navbar-nav ms-auto"
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className="nav-item nav-link"
                LinkComponent={Link}
                to="/blogs"
                label={<Home />}
              />
              <Tab
                className="nav-item"
                LinkComponent={Link}
                to="/myblogs"
                label="My blogs"
              />
              <Tab
                className="nav-item"
                LinkComponent={Link}
                to="/blogs/add"
                label={<AddAPhoto />}
              />
            </Tabs>
          )}
        </Box>
        <Box marginLeft="auto" display="flex">
          {user ? (
            <Toolbar className="dropdown">
              <Button
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar>R </Avatar>
              </Button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" type="button">
                    Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <div>
                <Typography>{user.email}</Typography>
              </div>
            </Toolbar>
          ) : (
            <Button
              className="btn btn-primary btn-sm"
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
