import { signin, signup } from "../controllers/auth.controller.js";

export const authrouter = function (app) {
  app.post("/crm/api/auth/signup", signup, (req, res) => {
    res.send("signup succusfully");
  });
  
  app.post("/crm/api/auth/signin", signin,(req, res) => {
    res.send("signin succusfully");
  });
};
