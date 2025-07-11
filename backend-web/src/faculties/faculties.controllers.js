import { getAllFacultiesServices} from "./faculties.services.js";

const getAllFacultiesController = async (req, res, next) => {
  try {
    const faculties = await getAllFacultiesServices();
    res.status(200).json(faculties);
  } catch (error) {
    next(error);
  }
}

export { getAllFacultiesController };