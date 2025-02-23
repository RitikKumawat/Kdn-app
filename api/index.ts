import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./src/app";
import { createServer } from "http";
import { Server } from "socket.io";

// Create the HTTP server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export default async (req: VercelRequest, res: VercelResponse) => {
  server.emit("request", req, res);
};
