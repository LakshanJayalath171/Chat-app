import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDb } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";
import { Socket } from "dgram";


// create express and http server 

const app = express();
const server = http.createServer(app);

//initialize soket.io server
export const io = new Server(server,{
    cors:{origin:"*"}
})

// store online user 
export const userSoketMap = {};

// soket.io connection handler
io.on("connection",(soket)=>{
    const userId = soket.handshake.query.userId;
    console.log("user connected",userId);

    if(userId) userSoketMap[userId] = soket.id;

    // emit online users to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSoketMap))

    soket.on('disconnect',()=>{
        console.log("user Disconnected")
        delete userSoketMap([userId]);
        io.emit("getOnlineUsers",Object.keys(userSoketMap))
    });


});


// middleware setup 

app.use(express.json({limit:"4mb"}));
app.use(cors());


// routes setup 
app.use("/api/status",(req,res)=>{
    res.send("server is alive");
})

app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter)

// connect to mongoDb databse 

await connectDb()


//define port

const PORT = process.env.PORT || 5000;


//server creation

server.listen(PORT,(req,res)=>{
    console.log(`server is running on ${PORT}`)
});

