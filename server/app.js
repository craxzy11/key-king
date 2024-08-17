import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import { mongoConnect } from "./utils/config.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { errorMiddleware } from "./middleware/error.js";
import { AUTH_ROUTES , STATS_ROUTES } from "./routes/index.js";
import cors from "cors";

dotenv.config({
    path: "./.env",
})

const app = express();
const server = createServer(app);
const io = new Server(server)

const PORT = process.env.PORT?process.env.PORT:5000;
const MONGO_URL = process.env.MONGO_URL;
const envMode = process.env.NODE_ENV;
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use("/api/v1/auth", AUTH_ROUTES);
app.use("/api/v1/stats", STATS_ROUTES);


app.use(errorMiddleware)

async function name(){
    await mongoConnect(MONGO_URL);
    
    server.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    })    
}

name()


export {
    envMode
}