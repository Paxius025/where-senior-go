import React from "react";

const Footer = () => {
  const articles = [
    {
      id: 1,
      image: "https://mthai.com/app/uploads/2021/05/Occupation2.jpg",
      title: "9 อาชีพมาแรง ปี 2025 ที่คุณควรรู้!",
      description:
        "ปี 2025 งานสายไหนกำลังฮิต? อาชีพไหนมีโอกาศโต ใครกำลังวางแผนอนาคตหรืออยากเปลี่ยนสายงาน รีบเช็กเลย!!...",
    },
    {
      id: 2,
      image:
        "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2021/11/1200_800_after_grad_2.jpg",
      title: "จบแล้ว แล้วไง ไปไหนต่อ ? 8 หนทางชีวิตหลังเรียนจบของเด็กยุคนี้",
      description:
        "เมื่อใช้เวลาในการเรียนมหาวิทยาลัยไปถึง 4 ปี และเรียนจบออกมาด้วยเกรดดีๆ แน่นอนว่าเด็กจบใหม่ก็ต้องคาดหวังไว้ว่าเมื่อเรียนจบแล้วจะมีหน้าที่การงานที่ดี...",
    },
    {
      id: 3,
      image: "https://www.learn.co.th/wp-content/uploads/2024/04/2.1_0.jpg",
      title: "วิธีค้นหา อาชีพที่เหมาะกับเรา ด้วย Checklist 9 ข้อนี้",
      description:
        "อาชีพที่เหมาะกับเรา คืออาชีพอะไรนะ? คำถามยอดฮิตที่ใครหลายคนต้องเคยเสิร์ชหาข้อมูลในอินเทอร์เน็ต ไม่ว่าจะเป็นเด็กจบใหม่หรือคนทำงาน...",
    },
    {
      id: 4,
      image:
        "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2022/3/%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%87%E0%B8%B2%E0%B8%99_Jeff_Bezos_1.jpg",
      title: "รวม 9 คำถามสัมภาษณ์งาน ยอดฮิต! 2025 พร้อมเทคนิคการตอบแบบมือโปร",
      description:
        "ผ่านมาแล้วกับครึ่งปีของ 2025 ใครที่กำลังมองหางานใหม่ หรือกำลังอยู่ในช่วงที่ต้องสัมภาษณ์งาน การเตรียมตัวดีให้เป๊ะ ก่อนไปเจอ HR เป็นเรื่องที่สำคัญ เพราะ 'การสัมภาษณ์งาน' คือ ด่านทดสอบสำคัญที่หลายคนกังวล โดยเฉพาะเมื่อเจอกับคำถามที่ไม่คาดคิด หรือยังไม่รู้จะตอบยังไงให้ดูดีและเป็นมืออาชีพ และคำตอบจะเป็นตัวชี้วัดศักยภาพ ความสามารถ มุมมองความคิด หรือ Mindset องค์รวมของตัวเราอีกด้วย...",
    },
  ];

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-10 lg:py-16 bg-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="article">
            <h1 className="mb-8 lg:mb-12 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800">
              บทความ
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative w-full aspect-[3/2] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-3 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] transition-colors duration-300">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {article.description}
                    </p>

                    <button className="cursor-pointer mt-auto bg-blue-500 px-4 py-2 sm:px-5 sm:py-3 rounded-md text-white text-sm sm:text-base font-medium hover:scale-105 transition-all duration-200 self-start focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      ดูเพิ่มเติม
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </section>

      <footer className="bg-white py-10 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <img
                src="https://jaro-website.s3.ap-south-1.amazonaws.com/2024/05/unnamed-12.png"
                alt="WhereSeniorGo"
                width={500}
                className="h-auto rounded-xl shadow-xl"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Where
                  <span className="text-red-500">Senior</span>
                  Go
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl mt-2 text-gray-700">
                  ค้นหาที่ฝึกงานจากประสบการณ์จริงของรุ่นพี่
                </h2>
              </div>

              <div className="text-base sm:text-lg lg:text-xl space-y-4 text-gray-700">
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
                  <span className="pr-1.5 font-bold">
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
                  — และ{" "}
                  <span className="pr-1.5 font-bold">
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