import express from 'express';
import { getAllUsers,singleUser,createUser,updateUser,deleteUser,forgotPassword,resetPassword,changePassword } from "../controller/users.js";
import protect from "../middleware/auth.js"

const router = express.Router();

router.get("/api/getAllUsers",getAllUsers);
router.post("/api/createUser",createUser);
router.get("/api/getSingleUser/:id", singleUser);
router.put("/api/updateUser/:id",updateUser);
router.delete("/api/removeUser/:id",deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/change-password/:userId", changePassword);


export default router;