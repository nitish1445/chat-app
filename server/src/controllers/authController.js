import User from "../models/userModal.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/genToken.js";

//================ Register new User ===================

export const UserSignUp = async (req, res, next) => {
  try {
    // fetch data from frontend
    const { fullName, email, phone, password } = req.body;

    // check all the required data
    if (!fullName || !email || !phone || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    // check for duplicate user before registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email Already Registered");
      error.statusCode = 409;
      return next(error);
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // save data to database
    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashPassword,
    });

    // send respone to frontend
    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    next(error);
  }
};

//==================== Login Existing user ===============

export const UserLogin = async (req, res, next) => {
  try {
    // fetch data from frontend
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    // check if user is register or not?
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not Registered");
      error.statusCode = 401;
      return next(error);
    }

    // verify the password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't matched");
      error.statusCode = 401;
      return next(error);
    }

    // Token Generation
    genToken(existingUser, res);

    // send mesage to frontend
    res.status(200).json({ message: "Login Successfull", data: existingUser });
    // end
  } catch (error) {
    next(error);
  }
};
