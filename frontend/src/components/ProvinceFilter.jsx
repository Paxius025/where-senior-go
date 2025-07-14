import React from "react";
import ThailandProvinces from "../components/ThailandProvinces"; // ปรับ path ตามที่เก็บไฟล์จริง
import { HiChevronDown, HiLocationMarker } from "react-icons/hi";

const ProvinceFilter = ({ selectedProvince, onSelectProvince }) => {
  const provinces = ThailandProvinces;

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        {/* Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
          <HiLocationMarker size={20} />
        </div>

        {/* Select */}
        <select
          value={selectedProvince}
          onChange={(e) => onSelectProvince(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl 
                   bg-white text-gray-500 font-medium
                   focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                   hover:border-blue-300 
                   transition-all duration-200 ease-in-out
                   appearance-none cursor-pointer
                   shadow-sm hover:shadow-md"
        >
          <option value="" className="text-gray-500">
            ทุกจังหวัด
          </option>
          {provinces.map((province) => (
            <option key={province} value={province} className="text-gray-500">
              {province}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <HiChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default ProvinceFilter;
