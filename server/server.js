import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDb } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";


// create express and http server 

const app = express();
const server = http.createServer(app);


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

