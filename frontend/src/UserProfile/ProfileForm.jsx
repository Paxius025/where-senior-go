import React, { useState } from 'react';
import { updateUserProfile } from './userProfileServices.js';
import FacultySelect from './FacultySelect.jsx';
import MajorSelect from './MajorSelect.jsx';

const ProfileForm = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    contact: user.contact || '',
    ku_year: user.ku_year || '',
    faculty_id: user.faculty_id || '',
    faculty_name: user.faculty_name || '',
    major_id: user.major_id || '',
    major_name: user.major_name || '',
  });

  console.log("Initial formData:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert("อัปเดตโปรไฟล์สำเร็จ");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการอัปเดต");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ลงทะเบียนนักศึกษา</h2>
        <p className="text-gray-600">กรอกข้อมูลส่วนตัวของท่าน</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ใช้</label>
        <input 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="ชื่อผู้ใช้" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
        <input 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="อีเมล" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
        <input 
          name="contact" 
          value={formData.contact} 
          onChange={handleChange} 
          placeholder="เบอร์โทร" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">รหัสนักศึกษา (KU Year)</label>
        <input 
          name="ku_year" 
          value={formData.ku_year} 
          onChange={handleChange} 
          placeholder="KU เช่น 83" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">คณะ</label>
        <FacultySelect selectedFaculty={formData.faculty_id} onFacultyChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">สาขาวิชา</label>
        <MajorSelect facultyId={formData.faculty_id} value={formData.major_id} onChange={handleChange} />
      </div>

      <div className="flex space-x-2 pt-4">
        <button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
        >
          บันทึก
        </button>
        <button 
          type="button" 
          onClick={() => setFormData({ username: '', email: '', contact: '', ku_year: '', faculty_id: '', major_id: '' })} 
          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg"
        >
          เคลียร์
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
