import React from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import { registerService } from "../services/authService.js";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function RegisterPage() {
  const handleRegister = async ({ email, username, password }) => {
    const data = await registerService({ email, username, password });
    alert(`Register success! User ID: ${data.userId}`);
  };

  return (
    <div>
      <p className="text-blue-500 text-3xl absolute z-50 p-2">
        <Link to='/dashboard'><IoArrowBack /></Link>
      </p>
      <RegisterForm onSubmit={handleRegister} />
        <p>
           Already have an account? <Link to="/login">Login here</Link>
        </p>
    </div>
  );
}
