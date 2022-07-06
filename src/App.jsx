import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

// Import pages
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Diary from "./pages/Diary";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/user/userSlice";
import { Flex } from "@chakra-ui/react";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    dispatch(getMe());
  });

  if (isLoading) {
    return (
      <Flex
        h="100vh"
        w="100vw"
        justifyContent="center"
        alignItems="center"
      ></Flex>
    );
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/du-an" element={<Projects />} />
          <Route path="/du-an/:id" element={<ProjectDetail />} />
          <Route exact path="/nhat-ky" element={<Diary />} />
          <Route exact path="/thong-tin" element={<Profile />} />
          <Route exact path="*" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
