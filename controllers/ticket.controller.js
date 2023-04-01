import { Ticket } from "../models/ticket.model.js";
import { User } from "../models/user.model.js";
import { constants } from "../utlis/constants.js";

export const ticketCreater = async (req, res) => {
   const engineer = await User.findOne({userType:constants.userTypes.engineer})
   console.log(engineer.userId)
    const tickets = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        reporter: req.body.userId,
        assignee: engineer?.userId.toString(),
    }

  try {
    const ticket = await Ticket.create(tickets);
if(tickets){
  const user  = await User.findOne({userId:req.body.userId})
  user.ticketCreated.push(ticket._id)
  await user.save()

  engineer.ticketAssigned.push(ticket._id)
  await engineer.save()
}
   res.send(ticket);
  } catch (err) {
    res.send(err.message);
  }
}

// NOW WE WILL UPODATE THE TICKET BASED ON THE USER
function owns_ticket_assignment(id,engineer) {
  return engineer.ticketAssigned.includes(id)
}

function owns_ticket(id,user) {
  console.log("hitting owns ticket")
  return user.ticketCreated.includes(id)
}




export const ticketUpdate = async(req,res)=>{
  console.log("hitting update")
  const user = await User.findOne({userId:req.body.userId})
  const ticket = await Ticket.findOne({_id:req.params.ticketId})
if(user.userType === constants.userTypes.customer){
  console.log("hitting customer")
  if(owns_ticket(req.params.ticketId,user)){
  ticket.title = req.body.title ? ticket.title = req.body.title : ticket.title = ticket.title
  ticket.description =  req.body.description ? ticket.description = req.body.description : ticket.description = ticket.description
  ticket.ticketPriority = req.body.priority ? ticket.ticketPriority = req.body.priority : ticket.ticketPriority = ticket.ticketPriority
  if(req.body.status===constants.ticketstatus.closed){
    ticket.status = constants.ticketstatus.closed
  }
  else{
    
    ticket.status = ticket.status
  }
ticket.save()
res.send(ticket).status(200)}
else{
  res.send("you are not the owner to this ticket").status(400)
}





}
else if ( user.userType === constants.userTypes.engineer ){
  if(owns_ticket_assignment(req.params.ticketId,user)){console.log("going inside enginner ")
  console.log(ticket)
  ticket.ticketPriority = req.body.priority ? ticket.ticketPriority = req.body.priority : ticket.ticketPriority = ticket.ticketPriority
  if (req.body.status === constants.ticketstatus.closed || req.body.status === constants.ticketstatus.inprogress || req.body.status === constants.ticketstatus.open) {
    // code to be executed if the status matches any of the allowed values
    ticket.status = req.body.status;
  } else {
    // code to be executed if the status does not match any of the allowed values
    ticket.status = ticket.status;
  }
  

ticket.save()
res.send(ticket).status(200)}
else{
  res.send("you are not assigned to this ticket").status(400)
}
  
  
}
else if ( user.userType === constants.userTypes.admin){
  console.log(ticket)
  ticket.ticketPriority = req.body.priority ? ticket.ticketPriority = req.body.priority : ticket.ticketPriority = ticket.ticketPriority
  if (req.body.status === constants.ticketstatus.closed || req.body.status === constants.ticketstatus.inprogress || req.body.status === constants.ticketstatus.open || req.body.status === constants.ticketstatus.blocked){
    ticket.status =req.body.status
  }

  ticket.save()
  res.send(ticket).status(200)  
}
}

//now we will get the ticket based on the user and also the status of the ticket

export const gettickets = async(req,res)=>{
  console.log("hitting get tickets")  

  let queryObject = {}
  if(req.query.status===undefined){
    // do nothing
  }
  else{
  queryObject = {"status" : req.query.status}}


  
  const user = await User.findOne({userId:req.body.userId})
  if(user.userType === constants.userTypes.customer){
    queryObject.reporter = req.body.userId
  }
  else if(user.userType === constants.userTypes.engineer){
    queryObject.assignee = req.body.userId
  }
else{
  // do nothing
}
console.log(queryObject)

const tickets  = await Ticket.find(queryObject) 
res.send(tickets).status(200)
// thisd quey can also be used but it will work best for the admin and engineer only 
// const data = await User.findOne({userId:req.body.userId}).populate({path:"ticketCreated",match:queryObject})
// res.send(data.ticketCreated).status(200)



}
 


//get ticket by id from
export const getticketbyid = async(req,res)=>{
  console.log("hitting get ticket by id")
  console.log(req.params.id)
  const ids = req.params.id

  const ticket = await Ticket.findById(req.params.id.toString());

  console.log(ticket)
  const user = await User.findOne({userId:req.body.userId})
if(user.userType === constants.userTypes.admin  || ticket.assignee === req.body.userId || ticket.reporter === req.body.userId ){
  console.log("hitting admin")
  console.log(ticket)
  res.send(ticket).status(200)
}
else{
  res.send("you are not authorized to view this ticket").status(400)
}



}