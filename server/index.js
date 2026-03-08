import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import UserRouter from "./src/routers/userRouter.js";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import webSocket from "./src/config/webSocket.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(cookieParser());

// middleware :- check the routes and show the error as statuscode
app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

// Global error handler
app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.log("Error Found", { ErrorMessage, StatusCode });
  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

// Socket.io setup & App wrapped in http server
const httpServer = http.createServer(app);

//httpserver wrapped to socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

webSocket(io);

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(port, () => {
      console.log("🌐 Server started at port:", port);
    });
  } catch (error) {
    console.log("DB connection failed:", error);
  }
};

startServer();
