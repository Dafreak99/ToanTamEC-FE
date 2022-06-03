import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

// Import pages
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Diary from "./pages/Diary";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Projects />} />
        <Route path="/du-an/:id" element={<ProjectDetail />} />
        <Route exact path="/nhat-ky" element={<Diary />} />
        <Route exact path="/thong-tin" element={<Profile />} />
        <Route exact path="/dang-nhap" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
