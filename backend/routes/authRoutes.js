import { Router } from "express";
import {
  register,
  login,
  updatedUser,
  deletedUser,
} from "../controllers/authController.js";
import { verifyToken } from "../utils/jwtUtils.js";

const router = Router();

router.post("/register", verifyToken, register);
router.post("/login", verifyToken, login);
router.put("/users/:userId", verifyToken, updatedUser);
router.delete("/users/:userId", verifyToken, deletedUser);

export default router;
