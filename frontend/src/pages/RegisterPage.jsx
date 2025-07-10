import React from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import { registerService } from "../services/authService.js";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const handleRegister = async ({ email, username, password }) => {
    const data = await registerService({ email, username, password });
    alert(`Register success! User ID: ${data.userId}`);
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
        <p>
           Already have an account? <Link to="/login">Login here</Link>
        </p>
    </div>
  );
}
