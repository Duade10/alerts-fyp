import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Notifications from "./pages/Notifications";
import NotificationDetails from "./pages/NotificationDetails";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Contacts from "./pages/Contacts";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"; 

const App = () => {
  // Mock authentication state (replace with real auth logic later)
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Changed to true for testing

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-center">
        <h1 className="text-xl font-bold text-white">Med Alert</h1>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
        <Route
          path="/notifications"
          element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />}
        />
        <Route
          path="/notification/:id"
          element={isAuthenticated ? <NotificationDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/help" element={isAuthenticated ? <Help /> : <Navigate to="/login" />} />
        <Route
          path="/contacts"
          element={isAuthenticated ? <Contacts /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  );
};

export default App;