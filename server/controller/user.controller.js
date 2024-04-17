import User from "../models/User.model.js";
import { modelErrorHandler } from "../utils/error.js";

const register=async(req,res,next)=>{
    //make sure all data to send properly from frontend
    const{userName,firstName,lastName,emailId,password,isEmailVerified,profilePicLink}=req.body; 
    try{
        const newUser=await User.create({
            userName,
            firstName,
            lastName,
            emailId,
            password,
            isEmailVerified,
            profilePicLink
        });
    
        // delete newUser.password;
        const userToSend = await User.findById(newUser._id).select("-password");
        return res.status(201).json({success:  true, user: userToSend});
    }catch(err){
        modelErrorHandler(err,next);
    }
};

const login=async(req,res,next)=>{

}
export{login,register};