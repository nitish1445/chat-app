import Message from "../models/messageModal.js";

const OnlineUsers = {};

const WebSocket = (io) => {
  console.log("🔌 Socket Connected");

  io.on("connection", (socket) => {
    socket.on("createPath", (userID) => {
      OnlineUsers[userID] = socket.id;
      io.emit("OnlineUsers", OnlineUsers);
      console.log("OnlineUsers", OnlineUsers);
    });

    socket.on("destroyPath", (userID) => {
      delete OnlineUsers[userID];
      io.emit("OnlineUsers", OnlineUsers);
      console.log("OnlineUsers", OnlineUsers);
    });

    socket.on("send", async (messagePacket) => {
      // Save the message to the database
      const newMessage = await Message.create({
        senderId: messagePacket.senderId,
        receiverId: messagePacket.receiverId,
        message: messagePacket.message,
      });

      const newMessagePacket = newMessage.toObject();
      delete newMessagePacket.__v;
      delete newMessagePacket._id;

      console.log("New Message Packet to Emit:", newMessagePacket);

      const receiverSocketId = OnlineUsers[messagePacket.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("recieve", newMessagePacket);
      }
    });
  });
};

export default WebSocket;
