import mongoose from "mongoose";
import Message from "../models/messageModal.js";
import User from "../models/userModal.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }
    const filteredUsers = users.filter(
      (user) => user._id.toString() !== currentUser._id.toString(),
    );
    res.status(200).json({ data: filteredUsers });
  } catch (error) {
    next(error);
  }
};

export const getRecentChats = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const rawId = currentUser._id || currentUser.id;

    if (!rawId) {
      const error = new Error("User ID missing");
      error.statusCode = 400;
      return next(error);
    }

    if (!mongoose.isValidObjectId(rawId)) {
      const error = new Error("Invalid user ID");
      error.statusCode = 400;
      return next(error);
    }

    const userId = new mongoose.Types.ObjectId(rawId);

    const recentChats = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId",
            ],
          },
          lastMessage: { $first: "$$ROOT" },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          _id: "$_id",
          fullName: "$user.fullName",
          email: "$user.email",
          timestamp: "$lastMessage.createdAt",
          lastMessage: {
            message: "$lastMessage.message",
            senderId: "$lastMessage.senderId",
            receiverId: "$lastMessage.receiverId",
            createdAt: "$lastMessage.createdAt",
          },
        },
      },

      {
        $sort: { "lastMessage.createdAt": -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      count: recentChats.length,
      data: recentChats,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const fetchMessages = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const receiverId = req.params.receiverId;
    const senderId = currentUser._id.toString();

    const verifyReceiver = await User.findById(receiverId);
    if (!verifyReceiver) {
      const error = new Error("Unknown Receiver");
      error.statusCode = 404;
      return next(error);
    }

    // console.log({
    //   senderId,
    //   receiverId,
    // });

    const mychat = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .select("-_id -__v")
      .sort({ createdAt: 1 });

    //console.log(mychat);

    res.status(200).json({ data: mychat });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    const { inputMessage } = req.body;

    const receiverId = req.params.receiverId;
    const senderId = currentUser._id.toString();

    const verifyReceiver = await User.findById(receiverId);
    if (!verifyReceiver) {
      const error = new Error("Unknown Receiver");
      error.statusCode = 404;
      return next(error);
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: inputMessage,
    });

    res.status(201).json({ data: newMessage });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }
    const { fullName, about } = req.body;
    if (!fullName || !about) {
      const error = new Error("Only fullName and about can be updated");
      error.statusCode = 400;
      return next(error);
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { fullName, about },
      { new: true, runValidators: true },
    ).select("-password -__v");
    res.status(200).json({
      data: updatedUser,
      message: "User details updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
