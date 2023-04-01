import {User}from "../models/user.model.js";
import {constants} from "../utlis/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../configs/auth.config.js";


export const signup = async (request, response) => {
    console.log("hitting sign up ")
    console.log(request.body)
    let userStatus,userTypes;

    if (
        !request.body.userTypes ||
        request.body.userTypes == constants.userTypes.customer
    ) {
        userStatus = constants.userStatus.approved;
    } else {
        userStatus = constants.userStatus.pending;
    }


    const userObj = {
        name: request.body.name,
        email: request.body.email,
        userId: request.body.userId,
        userTypes: request.body.userTypes,
        userStatus: userStatus,
        password: bcrypt.hashSync(request.body.password, 8),

    }
    try {
        const usercreated = await User.create(userObj)
        console.log(usercreated)
        response.send(usercreated)
    }
    catch (e) {
        console.log(e)

  }

};


export const signin = async (request, response) => {
    // console.log("hitting sign in ")
    // if(!request.body.userId==undefined) {response.send("user id is required")}
    // userId = request.body.userId
    console.log(request.body)
    const user  = await User.findOne({userId: request.body.userId})
    console.log(user)
    if(!user){
        return response.status(404).send({message:"user not found"})
    }

    const passwordIsValid = bcrypt.compareSync(request.body.password,user.password)
    if(!passwordIsValid){
        return response.status(401).send({accessToken:null,message:"invalid password"})
    }
    console.log(user.userId)
    const token = jwt.sign({userId:user.userId},secret,{ expiresIn: 86400})

    response.status(200).send({id:user.userId,accessToken:token,name:user.name,userType:user.userType,userStatus:user.userStatus,message:"login successfull",})
    

};
