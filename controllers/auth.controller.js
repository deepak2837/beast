import {User}from "../models/user.model.js";
import constants from "../utlis/constants.js";
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
    console.log("hitting sign in ")
    

};
