import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// ดึงข้อมูลผู้ใช้ปัจจุบัน
export const getUserProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/users/profile/me`, {
    withCredentials: true,
  });
  return res.data;
};

// อัปเดตข้อมูลผู้ใช้
export const updateUserProfile = async (updatedData) => {
  const res = await axios.put(`${API_BASE_URL}/users/profile/me`, updatedData, {
    withCredentials: true,
  });
  return res.data;
};

// ดึงคณะทั้งหมด
export const getFaculties = async () => {
  const res = await axios.get(`${API_BASE_URL}/faculties`);
  return res.data;
};

// ดึงสาขาตาม faculty_id
export const getMajorsByFacultyId = async (facultyId) => {
  const res = await axios.get(`${API_BASE_URL}/majors`, {
    params: { faculty_id: facultyId },
  });
  return res.data;
};
