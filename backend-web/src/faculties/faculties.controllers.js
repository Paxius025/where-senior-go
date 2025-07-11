import { getAllFacultiesServices, getMajorsFromFacultyIdServices } from "./faculties.services.js";

const getFacultyByIdController = async (req, res) => {
  try {
    const faculties = await getAllFacultiesServices();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getMajorsFromFacultyIdController = async (req, res) => {
  const faculty_id = parseInt(req.params.id, 10);
  if (isNaN(faculty_id)) {
    return res.status(400).json({ error: "Invalid faculty ID" });
  }

  try {
    const faculty = await getMajorsFromFacultyIdServices(faculty_id);
    res.status(200).json(faculty);
  } catch (error) {
    if (error.message === "Faculty not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}

export { getFacultyByIdController, getMajorsFromFacultyIdController };