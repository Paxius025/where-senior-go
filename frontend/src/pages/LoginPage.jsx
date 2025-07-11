import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import { loginService } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ emailOrUsername, password }) => {
    try {
      await loginService({ emailOrUsername, password });
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <p className="text-blue-500 text-3xl absolute z-50 px-2 py-2 max-sm:px-3 max-sm:py-4 max-md:px-9 max-md:py-16 max-lg:px-8 max-lg:py-15">
        <Link to="/">
          <IoArrowBack />
        </Link>
      </p>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}