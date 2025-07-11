import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import { registerService } from "../services/authService.js";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ email, username, password }) => {
    await registerService({ email, username, password });

    // Redirect to dashboard page after successful registration
    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div>
      <p className="text-blue-500 text-3xl absolute z-50 p-2">
        <Link to='/'><IoArrowBack /></Link>
      </p>
      <RegisterForm onSubmit={handleRegister} />
        <p>
           Already have an account? <Link to="/login">Login here</Link>
        </p>
    </div>
  );
}
