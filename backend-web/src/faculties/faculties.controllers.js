import { getAllFacultiesServices, getFacultyByIdServices } from "./faculties.services.js";

const getAllFacultiesController = async (req, res) => {
  try {
    const faculties = await getAllFacultiesServices();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getFacultyByIdController = async (req, res) => {
  const facultyId = parseInt(req.params.id, 10);
  if (isNaN(facultyId)) {
    return res.status(400).json({ error: "Invalid faculty ID" });
  }

  try {
    const faculty = await getFacultyByIdServices(facultyId);
    res.status(200).json(faculty);
  } catch (error) {
    if (error.message === "Faculty not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}

export { getAllFacultiesController, getFacultyByIdController };