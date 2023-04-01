import mongoose from "mongoose";
import { constants } from "../utlis/constants.js";
const date = new Date()
const ticketSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ticketPriority:{
    type:Number,
    required:true,
    default:4,
  },
  description:{
type: String,
required: true,

  },
  status:{
    type: String,
    required:true,
    default:constants.ticketstatus.open,

  },
  reporter:{
    type: String,
    required:true,
    
  },
  assignee:{
    type: String,
    
  },
  createdAt:{
    type:Date,
    immutable:true,
    default: date.setHours(0, 0, 0, 0)
  },
  updatedAt:{
    type:Date,
    default: ()=> Date.now()
  },
 
  

});
export const Ticket = mongoose.model("Ticket",ticketSchema);