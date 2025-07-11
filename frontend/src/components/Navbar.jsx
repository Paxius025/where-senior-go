import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutService } from "../services/authService";
export default function Navbar({isAuthenticated, onLoginClick}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutService();
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProtectedAction = (action) => {
    if (!isAuthenticated) {
      onLoginClick();
    } else {
      action();
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold">MyApp</div>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => handleProtectedAction(() => navigate("/profile"))}
              className="hover:underline"
            >
              Profile
            </button>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <button onClick={onLoginClick} className="hover:underline">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}