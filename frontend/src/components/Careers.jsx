import React from "react";

const Careers = () => {
  const trendingCareers = [
    {
      icon: "🧠",
      color: "text-indigo-600",
      title: "ผู้เชี่ยวชาญ AI และ Machine Learning",
    },
    {
      icon: "📊",
      color: "text-blue-600",
      title: "นักวิเคราะห์ข้อมูล / Data Scientist",
    },
    {
      icon: "🧮",
      color: "text-purple-600",
      title: "ผู้เชี่ยวชาญ Big Data",
    },
    {
      icon: "🛡️",
      color: "text-red-500",
      title: "ผู้เชี่ยวชาญด้าน Cybersecurity",
    },
    {
      icon: "☁️",
      color: "text-cyan-600",
      title: "ผู้เชี่ยวชาญระบบ Cloud Computing",
    },
    {
      icon: "📱",
      color: "text-pink-600",
      title: "นักการตลาดดิจิทัล / วางกลยุทธ์",
    },
    {
      icon: "🌱",
      color: "text-green-600",
      title: "วิศวกรพลังงานหมุนเวียน",
    },
    {
      icon: "🤖",
      color: "text-yellow-500",
      title: "วิศวกรหุ่นยนต์",
    },
    {
      icon: "🎨",
      color: "text-orange-500",
      title: "นักออกแบบ UX/UI",
    },
    {
      icon: "🏥",
      color: "text-amber-700",
      title: "บุคลากรทางการแพทย์ / Telehealth",
    },
  ];

  return (
    <>
      <div className="my-10 px-6 md:px-20 py-10 bg-gradient-to-br from-white to-white rounded-xl">
        <div className="flex items-center justify-center mb-15">
          <h1 className="text-3xl font-bold text-gray-800">
            10 อาชีพมาแรง ปี 2025
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingCareers.map((career, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow p-4 flex items-start gap-3 hover:bg-blue-50 transition"
            >
              <span className={`${career.color} text-xl`}>{career.icon}</span>
              <p className="text-gray-800 text-lg font-medium">
                {career.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-right text-gray-500">
          ข้อมูลจาก{" "}
          <a
            href="https://www.weforum.org/agenda/2023/05/top-10-jobs-of-the-future-2023/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            World Economic Forum (2023)
          </a>
        </div>
      </div>
    </>
  );
};

export default Careers;
