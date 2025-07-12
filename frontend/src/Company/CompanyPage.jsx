import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar.jsx";
import Swal from "sweetalert2";
import { checkSession } from "../Authentication/services/authService.js";
import { useNavigate } from "react-router-dom";
const CompanyPage = () => {
  const [ , setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

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
    requireLogin(() => navigate(path));
  };




  return (
    <>
     <Navbar />
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">company</h1>
      {role === "senior" && (
                <button
                  onClick={() => handleNavigateSecure("/company")}
                >
                 เห็นเฉพาะบริษัทที่เกี่ยวข้องกับ Senior
                </button>
              )}
    </div>
    </>
  );
};

export default CompanyPage;