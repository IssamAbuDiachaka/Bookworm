import { Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterationPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
