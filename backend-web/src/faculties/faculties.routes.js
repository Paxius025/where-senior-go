import { getAllFacultiesController} from "./faculties.controllers.js";
import express from "express";

const facultiesRouter = express.Router();

facultiesRouter.get("/", getAllFacultiesController);


export default facultiesRouter;
