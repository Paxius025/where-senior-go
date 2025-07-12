import React from "react";

export default function SearchBox({
  placeholder = "ค้นหา...",
  value,
  onChange,
  className,
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
