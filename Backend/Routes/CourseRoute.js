import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js"
import CourseController from "../Controller/CourseController.js";

let router = Router();
// router.get("/", CourseController.getAllCourses); // If getAllCourses is undefined, this will throw the error
// router.get("/:cid", CourseController.getCoursesById);
// router.post("/",CourseController.CreateCourses);
// router.put("/:id", adminMiddleware, CourseController.UpdateCourses);
// router.delete("/:id", adminMiddleware, CourseController.deleteCourses);
// // Admin ko sab courses dikhaye
// // ✅ Protected + Only Admin
// router.get("/admin", authMiddleware, isAdmin, getAllCoursesAdmin);


// ✅ User (auth required)
router.get("/", authMiddleware, CourseController.getAllCourses);
router.get("/:cid", authMiddleware, CourseController.getCoursesById);

// ✅ Admin only
router.post("/", authMiddleware, adminMiddleware, CourseController.CreateCourses);
router.put("/:id", authMiddleware, adminMiddleware, CourseController.UpdateCourses);
router.delete("/:id", authMiddleware, adminMiddleware, CourseController.deleteCourses);
router.get("/admin/all", authMiddleware, adminMiddleware, CourseController.getAllCoursesAdmin);

export default router;
