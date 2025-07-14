import React from "react";

const Careers = () => {
  const trendingCareers = [
    {
      icon: "🧠",
      color: "text-indigo-600",
      title: "ผู้เชี่ยวชาญ AI และ Machine Learning",
      growth: "เติบโต 35% ต่อปี",
    },
    {
      icon: "🛡️",
      color: "text-red-500",
      title: "ผู้เชี่ยวชาญด้านความปลอดภัยไซเบอร์",
      growth: "เติบโต 40% ใน 2 ปี",
    },
    {
      icon: "📊",
      color: "text-blue-600",
      title: "นักวิเคราะห์ข้อมูลและ Data Scientist",
      growth: "เติบโต 30% ต่อปี",
    },
    {
      icon: "🏥",
      color: "text-green-600",
      title: "ผู้เชี่ยวชาญด้าน Digital Healthcare",
      growth: "เติบโต 28% ต่อปี",
    },
    {
      icon: "🌱",
      color: "text-emerald-600",
      title: "นักพัฒนาโซลูชันพลังงานสะอาด",
      growth: "เติบโต 25% ต่อปี",
    },
    {
      icon: "☁️",
      color: "text-cyan-600",
      title: "ผู้เชี่ยวชาญระบบ Cloud Computing",
      growth: "ความต้องการสูงมาก",
    },
    {
      icon: "🤖",
      color: "text-purple-600",
      title: "วิศวกรหุ่นยนต์และระบบอัตโนมัติ",
      growth: "ตลาดขยายตัวเร็ว",
    },
    {
      icon: "🎨",
      color: "text-orange-500",
      title: "นักออกแบบ UX/UI และ Product Designer",
      growth: "ความต้องการต่อเนื่อง",
    },
    {
      icon: "📱",
      color: "text-pink-600",
      title: "นักการตลาดดิจิทัลและ E-commerce",
      growth: "ตลาดเติบโตแรง",
    },
    {
      icon: "🌐",
      color: "text-teal-600",
      title: "ผู้เชี่ยวชาญด้าน Blockchain และ FinTech",
      growth: "อุตสาหกรรมใหม่",
    },
  ];

  return (
    <>
      <div className="my-10 px-6 md:px-20 py-10 bg-white rounded-xl">
        <div className="flex items-center justify-center mb-15">
          <h1 className="text-3xl font-bold text-black text-center">
            10 อาชีพมาแรง ปี 2025
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingCareers.map((career, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-5 flex items-start gap-4 hover:shadow-lg hover:bg-blue-50 transition-all duration-300 border border-gray-100"
            >
              <div className="flex-shrink-0">
                <span className={`${career.color} text-2xl`}>{career.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-800 text-lg font-semibold mb-2">
                  {career.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {career.growth}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ข้อมูลสำคัญ:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• ตลาดงาน AI และ Machine Learning ในไทยเติบโต 35% ต่อปี</li>
            <li>• ความต้องการผู้เชี่ยวชาญด้านไซเบอร์เซกิวริตี้เพิ่มขึ้น 40% ใน 2 ปีที่ผ่านมา</li>
            <li>• อุตสาหกรรม Digital Healthcare ขยายตัวตามนโยบาย Medical Hub</li>
            <li>• พลังงานสะอาดสอดคล้องกับนโยบาย BCG Economy และ Net Zero</li>
          </ul>
        </div>

        <div className="mt-8 text-sm text-right text-gray-500">
          ข้อมูลจาก{" "}
          <a
            href="https://fdirecruit.co.th/blogs/%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%9E%E0%B8%A1%E0%B8%B2%E0%B9%81%E0%B8%A3%E0%B8%87/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            FDI Recruitment Thailand
          </a>
          {" และ "}
          <a
            href="https://www.stamford.edu/th/upcoming-trend-for-career-2025/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Stamford International University
          </a>
          {" (2025)"}
        </div>
      </div>
    </>
  );
};

export default Careers;