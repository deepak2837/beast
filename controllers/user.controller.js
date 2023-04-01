// get user by id and password
// get all user accounts
// update user by id and password


import { constants } from "../utlis/constants.js"
import {User} from "../models/user.model.js"
import { objectconvertor } from "../utlis/objectConvertor.js"
import { Console } from "console"

// 
// function fetchall(){
//     user = User.find()
//     return user[0]

// }



function usernamefinder(name){ 
    const user = User.find({name:name})
    return user 
}

function createdDateFinder(createdDate) { 
    const startOfDay = new Date(createdDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(createdDate).setHours(23, 59, 59, 999);
    const userOnThisDate = User.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay }
    });
    return userOnThisDate;
}


function updatedDateFinder(updatedDate){
    const startOfDay = new Date(updatedDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(updatedDate).setHours(23, 59, 59, 999);
    const userOnThisDate = User.find({
        updatedAt: { $gte: startOfDay, $lt: endOfDay }
    });
    return userOnThisDate;

}


function useronthisstatusFinder(userStatus){
    const useronthisstatus = User.find({userStatus:userStatus})
    return useronthisstatus
}
function useronthistypeFinder(userTypes){
    const useronthistype = User.find({userType:userTypes})
    return useronthistype
}


function userbetweendateFinder(startdate,enddate){
    const start_date = new Date(startdate).setHours(0, 0, 0, 0);
    const end_date = new Date(enddate).setHours(23, 59, 59, 999);
    const userbetweentheseDate = User.find({
        updatedAt: { $gte: start_date, $lt: end_date }
    });
    return userbetweentheseDate;

}
function fetchby_username_userstatas_usertype(name, userStatus, userTypes) {
    const fetchby_username_userstatas_usertypes = User.find({name:name,userStatus:userStatus,userType:userTypes})
    return fetchby_username_userstatas_usertypes;
  }
  
  function fetchby_userstatas_usertype(userStatus, userTypes) {
    const fetchby_username_userstatas_usertypes = User.find({userStatus:userStatus,userType:userTypes})
    return fetchby_username_userstatas_usertypes;
  }
  function fetchby_username_usertype(name,  userTypes) {
    const fetchby_username_usertypes = User.find({name:name,userType:userTypes})
    return fetchby_username_usertypes;
  }
  function fetchby_username_userstatas(name, userStatus) {
    const fetchby_username_userstatas = User.find({name:name,userStatus:userStatus})
    return fetchby_username_userstatas;
  }



export const findall = async (req,res) => {
    const name = req.query.name;
    const userStatus = req.query.userStatus;
    const userTypes = req.query.userTypes;
    const createdDate = req.query.createdDate;
    const updatedDate = req.query.updatedAt;
    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    if(name && userStatus && userTypes){
        console.log("hitting name && userStatus && userTypes")
        const userdata = await fetchby_username_userstatas_usertype(name,userStatus,userTypes)
        res.send(objectconvertor(userdata))
    }
    else if(name && userStatus){
        console.log("hitting name && userStatus s")
        const userdata = await fetchby_username_userstatas(name,userStatus)
        res.send(objectconvertor(userdata))
    }
    else if(name && userTypes){
        console.log("hitting name  && userTypes")
        const userdata = await fetchby_username_usertype(name,userTypes)
        res.send(objectconvertor(userdata))
    }
    else if(userStatus && userTypes){
        console.log("userStatus && userTypes")
        const userdata = await fetchby_userstatas_usertype(userStatus,userTypes)
        res.send(objectconvertor(userdata))
    }
    else if(name){
        console.log("hitting name")
       const  username = await usernamefinder(name) 
       res.send(objectconvertor(username))
       
    }
    else if(createdDate){
        console.log("hitting createdDate")
       const  useronthisdate = await createdDateFinder(createdDate)
       res.send(objectconvertor(useronthisdate))
    }
   else if(updatedDate){
       console.log("hitting updatedDate")
       const updatedonthisdate = await updatedDateFinder(updatedDate)
         res.send(objectconvertor(updatedonthisdate))
    }
    else if(userStatus){
        const useronthisstatus = await useronthisstatusFinder(userStatus)
        res.send(objectconvertor(useronthisstatus))
    }
    else if(userTypes){
        const useronthistype = await useronthistypeFinder(userTypes)
        res.send(objectconvertor(useronthistype))
    }
    else if(startdate && enddate){
        const userbetweendate = await userbetweendateFinder(startdate,enddate)
        res.send(objectconvertor(userbetweendate))
    }
    else{
        const user = await User.find()
        res.send(objectconvertor(user))
    }
    
}



export async function shortfindall(req,res){
   const user = await User.find(req.query? req.query:{}).select("-password")
    res.send(user)
}


export const fetchuserbyid = async (req,res)=>{
    const userId = req.params.userId
    const user = await User.findOne({userId:userId})
    console.log(user)
    if (user){
        res.send(objectconvertor([user]))
    }
    else{
        res.status(404).send({message:"user not found"})
    }
}

export const update_by_id = async (req,res)=>{
    console.log(req.body)
    const userId = req.params.userId
    const user= await User.findOneAndUpdate({userId:userId},{userStatus:req.body.userStatus},{ new: true }).exec()

    res.send(objectconvertor([user]))
}

