import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.jsx";
import SearchBox from "../components/SearchBox.jsx";
import { handleClickSecureAction } from "./requireLoginFunction.js";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <button
          onClick={() => handleClickSecureAction(navigate, () => {
            Swal.fire("Success", "คุณกำลัง Login ค้าบอ้วง!", "success");
          })}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          ปุ่มที่ต้องล็อกอินก่อนกด
        </button>
      </div>
    </div>
  );
}
