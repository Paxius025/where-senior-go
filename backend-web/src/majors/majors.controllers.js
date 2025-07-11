import { getMajorsFromFacultyIdServices } from "./majors.services.js";

const getMajorsFromFacultyIdController = async (req, res, next) => {
  const faculty_id = parseInt(req.query.faculty_id, 10);
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
    next(error);
  }
};

export { getMajorsFromFacultyIdController };
