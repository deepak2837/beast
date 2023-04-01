import {constants} from "../utlis/constants.js";
import { User } from "../models/user.model.js";

export const approveduser= async (req, res, next) => {
    console.log("hitting approved user ")
    const user =  await User.findOne({userId:req.body.userId})
    
    if(user.userStatus  == constants.userStatus.approved){
        next()
    }
    else{
        res.status(403).send({message:"user is not approved "})
    }
}