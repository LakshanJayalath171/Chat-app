import mongoose from "mongoose";

// Function to connect mongoDB databse 

export const connectDb = async ()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("Database connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/chatApp`)
    } catch (error) {
        console.log(error);
        
    }
}