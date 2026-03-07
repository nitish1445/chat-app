import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModal.js";
import { dummyUsers } from "./dummyUser.js";
import bcrypt from "bcrypt";

const seedUsers = async () => {
  try {
    await connectDB();
    console.log("DB connected successfully");
    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users cleared");
    // Hash passwords and create users
    const usersWithHashedPasswords = await Promise.all(
      dummyUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      }),
    );
    await User.insertMany(usersWithHashedPasswords);
    console.log("Dummy users seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
