import { clerkClient } from "@clerk/express";

//middleware 
export const protectEducator=async (req,res,next) => {
    try {
        const userId=req.auth.userId
        // console.log(userId);
        const response=await clerkClient.users.getUser(userId);
        // console.log(response.privateMetadata);
        if(response.publicMetadata.role !== 'educator'){
            return res.json({success:false,message:'Unauthorized Access'});
        }
        next();
    } catch (error) {
        res.json({success:false,message:`midleware ${error.message}`});
    }
} 