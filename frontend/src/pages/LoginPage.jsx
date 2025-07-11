import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import { loginService } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ emailOrUsername, password }) => {
    try {
      await loginService({ emailOrUsername, password });
      await Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/");
    }catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <p className="text-blue-500 text-3xl absolute z-50 p-2">
        <Link to='/'><IoArrowBack /></Link>
      </p>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
