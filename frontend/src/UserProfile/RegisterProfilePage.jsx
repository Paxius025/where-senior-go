import React, { useEffect, useState } from "react";
import { getUserProfile } from "./userProfileServices.js";
import ProfileForm from "./ProfileForm.jsx";

const RegisterProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    loadUser();
  }, []);

  // ถ้า user ยังไม่มา ให้แสดง loading
  if (!user) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileForm user={user} />
    </div>
  );
};

export default RegisterProfilePage;
