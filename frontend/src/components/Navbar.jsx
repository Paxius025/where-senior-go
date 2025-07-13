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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setRole] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();
        setIsLoggedIn(true);
        setRole(session.role);
      } catch {
        setIsLoggedIn(false);
        setRole("");
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
    requireLogin(() => {
      navigate(path);
      setIsMobileMenuOpen(false); // ปิดเมนูมือถือหลังนำทาง
    });
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
          setIsMobileMenuOpen(false);
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
      return "text-blue-500 bg-white px-3.5 py-1.5 rounded-md cursor-pointer hover:scale-110 hover:duration-200 transition-all";
    }

    return "cursor-pointer hover:px-4 hover:py-2 hover:rounded-md hover:scale-110 hover:duration-200 hover:bg-white hover:text-blue-500 transition-all";
  };

  // Mobile menu button style
  const getMobileButtonStyle = (path) => {
    const isActive = location.pathname === path;

    if (isActive) {
      return "cursor-pointer block w-full text-left px-4 py-3 text-blue-500 bg-white rounded-md font-semibold";
    }

    return "cursor-pointer block w-full text-left px-4 py-3 text-white hover:bg-white hover:text-blue-500 rounded-md font-semibold transition-all";
  };

  return (
    <nav className="bg-blue-500 text-white px-4 py-5 relative">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center justify-center gap-20">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="https://images.vexels.com/media/users/3/143402/isolated/svg/afbbf15d5e82a1c4fb5a55c4eacf3003.svg"
                  alt=""
                  width={50}
                />
              </div>

              <div className="flex items-center justify-center">
                Where
                <span className="text-red-500">Senior</span>
                Go
              </div>
            </div>
          </div>

          {isLoggedIn && (
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
          )}
        </div>

        <div className="flex items-center justify-center">
          <div className="flex-1 max-w-md mx-8">
            <div className="relative hover:scale-110 hover:duration-200">
              <SearchBox
                placeholder="Search"
                value={query}
                onChange={handleChange}
                className="bg-white text-black font-bold border-0"
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
            <button
              onClick={handleLogout}
              className="text-blue-500 cursor-pointer bg-white font-medium px-3.5 py-1.5 rounded hover:scale-110 hover:duration-200 transition-all"
            >
              Log Out
            </button>
          )}

          <div className="space-x-4">
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer bg-white text-blue-500 font-medium px-3.5 py-1.5 rounded hover:scale-110 hover:duration-200 transition-all"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="https://images.vexels.com/media/users/3/143402/isolated/svg/afbbf15d5e82a1c4fb5a55c4eacf3003.svg"
                  alt=""
                  width={50}
                />
              </div>

              <div className="flex items-center justify-center">
                Where
                <span className="text-red-500">Senior</span>
                Go
              </div>
            </div>
          </div>

          {/* Search Box - Hidden on mobile, shown on tablet */}
          <div className="hidden sm:block flex-1 max-w-sm mx-4">
            <div className="relative">
              <SearchBox
                placeholder="Search"
                value={query}
                onChange={handleChange}
                className="bg-white text-black font-bold border-0 text-sm"
              />

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                <svg
                  className="w-4 h-4"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer p-2 rounded-md hover:bg-white hover:text-blue-500 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Search Box */}
        <div className="sm:hidden mt-4">
          <div className="relative">
            <SearchBox
              placeholder="Search"
              value={query}
              onChange={handleChange}
              className="bg-white text-black font-bold border-0 text-sm w-full"
            />

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg
                className="w-4 h-4"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-500 border-t border-blue-400 z-50 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 bg-white text-blue-500 rounded-md font-semibold"
                >
                  เข้าสู่ระบบ
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigateSecure("/")}
                    className={getMobileButtonStyle("/")}
                  >
                    Home
                  </button>

                  <button
                    onClick={() => handleNavigateSecure("/reviews")}
                    className={getMobileButtonStyle("/reviews")}
                  >
                    Review
                  </button>

                    <button
                      onClick={() => handleNavigateSecure("/company")}
                      className={getMobileButtonStyle("/company")}
                    >
                      Company
                    </button>

                  <button
                    onClick={() => handleNavigateSecure("/manual")}
                    className={getMobileButtonStyle("/manual")}
                  >
                    recommend
                  </button>

                  <button
                    onClick={() => handleNavigateSecure("/profile")}
                    className={getMobileButtonStyle("/profile")}
                  >
                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="cursor-pointer block w-full text-left px-4 py-3 bg-white text-blue-500 rounded-md font-semibold mt-2"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
