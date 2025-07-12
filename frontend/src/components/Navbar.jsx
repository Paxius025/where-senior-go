import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  logoutService,
  checkSession,
} from "../Authentication/services/authService.js";
import Swal from "sweetalert2";
import SearchBox from "./SearchBox.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        await checkSession();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    verifySession();
  }, []);

  const requireLogin = async (callback) => {
    try {
      await checkSession();
      callback();
    } catch {
      await Swal.fire({
        icon: "warning",
        title: "กรุณาเข้าสู่ระบบ",
        text: "คุณต้องล็อกอินก่อนทำรายการนี้",
      });
      navigate("/login");
    }
  };

  const handleNavigateSecure = (path) => {
    requireLogin(() => navigate(path));
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "ออกจากระบบ...",
      text: "กรุณายืนยันการออกจากระบบ",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutService();
          setIsLoggedIn(false);
          navigate("/login");
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    });
  };

  // Function to get button style based on current route
  const getButtonStyle = (path) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return "text-blue-500 bg-white px-3.5 py-1.5 rounded-md cursor-pointer hover:scale-110 hover:duration-200";
    }

    return "cursor-pointer hover:px-4 hover:py-2 hover:rounded-md  hover:scale-110 hover:duration-200 hover:translte-y-1";
  };

  return (
    <nav className="bg-blue-500 text-white px-4 py-5 flex items-center justify-between">
      <div className="flex items-center justify-center gap-20">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Where
          <span className="text-red-500">Senior</span>
          Go
        </div>

        {isLoggedIn && (
          <>
            <div className="flex items-center justify-center gap-6 font-semibold">
              <button
                onClick={() => handleNavigateSecure("/")}
                className={getButtonStyle("/")}
              >
                Home
              </button>

              <button
                onClick={() => handleNavigateSecure("/reviews")}
                className={getButtonStyle("/reviews")}
              >
                Review
              </button>

              <button
                onClick={() => handleNavigateSecure("/company")}
                className={getButtonStyle("/company")}
              >
                Company
              </button>

              <button
                onClick={() => handleNavigateSecure("/manual")}
                className={getButtonStyle("/manual")}
              >
                recommend
              </button>

              <button
                onClick={() => handleNavigateSecure("/profile")}
                className={getButtonStyle("/profile")}
              >
                Profile
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <SearchBox
              placeholder="Search"
              value={query}
              onChange={handleChange}
              className="bg-blue-100 text-black font-bold border-0"
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {isLoggedIn && (
          <>
            <button
              onClick={handleLogout}
              className="text-blue-500 cursor-pointer bg-white font-medium px-3.5 py-1.5 rounded
              hover:scale-110 hover:duration-200"
            >
              Log Out
            </button>
          </>
        )}

        <div className="space-x-4">
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer bg-white text-blue-500 font-medium px-3.5 py-1.5 rounded hover:bg-gray-100 transition"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
