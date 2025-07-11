import { checkSession } from "../Authentication/services/authService.js";
import Swal from "sweetalert2";

const requireLogin = async (navigate) => {
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
    if (result.isConfirmed && typeof navigate === "function") {
      navigate("/login");
    }
    return false;
  }
};

export const handleClickSecureAction = async (navigate, callback) => {
  const allowed = await requireLogin(navigate);
  if (!allowed) return;

  if (typeof callback === "function") {
    callback();
  } else {
    Swal.fire("Success", "ทำรายการสำเร็จ", "success");
  }
};