const User = require("../models/user.model");
const constants = require("../utlis/constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs/auth.config");

exports.signup = async (request, response) => {
    let userStatus = request.body.userStatus;

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
    }
    catch (e) {
        console.log(e)

    }



};
