import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { fetchAllPositionsInCompany } from "./companyServices/companyService.js";
import { verifySessionOrRedirect } from "../Authentication/services/authHelpers.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import SearchBox from "../components/SearchBox.jsx";

const CompanyPositionList = () => {
  const { companyId } = useParams();
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchAllPositionsInCompany(companyId);
        setPositions(data.positions);
        
      } catch (err) {
        console.error(err);
      }
    };
    loadPositions();
  }, [companyId]);

  const companyName = positions.length > 0 ? positions[0].name : '';

  useEffect(() => {
    verifySessionOrRedirect(navigate);
  }, [navigate]);

  function PositionList({ positions }) {
    const groupedPositions = useMemo(() => {
      return positions.reduce((acc, pos) => {
        const field = pos.field_name || "ไม่ระบุสายงาน";
        if (!acc[field]) acc[field] = [];
        acc[field].push(pos);
        return acc;
      }, {});
    }, [positions]);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">ตำแหน่งในบริษัท {companyName}</h1>
        {positions.length === 0 ? (
          <p>ไม่พบตำแหน่งงาน</p>
        ) : (
          Object.entries(groupedPositions).map(([fieldName, fieldPositions]) => (
            <div key={fieldName} className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-2">สายงาน: {fieldName}</h2>
              <ul className="space-y-4">
                {fieldPositions.map((pos) => (
                  <li key={pos.position_id} className="border p-4 rounded">
                    <h3 className="text-lg font-semibold">{pos.title}</h3>
                    <p className="text-sm text-gray-700">{pos.description}</p>

                    <button
                    onClick={() =>
                      navigate(`/company/${companyId}/position/${pos.position_id}/reviews`)
                    }
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    ดูรีวิว
                  </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
    );
  }
  return <PositionList positions={positions} />;
};

export default CompanyPositionList;
