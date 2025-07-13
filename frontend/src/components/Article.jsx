import React from "react";

const Article = () => {
  const articles = [
    {
      id: 1,
      image: "https://mthai.com/app/uploads/2021/05/Occupation2.jpg",
      title: "9 อาชีพมาแรง โอกาสเติบโตสูง ปี 2025 ที่คุณควรรู้!",
      description:
        "ปี 2025 งานสายไหนกำลังฮิต? อาชีพไหนมีโอกาศโต ใครกำลังวางแผนอนาคตหรืออยากเปลี่ยนสายงาน รีบเช็กเลย!!...",
      link: "https://www.lemon8-app.com/@aimilynp/7465198271812796935?region=th",
    },
    {
      id: 2,
      image:
        "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2021/11/1200_800_after_grad_2.jpg",
      title: "จบแล้ว แล้วไง ไปไหนต่อ ? 8 หนทางชีวิตหลังเรียนจบของเด็กยุคนี้",
      description:
        "เมื่อใช้เวลาในการเรียนมหาวิทยาลัยไปถึง 4 ปี และเรียนจบออกมาด้วยเกรดดีๆ แน่นอนว่าเด็กจบใหม่ก็ต้องคาดหวังไว้ว่าเมื่อเรียนจบแล้วจะมีหน้าที่การงานที่ดี...",
      link: "https://www.mangozero.com/8-ways-after-graduation/",
    },
    {
      id: 3,
      image: "https://www.learn.co.th/wp-content/uploads/2024/04/2.1_0.jpg",
      title: "วิธีค้นหา อาชีพที่เหมาะกับเรา ด้วย Checklist 9 ข้อนี้",
      description:
        "อาชีพที่เหมาะกับเรา คืออาชีพอะไรนะ? คำถามยอดฮิตที่ใครหลายคนต้องเคยเสิร์ชหาข้อมูลในอินเทอร์เน็ต ไม่ว่าจะเป็นเด็กจบใหม่หรือคนทำงาน...",
      link: "https://www.learn.co.th/articles/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%84%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%B2-%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%9E%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%B0/",
    },
    {
      id: 4,
      image:
        "https://storage.googleapis.com/techsauce-prod/ugc/uploads/2022/3/%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%87%E0%B8%B2%E0%B8%99_Jeff_Bezos_1.jpg",
      title: "รวม 9 คำถามสัมภาษณ์งาน ยอดฮิต! 2025 พร้อมเทคนิคการตอบแบบมือโปร",
      description:
        "ผ่านมาแล้วกับครึ่งปีของ 2025 ใครที่กำลังมองหางานใหม่ หรือกำลังอยู่ในช่วงที่ต้องสัมภาษณ์งาน การเตรียมตัวดีให้เป๊ะ ก่อนไปเจอ HR เป็นเรื่องที่สำคัญ เพราะ 'การสัมภาษณ์งาน' คือ ด่านทดสอบสำคัญที่หลายคนกังวล โดยเฉพาะเมื่อเจอกับคำถามที่ไม่คาดคิด หรือยังไม่รู้จะตอบยังไงให้ดูดีและเป็นมืออาชีพ และคำตอบจะเป็นตัวชี้วัดศักยภาพ ความสามารถ มุมมองความคิด หรือ Mindset องค์รวมของตัวเราอีกด้วย...",
      link: "https://today.line.me/th/v3/article/wJym9V5",
    },
  ];

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-10 lg:pt-12 lg:pb-16 bg-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="article">
            <h1 className="mb-8 lg:mb-15 text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800">
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

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer mt-auto bg-blue-500 px-5 py-2 rounded-md text-white text-sm font-medium 
                    hover:scale-105 transition-all duration-200 self-start focus:outline-none  focus:ring-blue-500 focus:ring-offset-2
                    sm:px-5 sm:py-3 sm:text-base"
                    >
                      ดูเพิ่มเติม
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Article;
