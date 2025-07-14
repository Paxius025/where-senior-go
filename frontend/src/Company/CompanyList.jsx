import { useEffect, useRef, useState } from "react";
import { fetchAllCompanies } from "./companyServices/companyService.js";
import { useNavigate } from "react-router-dom";
import { verifySessionOrRedirect } from "../Authentication/services/authHelpers.js";
import ProvinceFilter from "../components/ProvinceFilter.jsx"; // ✅ ใช้ dropdown จังหวัดที่แยกไว้
import SearchBox from "../components/SearchBox.jsx"; // ปรับ path ตามโครงสร้างโปรเจกต์ของคุณ

const CompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  // ✅ state สำหรับตัวกรอง
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    verifySessionOrRedirect(navigate);
  }, []);

  const loadCompanies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetchAllCompanies(offset, limit);

      const newData = res.data;
      const updatedCompanies = [...companies, ...newData];

      setCompanies(updatedCompanies);
      setFilteredCompanies(updatedCompanies); // ✅ เริ่มต้นแสดงทั้งหมด

      setOffset((prev) => prev + res.pageSize);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error("โหลดข้อมูลบริษัทล้มเหลว", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadCompanies();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, hasMore, loading]);

  // ✅ กรองบริษัทตามจังหวัดที่เลือก
  useEffect(() => {
    if (selectedProvince) {
      setFilteredCompanies(
        companies.filter((c) => c.province_name === selectedProvince)
      );
    } else {
      setFilteredCompanies(companies);
    }
  }, [selectedProvince, companies]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let result = companies;

    if (selectedProvince) {
      result = result.filter((c) => c.province_name === selectedProvince);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter((c) =>
        c.company_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCompanies(result);
  }, [selectedProvince, searchQuery, companies]);

  // ฟังก์ชันสำหรับจัดการการคลิกที่บริษัท
  const handleCompanyClick = (companyId) => {
    navigate(`/company/${companyId}/positions`);
  };

  return (
    <>
      <section className="bg-gray-100 h-screen">
        <div className="">
          <div className="px-20 pt-10 flex items-center justify-between">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">บริษัททั้งหมด</h1>
            </div>

            <div className="flex">
              <div className="flex items-start justify-center">
                <SearchBox
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              <div className="flex items-center justify-center">
                {/* ✅ แสดง dropdown จังหวัด */}
                <ProvinceFilter
                  selectedProvince={selectedProvince}
                  onSelectProvince={setSelectedProvince}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 space-y-6 px-20 pt-10 pb-10">
            {filteredCompanies.map((c) => (
              <div
                key={c.company_id}
                className="flex items-center justify-center"
                onClick={() => handleCompanyClick(c.company_id)}
              >
                <div
                  className="bg-white text-lg flex items-center justify-between border-2 border-gray-300 px-10 py-4 rounded shadow
                 cursor-pointer hover:duration-200 hover:text-blue-500 hover:text-xl w-400"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src="https://manastudio.net/assets/images/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89-c29130709e.svg"
                      alt={c.company_name}
                      className="w-24 h-24 object-contain mb-2"
                    />
                    <h2 className="font-bold">{c.company_name}</h2>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-blue-500">{c.province_name}</p>
                    <p className="text-sm text-gray-600">
                      ตำแหน่งงานในบริษัท : {c.total_positions}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ เพิ่มข้อความเมื่อไม่พบข้อมูล */}
          {!loading && filteredCompanies.length === 0 && (
            <div className="w-full text-center py-20 text-gray-500">
              <div className="text-2xl font-semibold mb-2">
                ไม่พบข้อมูลบริษัท
              </div>
              <p className="text-sm text-gray-400">
                ลองเปลี่ยนคำค้นหาหรือเลือกจังหวัดอื่นอีกครั้ง
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CompanyList;
