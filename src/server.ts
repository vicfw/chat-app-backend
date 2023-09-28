import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import messageRoute from "./routes/messageRoute";
import { Server } from "socket.io";
import http from "http";

const app: Application = express();

const server = http.createServer(app);

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRoute);

mongoose.connect(process.env.MONGODB_URI!, () => {
  console.log("mongo db connected");
});

server.listen(process.env.PORT, function () {});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URI,
    credentials: true,
  },
});

// @ts-ignore
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("connected");

  // @ts-ignore
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    // @ts-ignore
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    // @ts-ignore
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
  console.log(global);
});
