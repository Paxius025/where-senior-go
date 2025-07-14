import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Swal from "sweetalert2";
import { checkSession } from "../Authentication/services/authService.js";
import { verifySessionOrRedirect } from "../Authentication/services/authHelpers.js";
import CompanyList from "./CompanyList.jsx";
import { useNavigate } from "react-router-dom";
const CompanyPage = () => {
  const [, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const session = await verifySessionOrRedirect(navigate);
      if (session) {
        setIsLoggedIn(true);
        setRole(session.role);
      }
    };
    verify();
  }, [navigate]);

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

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        {role === "senior" && (
          <>
            <h1>เห็นเฉพาะบริษัทที่เกี่ยวข้องกับ Senior</h1>{" "}
            <div className="flex items-center justify-end px-20">
              <button
                onClick={() => handleNavigateSecure("/company")}
                className="cursor-pointer text-xl mt-4 bg-blue-500 text-white px-4 py-2 rounded
                hover:scale-110 hover:duration"
              >
                เพิ่มบริษัท
              </button>
            </div>
          </>
        )}
        <CompanyList />
      </div>
    </>
  );
};

export default CompanyPage;
