import { getFacultyByIdController, getMajorsFromFacultyIdController} from "./faculties.controllers.js";
import express from "express";

const facultiesRouter = express.Router();

facultiesRouter.get("/:id", getFacultyByIdController);
facultiesRouter.get("/:id/majors", getMajorsFromFacultyIdController);

export default facultiesRouter;
