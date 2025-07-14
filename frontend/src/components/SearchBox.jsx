// 🔍 SearchBox.jsx
import React from "react";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="🔍 ค้นหาชื่อบริษัท..."
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                   focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                   shadow-sm hover:shadow-md text-black font-medium transition duration-150
                   hover:border-blue-300"
      />
    </div>
  );
};

export default SearchBox;
