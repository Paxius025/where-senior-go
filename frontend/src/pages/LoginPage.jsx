import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import { loginService } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async ({ emailOrUsername, password }) => {
    try{
      await loginService({ emailOrUsername, password });
      alert("Login successful!");
      navigate("/");
    }catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
