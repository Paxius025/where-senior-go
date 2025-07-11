import { getAllFacultiesServices} from "./faculties.services.js";

const getAllFacultiesController = async (req, res) => {
  try {
    const faculties = await getAllFacultiesServices();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getAllFacultiesController };