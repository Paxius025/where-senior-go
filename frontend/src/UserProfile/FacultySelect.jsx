import React, { useState, useEffect } from 'react';
import { getFaculties } from './userProfileServices.js';

const FacultySelect = ({ selectedFaculty, onFacultyChange }) => {
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        const fetchFaculties = async () => {
            const data = await getFaculties();
            setFaculties(data);
        };
        fetchFaculties();
    }, []);
    return (
        <select name="faculty_id" value={selectedFaculty?.toString() || ""} onChange={onFacultyChange} className="border p-2 w-full">
            <option value="">เลือกคณะ</option>
            {faculties.map((f) => (
                <option key={f.faculty_id} value={f.faculty_id.toString()}>{f.name}</option>
            ))}
            </select>
        );
    };
    export default FacultySelect;