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

        <div className="pt-15 px-20 bg-gray-100 h-screen">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="text-3xl font-bold">
                ตำแหน่งในบริษัท
              </h1>
            </div>
            <div className="flex items-start justify-center">
              <SearchBox
                // searchQuery={searchQuery}
                // setSearchQuery={setSearchQuery}
              />
            </div>{" "}
          </div>

          <div className="">
            {positions.length === 0 ? (
              <p>ไม่พบตำแหน่งงาน</p>
            ) : (
              Object.entries(groupedPositions).map(
                ([fieldName, fieldPositions]) => (
                  <div key={fieldName} className="mb-6 mt-10">
                    <div className="">
                      <h2 className="text-2xl font-bold text-black mb-2">
                        สายงาน : {fieldName}
                      </h2>
                    </div>

                    <div className="mt-4">
                      <ul className="space-y-4">
                        {fieldPositions.map((pos) => (
                          <li
                            key={pos.position_id}
                            className="px-10 py-6 flex items-center justify-between border-2 border-gray-300 bg-white p-4 rounded
                            hover:text-blue-500"
                          >
                            <div className="">
                              <h3 className="text-xl font-semibold">
                                <span className="">
                                  ตำแหน่ง :
                                  </span> {pos.title}
                              </h3>
                              <p className="mt-2 text-md text-gray-700">
                                หน้าที่รับผิดชอบ : {pos.description}
                              </p>
                            </div>

                            <div className="">
                              <div className="">
                                <h1 className="text-gray-500">
                                  จำนวนรีวิว 1 รีวิว
                                </h1>
                              </div>

                              <div className="mt-2">
                                <button
                                  className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer
                                  hover:scale-110 hover:duration-200"
                                >
                                  ดูเพิ่มเติม
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </>
    );
  }
  return <PositionList positions={positions} />;
};

export default CompanyPositionList;
