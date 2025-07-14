import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="bg-white pt-12 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
              เลือกที่
              <span className="text-blue-500">ฝึกงาน</span>
              ยังไงดี
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 font-medium">
              ลองมาฟังรีวิวจากรุ่นพี่
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
              ค้นพบประสบการณ์จริงจากรุ่นพี่ที่เคยฝึกงานในบริษัทต่างๆ
              เรียนรู้เคล็ดลับการเลือกที่ฝึกงานที่เหมาะสม และเตรียมตัวให้พร้อม
              สำหรับการก้าวเข้าสู่โลกการทำงานอย่างมั่นใจ
            </p>

            <div className="flex flex-col items-center gap-y-6 justify-center sm:grid sm:grid-cols-1 sm:grid-cols-2 md:grid md:grid-cols-1 md:grid-cols-2 gap-4 mb-8 sm:mb-10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    รีวิวจากประสบการณ์จริง
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    เรื่องราวจริงจากรุ่นพี่ที่ผ่านการฝึกงาน
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    เคล็ดลับการเลือกที่ฝึกงาน
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    วิธีหาที่ฝึกงานที่เหมาะกับตัวคุณ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    เตรียมตัวสู่การทำงาน
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    สร้างความมั่นใจก่อนเข้าสู่โลกการทำงาน
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    เครือข่ายและคำแนะนำ
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    สร้างเครือข่ายกับรุ่นพี่และผู้เชี่ยวชาญ
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 max-w-md sm:max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl transform rotate-6 opacity-20"></div>
              <img
                src="https://i.pinimg.com/1200x/a7/9a/42/a79a42b17bcb9bb8c1164fe5d44c27df.jpg"
                alt="นักศึกษาที่กำลังใช้คอมพิวเตอร์อย่างมีความสุข"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
