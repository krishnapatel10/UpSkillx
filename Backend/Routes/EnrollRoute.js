import { Router } from "express";
import EnrollController from "../Controller/EnrollController.js";


let router = Router();

router.get("/getAllEnroll", EnrollController.getAllEnroll);
router.get("/getEnrolls/:uid",EnrollController.getEnrolls);
router.post("/addNewEnroll",EnrollController.createEnroll);


export default router;
