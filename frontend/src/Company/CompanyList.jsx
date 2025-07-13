import { useEffect, useRef, useState } from "react";
import { fetchAllCompanies } from "./companyServices/companyService.js";
import { useNavigate } from "react-router-dom";
import { verifySessionOrRedirect } from "../Authentication/services/authHelpers.js";

const CompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    verifySessionOrRedirect(navigate);
  }, []);

  const loadCompanies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetchAllCompanies(offset, limit);
      // ตรวจสอบโครงสร้างของ res.data ก่อนนำไปใช้
      // ถ้า res.data เป็น array โดยตรง:
      setCompanies((prev) => [...prev, ...res.data]); // บรรทัด 26 ใน CompanyList.jsx ที่เกิด error เดิม
      // ถ้า res.data เป็น object ที่มี array อยู่ใน property 'data' (หรือชื่ออื่น):
      // setCompanies((prev) => [...prev, ...res.data.data]); // ตัวอย่างถ้า API คืน { data: [...] }
      // setCompanies((prev) => [...prev, ...res.data.companies]); // ตัวอย่างถ้า API คืน { companies: [...] }

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

  // ฟังก์ชันสำหรับจัดการการคลิกที่บริษัท
  const handleCompanyClick = (companyId) => {
    navigate(`/company/${companyId}/positions`);
  };

  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 space-y-6 px-20 pt-10 pb-10">
        {companies.map((c) => (
          <div
            key={c.company_id}
            className="flex items-center justify-center" // เพิ่ม cursor-pointer และ hover effect
            onClick={() => handleCompanyClick(c.company_id)} // เพิ่ม onClick ตรงนี้
          >
            <div
              className="bg-white flex items-center justify-between border-2 border-gray-300 px-10 py-4 rounded shadow
                       cursor-pointer duration-200 hover:scale-110 w-400"
            >
              <div className="flex items-center justify-center gap-4">
                <img
                  // src={c.logo_url}
                  src="https://manastudio.net/assets/images/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89-c29130709e.svg"
                  alt={c.company_name}
                  className="w-24 h-24 object-contain mb-2"
                />
                <h2 className="text-lg font-bold">{c.company_name}</h2>
              </div>

              <div className="text-right">
                {" "}
                {/* เปลี่ยนเป็น text-right เพื่อให้ชิดขวา */}
                <p className="text-sm text-gray-600">{c.province_name}</p>
                <p className="text-sm text-gray-600">
                  ตำแหน่งงานในบริษัท : {c.total_positions}
                </p>
                {/* <button // ลบปุ่มนี้ออก หรือคอมเมนต์ไว้
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate(`/company/${c.company_id}/positions`)}
              >
                ดูตำแหน่งงาน
              </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="mt-4 text-center">กำลังโหลด...</p>}
      <div ref={loaderRef} className="h-10" /> {/* ใช้สำหรับสังเกต scroll */}
    </div>
  );
};

export default CompanyList;
