import express from "express";
import {
  getAllUsers,
  fetchMessages,
  sendMessage,
  updateUser,
} from "../controllers/userController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// fetch all users except current user
router.get("/allUsers", Protect, getAllUsers);

// fetch all old Messages between 2 users
router.get("/fetchMessages/:receiverId", Protect, fetchMessages);

// send new Messages between 2 users
router.post("/sendMessage/:receiverId", Protect, sendMessage);

//update user details
router.post("/update", Protect, updateUser);

export default router;
