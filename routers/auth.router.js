import {signup} from "../controllers/auth.controller.js"; 


export const authrouter = function(app){
app.post("/crm/api/auth/signup", signup,(req, res) => {res.send("signup succusfully")})};