import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutService } from "../services/authService";
export default function Navbar() {
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

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold">MyApp</div>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </nav>
  );
}