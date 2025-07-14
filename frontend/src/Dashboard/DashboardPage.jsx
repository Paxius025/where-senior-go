import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar.jsx";
import { checkSession } from "../Authentication/services/authService.js";
import Footer from "../components/Footer.jsx";
import Article from "../components/Article.jsx";
import Header from "../components/Header.jsx";
import TopCompanies from "./dashboardComponents/TopCompanies.jsx";
import Careers from "../components/Careers.jsx";

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
    navigate("/company");
  };

  return (
    <>
      <nav>
        <Navbar />
        <Header />
      </nav>

      <div className="bg-gray-100 pb-20">
        <TopCompanies />

        <div className="flex items-center justify-center">
          <button
            onClick={handleClickSecureAction}
            className="cursor-pointer text-xl mt-4 bg-blue-500 text-white px-6 py-2.5 rounded
            hover:scale-110 hover:duration-200"
          >
            ดูเพิ่มเติม
          </button>
        </div>
      </div>

      <footer className="">
        <Careers />
        <Article />
        <Footer />
      </footer>
    </>
  );
}
