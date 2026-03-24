import mongoose from "mongoose";
import User from "./user";

const messageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",reqired:true},
    recieverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",reqired:true},
    text:{type:String},
    image:{type:String},
    seen:{type:Boolean,default:false}
},{timestamps:true})

const Message = mongoose.model("Message",userSchema);
export default User;