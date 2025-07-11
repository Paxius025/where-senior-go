import { getMajorsFromFacultyIdController} from "./majors.controllers.js";
import express from "express";

const majorsRouter = express.Router();

majorsRouter.get("/", getMajorsFromFacultyIdController);

export default majorsRouter;
