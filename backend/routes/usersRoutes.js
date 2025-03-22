import { Router } from "express";
import {
  register,
  login,
  updatedUser,
  deletedUser,
} from "../controllers/usersController.js";
import { verifyToken } from "../utils/jwtUtils.js";

const router = Router();

router.post("/login", verifyToken, login);
router.post("/register", verifyToken, register);
router.put("/:userId", verifyToken, updatedUser);
router.delete("/:userId", verifyToken, deletedUser);

export default router;
