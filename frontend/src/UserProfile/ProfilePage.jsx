import React, {useEffect, useState} from "react";
import ProfileForm from "./ProfileForm";
import { getUserProfile } from './userProfileServices.js';
import Navbar from "../components/Navbar.jsx";
const ProfilePage = () => {
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

  if (!user) return <div>Loading...</div>;

  return (
    <>
     <Navbar />
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">โปรไฟล์</h1>
      <ProfileForm user={user} />
    </div>
    </>
  );
};

export default ProfilePage;