import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { fetchAllPositionsInCompany } from "./companyServices/companyService.js";
import { verifySessionOrRedirect } from "../Authentication/services/authHelpers.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

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
        <nav>
          <Navbar />
          <p className="text-blue-500 text-3xl absolute z-50 px-2 py-2 max-sm:px-6 max-sm:py-10 max-md:px-8 max-md:py-10 max-lg:px-8 max-lg:py-10">
            <Link to="/company">
              <IoArrowBack />
            </Link>
          </p>
        </nav>

        <div className="p-4 mt-10">
          <h1 className="text-3xl text-center font-bold mb-4">
            ตำแหน่งในบริษัท
          </h1>
          {positions.length === 0 ? (
            <p>ไม่พบตำแหน่งงาน</p>
          ) : (
            Object.entries(groupedPositions).map(
              ([fieldName, fieldPositions]) => (
                <div key={fieldName} className="mb-6 mt-10">
                  <h2 className="text-lg font-bold text-blue-700 mb-2">
                    สายงาน: {fieldName}
                  </h2>
                  <ul className="space-y-4">
                    {fieldPositions.map((pos) => (
                      <li key={pos.position_id} className="border p-4 rounded">
                        <h3 className="text-lg font-semibold">{pos.title}</h3>
                        <p className="text-sm text-gray-700">
                          {pos.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )
          )}
        </div>
      </>
    );
  }
  return <PositionList positions={positions} />;
};

export default CompanyPositionList;
