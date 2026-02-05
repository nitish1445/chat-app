import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routers/authRouter.js";
import morgan from "morgan";

const app = express();

// middleware :- check the req origin or Allow frontend to access Backend
// Cross-Origin Resource Sharing
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Reads cookies from browser
// app.use(cookieParser());

// middleware :- check the routes and show the error as statuscode
app.use(morgan("dev"));

// route :- shpw the direction to req
app.use("/auth", AuthRouter);

// Health checkup {optional but recommended}
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

// 
const port = process.env.PORT || 5000;

// Starts server only after DB is connected
const startServer = async () => {
  try {
    // connect the server
    await connectDB();
    // starts server after checking db is connected
    app.listen(port, () => {
      console.log("Server started at port:", port);
    });
  } catch (error) {
    // if db not connected
    console.log("DB connection failed:", error);
  }
};

startServer();
