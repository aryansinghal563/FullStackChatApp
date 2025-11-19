import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./http/routes/auth.routes.js";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use("/api/auth", authRoutes);

const server = createServer(app);
// const io = new Server(httpServer, {
//   /* options */
// });

// io.on("connection", (socket) => {
//   // ...
// });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("http://localhost:", PORT);
});
