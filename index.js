import {DB_URL} from './configs/db.config.js'  
import mongoose from "mongoose";
import { authrouter } from './routers/auth.router.js';
import express from "express";
import { User } from './models/user.model.js';
import bcrypt from "bcryptjs";
import {constants} from './utlis/constants.js';
import { userRouter } from './routers/user.router.js';
import { ticketRouter } from './routers/ticket.router.js';
// import { Router } from 'express';
var app = express();



// var router = Router();
app.use(express.json());
// app.use(authrouter);


// mongo db connectiopn 
mongoose.connect(DB_URL)
mongoose.connection.on("error", (err) => {console.log(err)});
mongoose.connection.once("open", () => {console.log("connected to mongo db")});



async function init() {
    let user = await User.findOne({ userId: "admin" })

    if (user) {
        console.log("Admin user already present", user)
        return
    }

    try {
        let user = await User.create({
            name: "kajal",
            userId: "alhabibi",
            email: "admin@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("love", 8),
            userStatus: constants.userStatus.approved
        })
        console.log(user)
    } catch (err) {
        console.log(err.message)
    }
}
init()





app.get("/", (req, res) => {
    console.log("hitting crm")
  res.send("hi crm");
});



authrouter(app);
userRouter(app);
ticketRouter(app);







console.log("hi");

const port = 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
