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
      userType: "regular",
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

// ==================== Google Login =====================

export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, id, imageUrl } = req.body;
    if (!imageUrl) {
      // use default photo code
      // placehold.co
      // const imageUrl = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;
      // const photo = {
      //   url: imageUrl,
      // };
    }
    let existingUser = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);

    if (existingUser && existingUser.userType) {
      if (existingUser.userType === "regular") {
        // convert regular user to the hybrid and then login
        existingUser.userType = "hybrid";
        existingUser.googleId = await bcrypt.hash(id, salt);
        await existingUser.save();
      } else {
        // google user case just verify current user and login
        const isVerified = await bcrypt.compare(id, existingUser.googleId);
        if (!isVerified) {
          const error = new Error("User not verified.");
          error.statusCode = 401;
          return next(error);
        }
      }
    } else {
      // register and then login as google user
      const hashGoogleId = await bcrypt.hash(id, salt);
      const newUser = await User.create({
        fullName: name,
        email,
        googleId: hashGoogleId,
        userType: "google",
        // imageUrl: photo,
      });
      existingUser = newUser;
    }

    // gen login token if required
    // genToken(existingUser, res);

    // login now
    res.status(200).json({
      message: "Login successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
