import React, { useState } from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";

export default function LoginForm({ onSubmit }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit({ emailOrUsername, password });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
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
                เข้าสู่ระบบเพื่อเริ่มต้นการค้นหาที่ฝึกงานที่เหมาะสมกับคุณ
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white/60 backdrop-blur-sm"
          >
            <div className="mb-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                เข้าสู่ระบบ
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                ยินดีต้อนรับกลับ! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
              </p>
            </div>

            <div className="space-y-6 mt-8">
              <div className="group">
                <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base transition-colors group-focus-within:text-blue-600">
                  Email or Username:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                    className="w-full px-4 py-3 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 hover:border-gray-400 bg-white/80 backdrop-blur-sm"
                    placeholder="กรอก email หรือ username"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base transition-colors group-focus-within:text-blue-600">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 hover:border-gray-400 bg-white/80 backdrop-blur-sm"
                    placeholder="กรอกรหัสผ่าน"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer hover:scale-110 absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3c-4.418 0-8 4-8 7s3.582 7 8 7 8-4 8-7-3.582-7-8-7zm0 12a5 5 0 100-10 5 5 0 000 10z"
                          clipRule="evenodd"
                        />
                        <path d="M4.293 4.293a1 1 0 011.414 0L16 14.586a1 1 0 01-1.414 1.414L4.293 5.707a1 1 0 010-1.414z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-medium text-sm sm:text-base flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer hover:scale-110 w-full mt-6 py-3 sm:py-3 bg-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Login
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Don't have an account?{" "}
                <Link to="/register" className="hover:scale-110">
                  <span
                    className="inline-block text-blue-600 font-semibold transition duration-300 decoration-2 pr-2 pl-1
                  hover:text-gray-500 hover:scale-110"
                  >
                    Register
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
