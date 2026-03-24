import jwt from 'jsonwebtoken';

//function for a generate token to new user

export const generateToken = (userID)=>{
    const token = jwt.sign({userID},process.env.JWT_SECRET)
    return token 
}