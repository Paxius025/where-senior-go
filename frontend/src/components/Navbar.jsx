import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutService, checkSession } from "../Authentication/services/authService.js";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold cursor-pointer" onClick={() => navigate("/")}>
        WhereSeniorGo
      </div>

      <div className="space-x-4">
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            เข้าสู่ระบบ
          </button>
        )}

        {isLoggedIn && (
          <>
            <button
              onClick={() => handleNavigateSecure("/reviews")}
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              อ่านรีวิว
            </button>

            <button
              onClick={() => handleNavigateSecure("/company")}
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              บริษัท
            </button>

            <button
              onClick={() => handleNavigateSecure("/manual")}
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              คู่มือ
            </button>
            
            <button
              onClick={() => handleNavigateSecure("/profile")}
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              โปรไฟล์
            </button>

            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              ออกจากระบบ
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
