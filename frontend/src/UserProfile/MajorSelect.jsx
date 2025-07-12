import React, { useEffect, useState } from "react";
import { getMajorsByFacultyId } from "./userProfileServices.js";

const MajorSelect = ({ facultyId, value, onChange, className }) => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    if (!facultyId) return;
    const fetchMajors = async () => {
      const data = await getMajorsByFacultyId(facultyId);
      setMajors(data);
    };
    fetchMajors();
  }, [facultyId]);

  return (
    <select
      name="major_id"
      value={value}
      onChange={onChange}
      className={`border p-2 w-full ${className || ""}`}
    >
      <option value="">เลือกสาขา</option>
      {majors.map((m) => (
        <option key={m.major_id} value={m.major_id}>
          {m.name}
        </option>
      ))}
    </select>
  );
};

export default MajorSelect;
