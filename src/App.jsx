import { Route, Routes } from "react-router-dom";
import "./App.css";

import "./firebase/config.js";
import "./firebase/auth.js";

import { Home } from "./pages/Home/Home.jsx";
import { Gallery } from "./pages/Gallery/Gallery.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
