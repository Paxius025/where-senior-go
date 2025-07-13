import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white py-10 lg:py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <img
                src="https://jaro-website.s3.ap-south-1.amazonaws.com/2024/05/unnamed-12.png"
                alt="WhereSeniorGo"
                width={450}
                className="h-auto rounded-xl shadow-xl bg-white p-4 hover:scale-110 hover:duration-200"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-xl sm:text-xl lg:text-3xl font-bold">
                  Where
                  <span className="text-red-500">Senior</span>
                  Go
                </h1>
                <h2 className="text-lg sm:text-lg lg:text-xl mt-2 text-gray-700">
                  ค้นหาที่ฝึกงานจากประสบการณ์จริงของรุ่นพี่
                </h2>
              </div>

              <div className="text-base sm:text-md lg:text-lg space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  เว็บไซต์ที่พัฒนาเพื่อช่วยให้นักศึกษาฝึกงานสามารถเลือกสถานที่ฝึกงานได้อย่างมั่นใจ
                  ผ่าน
                  <strong className="text-gray-900">
                    {" "}
                    รีวิวจริงจากรุ่นพี่
                  </strong>{" "}
                  ที่เคยผ่านการฝึกงานในบริษัทต่าง ๆ ทั่วประเทศ
                </p>

                <p className="leading-relaxed">
                  <span className="pr-1.5 font-bold text-black">
                    Where
                    <span className="text-red-500">Senior</span>
                    Go
                  </span>
                  จะช่วยให้คุณค้นหาสถานที่ฝึกงานที่เหมาะกับเป้าหมายของคุณ
                  พร้อมข้อมูลสำคัญ เช่น สิ่งที่ได้เรียนรู้จริง บรรยากาศการทำงาน
                  และคำแนะนำตรงจากรุ่นพี่
                </p>

                <p className="leading-relaxed">
                  เพราะการฝึกงานไม่ใช่แค่เก็บชั่วโมง แต่คือ{" "}
                  <strong className="text-gray-900">จุดเริ่มต้นของอาชีพ</strong>{" "}
                  และ{" "}
                  <span className="pr-1.5 font-bold text-black">
                    Where
                    <span className="text-red-500">Senior</span>
                    Go
                  </span>{" "}
                  อยากเป็นคู่มือให้คุณก้าวอย่างมั่นใจ
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
