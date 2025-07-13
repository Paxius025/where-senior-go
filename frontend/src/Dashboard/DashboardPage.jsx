import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.jsx";
import { checkSession } from "../Authentication/services/authService.js";
import Footer from "../components/Footer.jsx";
import Article from "../components/Article.jsx";
import Header from "../components/Header.jsx";

export default function DashboardPage() {
  const navigate = useNavigate();

  const requireLogin = async () => {
    try {
      await checkSession();
      return true;
    } catch {
      const result = await Swal.fire({
        icon: "warning",
        title: "กรุณาเข้าสู่ระบบ",
        text: "คุณต้องล็อกอินก่อนทำรายการนี้",
        showCancelButton: true,
        confirmButtonText: "เข้าสู่ระบบ",
        cancelButtonText: "ยกเลิก",
      });
      if (result.isConfirmed) {
        navigate("/login");
      }
    }
  };

  const handleClickSecureAction = async () => {
    const allowed = await requireLogin();
    if (!allowed) return;

    Swal.fire("Success", "ทำรายการสำเร็จ", "success");
  };

  return (
    <>
      <nav>
        <Navbar />
        <Header />
      </nav>

      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-2 text-gray-700">
          ข้อมูลคร่าวๆ สามารถดูได้โดยไม่ต้องล็อกอิน
        </p>

        <button
          onClick={handleClickSecureAction}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          ปุ่มที่ต้องล็อกอินก่อนกด
        </button>
      </div>

      <footer className="">
        <Article />
        <Footer />
      </footer>
    </>
  );
}
