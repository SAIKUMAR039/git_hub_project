import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";
import RepoDetail from "./pages/RepoDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <main className="flex-grow">
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#21262d",
                color: "#fff",
                border: "1px solid #30363d",
              },
              success: {
                iconTheme: {
                  primary: "#4ade80",
                  secondary: "#21262d",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#21262d",
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/search"
              element={<Search isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/repo/:owner/:repo"
              element={<RepoDetail isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile setIsAuthenticated={setIsAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
