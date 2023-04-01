import { jwtverify } from "../middlewares/jwtvalidation.js";
import {approveduser} from "../middlewares/approveduser.js";
import { ticketCreater ,ticketUpdate,gettickets,getticketbyid} from "../controllers/ticket.controller.js";

export const ticketRouter = (app) => {
  
  app.get("/crm/api/ticket/gettickets", jwtverify,approveduser, gettickets ); 
  app.post("/crm/api/ticket/create", jwtverify,approveduser, ticketCreater );
  app.put("/crm/api/ticket/update/:ticketId", jwtverify,approveduser, ticketUpdate );
  app.get("/crm/api/ticket/:id", jwtverify, getticketbyid)
  
  

  };
