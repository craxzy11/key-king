import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import { mongoConnect } from "./utils/config.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { errorMiddleware } from "./middleware/error.js";
import { router as authRoutes } from "./routes/authRoutes.js";

dotenv.config({
    path: "./.env",
})

const app = express();
const server = createServer(app);
const io = new Server(server)

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const envMode = process.env.NODE_ENV;

app.use(express.json());
app.use("/auth",authRoutes);

mongoConnect(MONGO_URL);


app.use(errorMiddleware)

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

export {
    envMode
}