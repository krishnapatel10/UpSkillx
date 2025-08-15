const router = require("./router");
import UserController from "../Controller/UserController.js";


// let router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

router.post("/login", UserController.loginUser);
router.post("/signup", UserController.createUser);

router.put("/:id", UserController.UpdateUser);
router.delete("/:id", UserController.deleteUser); 

export default router;
