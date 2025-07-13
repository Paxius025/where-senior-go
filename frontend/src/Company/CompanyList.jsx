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
      setCompanies((prev) => [...prev, ...res.data]);
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

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4"> {}
        {companies.map((c) => (
          <div key={c.company_id} className="border p-4 rounded shadow">
            <img
              src={c.logo_url}
              alt={c.company_name}
              className="w-24 h-24 object-contain mb-2"
            />
            <h2 className="text-lg font-bold">{c.company_name}</h2>
            <p className="text-sm text-gray-600">{c.province_name}</p>
            <p className="text-sm text-gray-600">ตำแหน่งงานในบริษัท : {c.total_positions}</p>
             <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() =>
                navigate(`/company/${c.company_id}/positions`)
              }
            >
              ดูตำแหน่งงาน
            </button>
          </div>
        ))}
      </div>

      {loading && <p className="mt-4 text-center">กำลังโหลด...</p>}
      <div ref={loaderRef} className="h-10" /> {/* ใช้สำหรับสังเกต scroll */}
    </div>
  );
};

export default CompanyList;
