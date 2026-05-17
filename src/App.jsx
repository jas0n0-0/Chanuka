import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}