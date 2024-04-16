import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config({
    path: "./.env",
})

const app = express();
const server = createServer(app);
const io = new Server(server)

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})