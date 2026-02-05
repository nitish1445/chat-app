import express from "express";
import {
  UserLogin,
  UserSignUp,
  GoogleLogin,
} from "../controllers/authController.js";
import { GoogleProtect } from "../middlewares/googleProtect.js";

const router = express.Router();
router.post("/signup", UserSignUp);
router.post("/login", UserLogin);
router.post("/googleLogin", GoogleProtect, GoogleLogin);

export default router;
