import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

import "./charts/ChartjsConfig";

// Import pages
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Diary from "./pages/Diary";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Routes>
                <Route exact path="/" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route exact path="/nhat-ky" element={<Diary />} />
                <Route exact path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
