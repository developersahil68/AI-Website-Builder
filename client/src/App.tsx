// import { Home, View } from "lucide-react";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";
import Preview from "./pages/Preview";
import Community from "./pages/Community";
import Home from "./pages/Home";
import View from "./pages/View";
import Navbar from "./components/Navbar";

const App = () => {
  const { pathname } = useLocation();

  const hideNavbar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view") ||
    pathname.startsWith("preview");
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Projects/:projectId" element={<Projects />} />
        <Route path="/Projects" element={<MyProjects />} />
        <Route path="/Preview/:projectId" element={<Preview />} />
        <Route path="/Preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/View/:projectId" element={<View />} />
      </Routes>
    </div>
  );
};

export default App;
