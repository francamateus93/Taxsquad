import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  updatedUser,
  deletedUser,
} from "../controllers/usersController.js";
import { verifyToken } from "../utils/jwtUtils.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/current-user", verifyToken, getCurrentUser);
router.put("/:userId", verifyToken, updatedUser);
router.delete("/:userId", verifyToken, deletedUser);

export default router;
