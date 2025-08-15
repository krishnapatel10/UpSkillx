import { Router } from "express";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import CourseController from "../Controller/CourseController.js";

let router = Router();
router.get("/", CourseController.getAllCourses); // If getAllCourses is undefined, this will throw the error
router.get("/:cid", CourseController.getCoursesById);
router.post("/",CourseController.CreateCourses);
router.put("/:id", adminMiddleware, CourseController.UpdateCourses);
router.delete("/:id", adminMiddleware, CourseController.deleteCourses);

export default router;
