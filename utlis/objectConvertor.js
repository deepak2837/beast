export const objectconvertor = (user)=>{
    
    // console.log("user",user)
    const new_user = []
    if (!Array.isArray(user)) {return {}} else {
    user.forEach(user => {
        user = {
            name: user.name,
            email: user.email,
            userId:user.userId,
            userType:user.userType,
            userStatus:user.userStatus,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt    

    }
        new_user.push(user)
    });
    console.log("hitting objectconvertor")
    
// console.log(new_user)
return new_user;}
}