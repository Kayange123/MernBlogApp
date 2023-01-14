import React, { useEffect, useState } from "react";
// import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Blogs from "./components/Blogs/Blogs";
import UserBlogs from "./components/Blogs/UserBlogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import AddBlog from "./components/Blogs/AddBlog";
import { useDispatch } from "react-redux";
import PopularBlogs from "./components/Blogs/PopularBlogs/PopularBlogs";
import AppBarSearch from "./components/Menu/AppBarSearch";
import Home from "./components/Home/Home";
import User from "./components/User/User";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, dispatch]);

  return (
    <React.Fragment>
      <header>
        <AppBarSearch user={user} setUser={setUser} />
      </header>
      <main>
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/popular" element={<PopularBlogs />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/users/profile/:id" element={<User />} />
              <Route path="/myblogs" element={<UserBlogs />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
