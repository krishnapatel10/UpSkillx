const router = require("./router");
import EnrollController from "../Controller/EnrollController.js";


// let router = Router();

router.get("/getEnrolls/:uid",EnrollController.getEnrolls);
router.post("/addNewEnroll",EnrollController.createEnroll);


export default router;
