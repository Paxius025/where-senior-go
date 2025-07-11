import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import { registerService } from "../services/authService.js";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Swal from "sweetalert2";
export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ email, username, password }) => {
    await registerService({ email, username, password });
    Swal.fire({
      icon: "success",
      title: "ลงทะเบียนสำเร็จ",
      text: "คุณได้ลงทะเบียนสำเร็จแล้ว!",
      timer: 500,
    });
    navigate("/");
  };

  return (
    <div>
      <p className="text-blue-500 text-3xl absolute z-50 px-2 py-2 max-sm:px-6 max-sm:py-10 max-md:px-8 max-md:py-10 max-lg:px-8 max-lg:py-10">
        <Link to='/'><IoArrowBack /></Link>
      </p>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}
