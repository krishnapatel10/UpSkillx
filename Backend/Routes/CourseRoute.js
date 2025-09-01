import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import CourseController from "../Controller/CourseController.js";

let router = Router();

// ✅ User (auth required)
// ✅ Ye sab pehle hi auth se protected hai (kyunki server.js me laga hai)
router.get("/", CourseController.getAllCourses); // If getAllCourses is undefined, this will throw the error
router.get("/:cid", CourseController.getCoursesById);

router.post("/",authMiddleware,CourseController.CreateCourses);
router.put("/:id", authMiddleware, CourseController.UpdateCourses);
router.delete("/:id", authMiddleware, CourseController.deleteCourses);

// ✅ Sirf admin ke liye
router.get("/admin",CourseController.getAdminCourses);// Admin ko sab courses dikhaye



// ✅ User (auth required)
// router.get("/", authMiddleware, CourseController.getAllCourses);
// router.get("/:cid", authMiddleware, CourseController.getCoursesById);

// // ✅ Admin only
// router.post("/", authMiddleware, adminMiddleware, CourseController.CreateCourses);
// router.put("/:id", authMiddleware, adminMiddleware, CourseController.UpdateCourses);
// router.delete("/:id", authMiddleware, adminMiddleware, CourseController.deleteCourses);
// router.get("/admin/all", authMiddleware, adminMiddleware, CourseController.getAllCoursesAdmin);

export default router;
