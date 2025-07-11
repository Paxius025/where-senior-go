import React, { useState } from "react";
import "../../styles/style.css";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function RegisterForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      await onSubmit({ email, username, password });
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <>
      <header className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8 relative overflow-hidden">
        <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden min-h-[600px] lg:h-auto">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-white to-blue-50/30 p-6 sm:p-8 lg:p-12 relative">
            <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 p-4 bg-white rounded-xl shadow-lg">
                <img
                  src="https://jaro-website.s3.ap-south-1.amazonaws.com/2024/05/unnamed-12.png"
                  alt="TeamJob"
                  className="w-[200px] sm:w-[250px] lg:w-[280px] max-w-full h-auto"
                />
              </div>

              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800 px-4 leading-relaxed">
                ค้นหาที่ฝึกงานจากประสบการณ์จริงของรุ่นพี่{" "}
                <span className="text-blue-500">TeamJob</span>
              </h1>

              <p className="mt-4 text-gray-600 text-sm sm:text-base text-center max-w-md">
                สมัครสมาชิกเพื่อเริ่มต้นการค้นหาที่ฝึกงานที่เหมาะสมกับคุณ
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white/60 backdrop-blur-sm"
          >
            <div className="mb-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                สมัครสมาชิก
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                ยินดีต้อนรับ! กรุณาสมัครสมาชิกเพื่อดำเนินการต่อ
              </p>
            </div>

            <div className="space-y-6 mt-8">
              <div className="group">
                <div className="mb-2 text-center lg:text-left">
                  <label className="block mb-1 font-semibold text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-gray-700">
                    Username:
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-gray-700">
                    Password:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4 relative">
                  <label className="block mb-1 font-semibold text-gray-700">
                    Confirm Password:
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  {passwordsMatch && (
                    <IoIosCheckmarkCircle className="absolute right-1.5 top-10 text-green-500 text-lg" />
                  )}
                </div>

                <div className="mb-6">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer text-sm text-blue-500 hover:underline focus:outline-none"
                  >
                    {showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}

            <button
              type="submit"
              className="cursor-pointer w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition
              hover:scale-110"
            >
              Register
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Already have an account?{" "}
                <Link to="/login" className="hover:scale-110">
                  <span
                    className="inline-block text-blue-500 font-semibold transition duration-300 decoration-2 pr-2 pl-1
                              hover:text-gray-500 hover:scale-110"
                  >
                    Login
                  </span>
                </Link>
                here
              </p>
            </div>
          </form>
        </div>
      </header>
    </>
  );
}

