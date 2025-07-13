import React, { useState, useEffect } from "react";
import { updateUserProfile } from "./userProfileServices.js";
import FacultySelect from "./FacultySelect.jsx";
import MajorSelect from "./MajorSelect.jsx";
import { checkSession } from "../Authentication/services/authService.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const requiredFields = [
  { key: "username", label: "ชื่อผู้ใช้" },
  { key: "email", label: "อีเมล" },
  { key: "contact", label: "ช่องทางติดต่อ" },
  { key: "ku_year", label: "รหัสนิสิต" },
  { key: "faculty_id", label: "คณะ" },
  { key: "major_id", label: "สาขา" },
  { key: "role", label: "บทบาท" },
];


const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    contact: user.contact || "",
    ku_year: user.ku_year || "",
    faculty_id: user.faculty_id || "",
    faculty_name: user.faculty_name || "",
    major_id: user.major_id || "",
    major_name: user.major_name || "",
    role: user.role || "",
  });

  const [role, setRole] = useState(user.role || ""); // Initialize role from user data
  const [, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();
        setIsLoggedIn(true);
        setRole(session.role);
        setFormData((prev) => ({ ...prev, role: session.role ?? "" }));
        console.log("Session role:", session.role);
      } catch {
        setIsLoggedIn(false);
        setRole("");
      }
    };

    verifySession();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let field of requiredFields) {
      if (
        !formData[field.key] ||
        formData[field.key].toString().trim() === ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "ข้อมูลไม่ครบถ้วน",
          text: `กรุณากรอก ${field.label}`,
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: true,
        });
        return;
      }
    }

    try {
      await updateUserProfile(formData);
      Swal.fire({
        icon: "success",
        title: "อัปเดตโปรไฟล์สำเร็จ",
        text: "ระบบกำลังนำคุณไปยังหน้าแรก",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัปเดตโปรไฟล์ได้ กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex px-10 w-300">
          <div className="flex-1 my-10 flex flex-col items-center justify-center bg-white shadow-xl rounded-l-xl">
            <div className="">
              <img
                src="https://static.vecteezy.com/system/resources/previews/021/770/056/non_2x/avatar-of-a-student-character-free-vector.jpg"
                alt=""
                width={300}
                className="rounded-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-col justify-center items-center">
              <ul>
                <li className="py-2">ชื่อผู้ใช้ : {formData.username}</li>
                <hr className="text-gray-300" />
                <li className="py-2">อีเมล : {formData.email}</li>
                <hr className="text-gray-300" />
                <li className="py-2">เบอร์โทรศัพท์ : {formData.contact}</li>
                <hr className="text-gray-300" />
                <li className="py-2">รหัสนักศึกษา : {formData.ku_year}</li>
                <hr className="text-gray-300" />
                <li className="py-2">คณะ : {formData.faculty_name}</li>
                <hr className="text-gray-300" />
                <li className="py-2">สาขาวิชา : {formData.major_name}</li>
                <hr className="text-gray-300" />
              </ul>
            </div>
          </div>

          <div className="py-10 flex-1">
            <form
              onSubmit={handleSubmit}
              className="max-w-5xl mx-auto bg-white rounded-r-xl  shadow-xl p-8 space-y-6"
            >
              {/* <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  ลงทะเบียนนักศึกษา
                </h2>
                <p className="text-gray-600">กรอกข้อมูลส่วนตัวของท่าน</p>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ใช้
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="ชื่อผู้ใช้"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="อีเมล"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="เบอร์โทร"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสนักศึกษา (KU Year)
                </label>
                <input
                  name="ku_year"
                  value={formData.ku_year}
                  onChange={handleChange}
                  placeholder="KU เช่น 83"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div className="mb-4"></div>
              <label className="block mb-1 font-semibold text-gray-700">
                นิสิต / รุ่นพี่
              </label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setFormData((prev) => ({ ...prev, role: e.target.value })); // ✅ sync เข้า formData ทันที
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  เลือกบทบาท
                </option>
                <option value="nisit">นิสิต</option>
                <option value="senior">รุ่นพี่</option>
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  คณะ
                </label>
                <FacultySelect
                  selectedFaculty={formData.faculty_id}
                  onFacultyChange={handleChange}
                  className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent outline-none transition-all 
                  duration-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สาขาวิชา
                </label>
                <MajorSelect
                  facultyId={formData.faculty_id}
                  value={formData.major_id}
                  onChange={handleChange}
                  className="w-full px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent outline-none transition-all 
                  duration-200 bg-white"
                />
              </div>

              <div className="flex space-x-2 pt-4 gap-10">
                <button
                  type="submit"
                  className="cursor-pointer flex-1 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform 
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                >
                  บันทึก
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      contact: "",
                      ku_year: "",
                      faculty_id: "",
                      major_id: "",
                      role: "",
                    })
                  }
                  className="cursor-pointer flex-1 bg-white hover:from-gray-600 hover:to-gray-700 text-blue-500 font-semibold py-3 px-6 rounded-xl
                  transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg"
                >
                  เคลียร์
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
