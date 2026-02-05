import express from "express";
import {
  UserLogin,
  UserSignUp,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", UserSignUp);
router.post("/login", UserLogin);

export default router;