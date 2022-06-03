import { Routes, Route } from "react-router-dom";

const CRoutes = () => {
  return (
    <Routes>
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route exact path="/nhat-ky" element={<Diary />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/dang-nhap" element={<Login />} />
    </Routes>
  );
};

export default CRoutes;
