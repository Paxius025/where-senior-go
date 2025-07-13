import { useEffect, useState } from "react";
import { fetchTopFiveCompanies } from "../dashboardServices/companyService.js";
import '../../styles/TopCompanies.css';


const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchTopFiveCompanies();
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching top companies:", err);
      }
    };
    loadCompanies();
  }, []);

  return (
    <>
      <div className="mt-8 bg-gray-100 pt-20">
        <div className="">
          <h3 className="text-center text-3xl font-bold">
            5 บริษัทที่มีรีวิวมากที่สุด
          </h3>
        </div>

        <div className=" flex items-center justify-center">
          <div
            className="cardCompany grid grid-cols-5 gap-y-10 gap-x-10 
            max-sm:grid-cols-1
            max-md:grid-cols-2
            max-lg:grid-cols-2
            max-xl:grid-cols-3
            max-2xl:grid-cols-4
            overflow-x-auto py-15 px-5"
          >
            {companies.map((company) => (
              <div
                key={company.company_id}
                className="flex-shrink-0 w-80 border-2 border-gray-300 rounded px-4 py-6 shadow-xl
            cursor-pointer hover:scale-110 hover:duration-200 bg-white"
              >
                <img
                  // src={company.logo_url}
                  src="https://manastudio.net/assets/images/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89-c29130709e.svg"
                  alt={company.company_name}
                  className="w-42 h-24 object-contain mb-2 mx-auto"
                />

                <div className="text-center">
                  <h4 className="mt-2 mb-4 text-lg font-bold">
                    {company.company_name}
                  </h4>
                </div>

                <div className="text-left">
                  <p className="text-sm text-gray-600">
                    จังหวัด: {company.province_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    รีวิวทั้งหมด: {company.review_count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCompanies;
