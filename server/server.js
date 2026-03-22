import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectDb } from "./lib/db.js";


// create express and http server 

const app = express();
const server = http.createServer(app);


// middleware setup 

app.use(express.json({limit:"4mb"}));
app.use(cors());
app.use("/api/status",(req,res)=>{
    res.send("server is alive");
})

// connect to mongoDb databse 

await connectDb()


//define port

const PORT = process.env.PORT || 5000;


//server creation

server.listen(PORT,(req,res)=>{
    console.log(`server is running on ${PORT}`)
});

