import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import "./firebase/config.js";
import "./firebase/auth.js";

import { Home } from "./pages/Home/Home.jsx";
import { Gallery } from "./pages/Gallery/Gallery.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route path="/admin/login" element={<Admin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
