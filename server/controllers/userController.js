// signup new user 

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";

export const signUp = async (req,res)=>{
    const {fullName ,email,password,bio} = req.body;
    try {
        if(!fullName || !email || !password || !bio){
            return res.json({
                success:false,
                message:"Details missed"
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({
                success:false,
                message:"Account Already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            fullname,email,password:hashedPassword,bio
        });

        const token  = generateToken(newUser._id);
        res.json({
            success:true,
            userData:newUser,
            token,
            message:"Account creation successfull"})
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


// funtion for login user 

export const login = async (req,res)=>{
    try {
        const {email , password} = req.body;
        const userData = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(process, userData.password);

        if(!isPasswordCorrect){
            res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const token  = generateToken(userData._id);
        res.json({
            success:true,
            userData,
            token,
            message:"Login successfull"}
        )
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// controller to check if user is authenticated 

export  const checkAuth =  ()=>{
    res.json({success:true,user:req.user})
}


// controller to update user profile details

export const updateProfile = async (req,res)=>{
    try {
        const {profilePic,bio,fullName} = req.body;
        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            await User.findByIdAndUpdate(userId,{bio,fullname},{new:true})
        }
        else{
            const upload = await cloudinary.uploader(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullname},{new:true})
        }
        res.json({success:true,user:updatedUser})
    } catch (error) {
        res.json({success:false,message:error.message})
        consol.log(error.message)
    }
}