import Navbar from "../components/Navbar";
import { checkSession} from "../services/authService";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
export default function DashboardPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await checkSession();
                if (!response.valid) {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking session:", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, [navigate]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }
    return (
        <div>
            <Navbar />
            <div className="p-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-2 text-gray-700">Welcome to your dashboard.</p>
      </div>
    </div>
  );
}
