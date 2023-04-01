import {constants} from "../utlis/constants.js";
import { User } from "../models/user.model.js";

export const isadmin = async (req, res, next) => {
    console.log("hitting isadmin")
    const user =  await User.findOne({userId:req.body.userId})
    
    if(user.userType == constants.userTypes.admin){
        next()
    }
    else{
        res.status(403).send({message:"forbidden"})
    }
}