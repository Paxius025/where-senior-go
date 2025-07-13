import { useEffect, useState } from "react";
import { fetchTopFiveCompanies } from "../dashboardServices/companyService.js";

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
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">5 บริษัทที่มีรีวิวมากที่สุด</h3>
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {companies.map((company) => (
        <div
          key={company.company_id}
          className="flex-shrink-0 w-64 border rounded p-4 shadow hover:shadow-lg transition"
        >
          <img
            src={company.logo_url}
            alt={company.company_name}
            className="w-24 h-24 object-contain mb-2 mx-auto"
          />
          <h4 className="text-lg font-bold">{company.company_name}</h4>
          <p className="text-sm text-gray-600">จังหวัด: {company.province_name}</p>
          <p className="text-sm text-gray-500">รีวิวทั้งหมด: {company.review_count}</p>
        </div>
      ))}
    </div>
  </div>
); 
};

export default TopCompanies;
