import Navbar from "../components/Navbar";
import { checkSession} from "../services/authService";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function DashboardPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await checkSession();
                setIsAuthenticated(response.valid); 
            } catch (error) {
                console.error("Error checking session:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, [navigate]);

    const handleLoginRedirect = () => {
        Swal.fire({
        icon: "info",
        title: "กรุณาเข้าสู่ระบบก่อนใช้งาน",
        confirmButtonText: "เข้าสู่ระบบ",
        }).then((result) => {
        if (result.isConfirmed) {
            navigate("/login");
        }
    });
  };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }
    
    return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLoginClick={handleLoginRedirect} />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
    </div>
  );
}
