import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Blogs from "./components/Blogs/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./state";
import PopularBlogs from "./components/Blogs/PopularBlogs/PopularBlogs";
import Administrator from "./components/Administrator";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId") && localStorage.getItem("userLevel")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/popular" element={<PopularBlogs />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myblogs" element={<UserBlogs />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />

              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
          {isLoggedIn && localStorage.getItem("userLevel") === 5 && (
            <Route path="/#/administator" element={<Administrator />} />
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
