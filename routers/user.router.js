import { jwtverify } from "../middlewares/jwtvalidation.js";
import { isadmin } from "../middlewares/rolevalidation.js";
import { findall,fetchuserbyid,update_by_id } from "../controllers/user.controller.js";

export const userRouter = (app) => {
  app.get("/crm/api/findall",jwtverify,isadmin, findall );
  app.get("/crm/api/:userId", jwtverify,isadmin,fetchuserbyid);
  app.put("/crm/api/:userId",jwtverify,isadmin, update_by_id);

  };
