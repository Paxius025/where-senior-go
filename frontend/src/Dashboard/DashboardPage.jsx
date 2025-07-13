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

    Swal.fire("Success", "ทำรายการสำเร็จ", "success");
  };

  return (
    <>
      <nav>
        <Navbar />
        <Header />
      </nav>

      <section>
        <div className="">
          <TopCompanies />

          <div className="flex items-center justify-center mb-10 bg-gray-100 pb-20">
            <button
              onClick={handleClickSecureAction}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer
            hover:scale-110"
            >
              ดูเพิ่มเติม
            </button>
          </div>
        </div>

        <Careers />
      </section>

      <footer className="">
        <Article />
        <Footer />
      </footer>
    </>
  );
}
