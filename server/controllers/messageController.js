// get all users except logged in user 

import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.js";

export const getUsersForSidebar = async()=>{
    try {
        const userId = req.user._id;
        const filteredUser = await User.find({_id:{$ne:userId}}).select("-password");

        //count the number of unseen messages

        const unseenMessages = {};
        const promises = filteredUser.map(async(users)=>{
            const messages = await messages.find({senderId:user._id,reciver_id:userId,seen:false})

            if(messages.length > 0){
                unseenMessages[user._id] = messages.length
            }
        })
        await Promise.all(promises)
        resizeBy.json({success:true,users:filteredUser,unseenMessages})
    } catch (error) {
        console.log(error.messages);
        resizeBy.json({success:false,message:error.message})
    }
}


//get all messages from selected user

export const getAllMessage = async(req,res) =>{
    try {
        const {id:selecetedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Messages.find({
            $or:[
                {senderId:myId,reciverId:selecetedUserId},
                {senderId:selecetedUserId,reciverId:myId}
            ]
        })
        await Message.updateMany({
            senderId:selecetedUserId,
            reciverId:myId
        },{seen:true})

        res.json({success:true,messages})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// api to mark messages as seen using message id

export const markMessageAsSeen = async(req,res)=>{
    try {
        const id = req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// send message to selected user 

export const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const senderId = req.params.id;
        const recieverId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage =await Message.create({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        })
        res.json({success:true,newMessage})
    } catch (error) {
        conole.log(error.message);
        res.json({success:false,message:error.message})
    }
}