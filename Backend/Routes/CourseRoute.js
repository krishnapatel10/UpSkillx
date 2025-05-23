import { Router } from "express";
import CourseController from "../Controller/CourseController.js";

let router = Router();
router.get("/", CourseController.getAllCourses); // If getAllCourses is undefined, this will throw the error

export default router
